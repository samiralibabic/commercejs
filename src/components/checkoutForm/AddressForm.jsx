import React, { useState, useEffect } from 'react';
import { Box, InputLabel, Select, MenuItem, Button, Grid, Typography, TextField, Divider } from '@mui/material';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom'

import { commerce } from '../../lib/commerce.js';

const AddressForm = ({ checkoutToken, next }) => {
    const [shippingCountries, setShippingCountries] = useState([]);
    const [shippingCountry, setShippingCountry] = useState('');
    const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
    const [shippingSubdivision, setShippingSubdivision] = useState('');
    const [shippingOptions, setShippingOptions] = useState([]);
    const [shippingOption, setShippingOption] = useState('');

    const { register, handleSubmit } = useForm();

    const fetchShippingCountries = async (token) => {
        // Commerce.js does not currently support this endpoint. Follow progress at https://github.com/chec/commerce.js
        // const { countries } = await commerce.services.localeListShippingCountries(token);

        // Here I'm just retreiving all 249 available countries.
        const { countries } = await commerce.services.localeListCountries();

        setShippingCountries(countries);
        // setShippingCountry(Object.keys(countries)[0]);
        setShippingCountry(Object.keys(countries)[0]);
    };

    const fetchSubdivisions = async (countryCode) => {
        const { subdivisions } = await commerce.services.localeListSubdivisions(countryCode);

        setShippingSubdivisions(subdivisions);
        setShippingSubdivision(Object.keys(subdivisions)[0]);
    };

    const fetchShippingOptions = async (token, country, subdivision) => {
        const options = await commerce.checkout.getShippingOptions(token, { country, subdivision });
        
        setShippingOptions(options);
        setShippingOption(options[0].id);
    };

    useEffect(() => {
        fetchShippingCountries(checkoutToken);
    }, [checkoutToken]);

    useEffect(() => {
        if (shippingCountry) fetchSubdivisions(shippingCountry);
    }, [shippingCountry]);

    useEffect(() => {
        if (shippingSubdivision) fetchShippingOptions(checkoutToken, shippingCountry, shippingSubdivision);
    }, [checkoutToken, shippingCountry, shippingSubdivision]);

    return (
        <>
            <Typography variant='h6' gutterBottom>Shipping Address</Typography>
            <Box component='form' onSubmit={handleSubmit((data) => next({...data, shippingCountry, shippingSubdivision, shippingOption}))}>
                <Grid container spacing={3} mb={3}>
                    <Grid item xs={12} sm={6}>
                        <TextField fullWidth placeholder="First name" {...register("firstName", { required: true })} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField fullWidth placeholder="Last name" {...register("lastName", { required: true })} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField fullWidth placeholder="Address" {...register("address", { required: true })} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField fullWidth placeholder="Email" type='email' {...register("email", { required: true, pattern: /^\S+@\S+$/i })} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField fullWidth placeholder="City" {...register("city", { required: true })} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField fullWidth placeholder="ZIP / Postal code" {...register("zip", { required: true })} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <InputLabel>Shipping Country</InputLabel>
                        <Select fullWidth value={shippingCountry} 
                        onChange={(e) => setShippingCountry(e.target.value)}>
                            {Object.entries(shippingCountries).map(([code, name]) => ({ id: code, label: name })).map((item) => (
                                <MenuItem key={item.id} value={item.id}>
                                    {item.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <InputLabel>Shipping Subdivision</InputLabel>
                        <Select fullWidth value={shippingSubdivision}
                            onChange={(e) => setShippingSubdivision(e.target.value)}>
                            {Object.entries(shippingSubdivisions).map(([code, name]) => ({ id: code, label: name })).map((item) => (
                                <MenuItem key={item.id} value={item.id}>
                                    {item.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <InputLabel>Shipping Option</InputLabel>
                        <Select fullWidth value={shippingOption}
                        onChange={(e) => setShippingOption(e.target.value)}>
                            {shippingOptions.map((option) => ({ id: option.id, label: `${option.description} - (${option.price.formatted_with_symbol})` })).map((item) => (
                                <MenuItem key={item.id} value={item.id}>
                                    {item.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </Grid>
                </Grid>
                <Divider />
                <Box style={{ display: 'flex', justifyContent: 'space-between' }} mt={3}>
                    <Button component={Link} variant="outlined" to="/cart">Back to Cart</Button>
                    <Button type="submit" variant="contained" color="primary">Next</Button>
                </Box>
            </Box >
        </>
    )
}

export default AddressForm