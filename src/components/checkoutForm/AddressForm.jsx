import React, { useState, useEffect } from 'react';
import { Box, InputLabel, Select, MenuItem, Button, Grid, Typography, TextField, Divider } from '@mui/material';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom'

import { commerce } from '../../lib/commerce.js';

const AddressForm = ({ checkoutToken }) => {
    const [shippingCountries, setShippingCountries] = useState([]);
    const [shippingCountry, setShippingCountry] = useState('');
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);

    const fetchShippingCountries = async (token) => {
        // Commerce.js does not currently support this endpoint. Follow progress at https://github.com/chec/commerce.js
        // const { countries } = await commerce.services.localeListShippingCountries(token);
        const { countries } = await commerce.services.localeListCountries();

        setShippingCountries(countries);
        setShippingCountry(Object.keys(countries)[0]);
    };

    useEffect(() => {
        fetchShippingCountries(checkoutToken);
    }, [checkoutToken]);

    return (
        <>
            <Typography variant='h6' gutterBottom>Shipping Address</Typography>
            <Box component='form' onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <TextField placeholder="First name" {...register("First name", { required: true })} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField placeholder="Last name" {...register("Last name", { required: true })} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField placeholder="Address" {...register("Address", { required: true })} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField placeholder="Email" type='email' {...register("Email", { required: true, pattern: /^\S+@\S+$/i })} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField placeholder="City" {...register("City", { required: true })} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField placeholder="ZIP / Postal code" {...register("ZIP", { required: true })} />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <InputLabel>Shipping Country</InputLabel>
                        <Select value={shippingCountry} {...register("Shipping country", { required: true })} onChange={(e) => setShippingCountry(e.target.value)}>
                            {Object.entries(shippingCountries).map(([code, name]) => ({ id: code, label: name })).map((item) => (
                                <MenuItem key={item.id} value={item.id}>
                                    {item.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <InputLabel>Whatever</InputLabel>
                        <Select>
                            <MenuItem />
                        </Select>
                    </Grid>

                    <Divider />
                    <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Button component={Link} variant="outlined" to="/cart">Back to Cart</Button>
                        <Button type="submit" variant="contained" color="primary">Next</Button>
                    </Box>
                </Grid>
            </Box>
        </>
    )
}

export default AddressForm