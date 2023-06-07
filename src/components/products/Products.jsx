import React from 'react'
import { Box, Grid } from '@mui/material'
import Product from './product/Product'

import { useTheme } from '@mui/material/styles'

const Products = ({ products, onAddToCart }) => {
    const theme = useTheme();

    const styles = {
        toolbar: theme.mixins.toolbar,
        content: {
            flexGrow: 1,
            backgroundColor: theme.palette.background.default,
            padding: theme.spacing(3),
        },
        root: {
            flexGrow: 1,
        },
    }

    return (
        <Box component="main" sx={styles.content}>
            <Box sx={styles.toolbar} />
            <Grid container justifyContent="center" spacing={4}>
                {products.map((product) => (
                    <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                        <Product product={product} onAddToCart={onAddToCart} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}

export default Products