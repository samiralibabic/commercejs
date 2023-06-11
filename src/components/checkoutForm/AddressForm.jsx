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

    const { register, handleSubmit, formState: { errors } } = useForm();

    const fetchShippingCountries = async (token) => {
        // Commerce.js does not currently support this endpoint. Follow progress at https://github.com/chec/commerce.js
        // const { countries } = await commerce.services.localeListShippingCountries(token);

        // Here I'm just retreiving all 249 available countries.
        const { countries } = await commerce.services.localeListCountries();

        setShippingCountries(countries);
        // setShippingCountry(Object.keys(countries)[0]);
        setShippingCountry('US');
    };

    const fetchSubdivisions = async (countryCode) => {
        const { subdivisions } = await commerce.services.localeListSubdivisions(countryCode);

        setShippingSubdivisions(subdivisions);
        setShippingSubdivision(Object.keys(subdivisions)[0]);
    };

    const fetchShippingOptions = async (token, country, subdivision) => {
        // does not work for some reason
        // const options = await commerce.checkout.getShippingOptions(token, { country, subdivision });

        // Here I just mock an example response from documentation
        const mockOptions = [
            {
                "id": "ship_31q0o3e21lDdjR",
                "description": "US",
                "price": {
                    "raw": 0,
                    "formatted": "0.00",
                    "formatted_with_symbol": "$0.00",
                    "formatted_with_code": "0.00 USD"
                },
                "countries": [
                    "US"
                ],
                "regions": {
                    "US": [
                        "AL",
                        "AK",
                        "AS",
                        "AZ",
                        "AR"
                    ]
                }
            },
            {
                "id": "ship_dKvg9l6vl1bB76",
                "description": "CA",
                "price": {
                    "raw": 5,
                    "formatted": "5.00",
                    "formatted_with_symbol": "$5.00",
                    "formatted_with_code": "5.00 USD"
                },
                "countries": [
                    "CA"
                ],
                "regions": {
                    "CA": [
                        "AB",
                        "BC",
                        "MB",
                        "ON",
                        "QC"
                    ]
                }
            }
        ]

        setShippingOptions(mockOptions);
        setShippingOption(mockOptions[0].id);
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
            <Box component='form' onSubmit={handleSubmit((data) => next({ ...data }))}>
                <Grid container spacing={3} mb={3}>
                    <Grid item xs={12} sm={6}>
                        <TextField fullWidth placeholder="First name" {...register("First name", { required: true })} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField fullWidth placeholder="Last name" {...register("Last name", { required: true })} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField fullWidth placeholder="Address" {...register("Address", { required: true })} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField fullWidth placeholder="Email" type='email' {...register("Email", { required: true, pattern: /^\S+@\S+$/i })} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField fullWidth placeholder="City" {...register("City", { required: true })} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField fullWidth placeholder="ZIP / Postal code" {...register("ZIP", { required: true })} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <InputLabel>Shipping Country</InputLabel>
                        <Select fullWidth value={shippingCountry} 
                        {...register("Shipping country", { required: true })} 
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
                            {...register("Shipping subdivision", { required: true })}
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
                        {...register("Shipping option", { required: true })} 
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