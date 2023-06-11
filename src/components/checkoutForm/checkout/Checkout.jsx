import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { CssBaseline, Box, Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles'
import { AddressForm, PaymentForm, Confirmation } from '../../'
import { commerce } from '../../../lib/commerce'

const steps = ['Shipping address', 'Payment details'];

const Checkout = ({ cart }) => {
    const [activeStep, setActiveStep] = useState(0);
    const [checkoutToken, setCheckoutToken] = useState(null);
    const [shippingData, setShippingData] = useState({});

    const theme = useTheme();
    const history = useNavigate();

    const styles = {
        appBar: {
            position: 'relative',
        },
        toolbar: theme.mixins.toolbar,
        layout: {
            marginTop: '5%',
            width: 'auto',
            marginLeft: theme.spacing(2),
            marginRight: theme.spacing(2),
            [theme.breakpoints.up('xs')]: {
                width: 600,
                marginLeft: 'auto',
                marginRight: 'auto',
            },
        },
        paper: {
            marginTop: theme.spacing(3),
            marginBottom: theme.spacing(3),
            padding: theme.spacing(2),
            [theme.breakpoints.down('xs')]: {
                width: '100%',
                marginTop: 60,
            },
            [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
                marginTop: theme.spacing(6),
                marginBottom: theme.spacing(6),
                padding: theme.spacing(3),
            },
        },
        stepper: {
            padding: theme.spacing(3, 0, 5),
        },
        buttons: {
            display: 'flex',
            justifyContent: 'flex-end',
        },
        button: {
            marginTop: theme.spacing(3),
            marginLeft: theme.spacing(1),
        },
        divider: {
            margin: '20px 0',
        },
        spinner: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
    }

    const Form = () => activeStep === 0
        ? <AddressForm checkoutToken={checkoutToken} next={next} />
        : <PaymentForm shippingData={shippingData} checkoutToken={checkoutToken} />

    useEffect(() => {
        if (cart.id) {
            const generateToken = async () => {
                try {
                    const token = await commerce.checkout.generateToken(cart.id, { type: 'cart' });
                    setCheckoutToken(token);
                } catch {
                    if (activeStep !== steps.length) history.push('/');
                }
            };

            generateToken();
        }
    }, [cart, activeStep, history]);

    const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1)
    const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1)

    const next = (data) => {
        setShippingData(data);
        nextStep();
    }

    return (
        <>
            <Box sx={styles.toolbar} />
            <Box component='main' sx={styles.layout}>
                <Paper sx={styles.paper}>
                    <Typography variant='h4' align='center'>Checkout</Typography>
                    <Stepper activeStep={activeStep} sx={styles.stepper}>
                        {steps.map((step) => (
                            <Step key={step}>
                                <StepLabel>{step}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    {activeStep === steps.length ? <Confirmation /> : checkoutToken && <Form />}
                </Paper>
            </Box>
        </>
    )
}

export default Checkout