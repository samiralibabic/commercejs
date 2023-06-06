import React from 'react'
import { Card, CardMedia, CardContent, CardActions, Typography, IconButton } from '@mui/material'
import { AddShoppingCartRounded } from '@mui/icons-material'

import { styles } from './styles'

const Product = ({ product }) => {
    return (
        <Card sx={styles.root}>
            <CardMedia sx={styles.media} image={product.image} title={product.name} />
            <CardContent>
                <div sx={styles.media}>
                    <Typography variant='h5' gutterBottom>
                        {product.name}
                    </Typography>
                    <Typography variant='h5'>
                        {product.price}
                    </Typography>
                </div>
                <Typography variant='h5' color='textSecondary'>{ product.description }</Typography>
            </CardContent>
            <CardActions disableSpacing className={styles.cardActions}>
                <IconButton aria-label='Add to cart'>
                    <AddShoppingCartRounded />
                </IconButton>
            </CardActions>

        </Card>
    )
}

export default Product