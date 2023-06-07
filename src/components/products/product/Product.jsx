import React from 'react'
import { Box, Card, CardContent, CardActions, Typography, IconButton } from '@mui/material'
import Image from 'mui-image'

import { AddShoppingCartRounded } from '@mui/icons-material'

const styles = {
    root: {
        // maxWidth: 345, original width style
        maxWidth: '100%',
    },
    cardActions: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    cardContent: {
        display: 'flex',
        justifyContent: 'space-between',
    },
};

const Product = ({ product, onAddToCart }) => {
    return (
        <Card sx={styles.root}>
            <Image src={product.image.url} title={product.name} height={200} />
            <CardContent>
                <Box sx={styles.cardContent}>
                    <Typography variant='h5' gutterBottom component='h2'>
                        {product.name}
                    </Typography>
                    <Typography variant='h5' gutterBottom component='h2'>
                        {product.price.formatted_with_symbol}
                    </Typography>
                </Box>
                <Typography variant='body2' color='textSecondary' component='p' dangerouslySetInnerHTML={{ __html: product.description }} />
            </CardContent>
            <CardActions disableSpacing sx={styles.cardActions}>
                <IconButton aria-label='Add to cart' onClick={() => onAddToCart(product.id, 1)}>
                    <AddShoppingCartRounded />
                </IconButton>
            </CardActions>

        </Card>
    )
}

export default Product