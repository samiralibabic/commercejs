import React from 'react'
import { Typography, Button, Card, CardActions, CardContent, CardMedia, Box } from '@mui/material'

const CartItem = ({ item, handleUpdateCartQty, handleRemoveFromCart }) => {
    const styles = {
        cardMedia: {
            height: '260px'
        },
        cardContent: {
            display: 'flex',
            justifyContent: 'space-between',
        },
        cartActions: {
            justifyContent: 'space-between',
        },
        buttons: {
            display: 'flex',
            alignItems: 'center',
        },
    }

    return (
        <Card>
            <CardMedia sx={styles.cardMedia} image={item.image.url} />
            <CardContent sx={styles.cardContent}>
                <Typography variant='h4'>{item.name}</Typography>
                {console.log(item)}
                <Typography variant='h5'>{item.line_total.formatted_with_symbol}</Typography>
            </CardContent>
            <CardActions sx={styles.cartActions}>
                <Box sx={styles.buttons}>
                    <Button type='button' size='small' onClick={() => handleUpdateCartQty(item.id, item.quantity - 1)}>-</Button>
                    <Typography>{item.quantity}</Typography>
                    <Button type='button' size='small' onClick={() => handleUpdateCartQty(item.id, item.quantity + 1)}>+</Button>
                </Box>
                <Button variant='contained' type='button' color='secondary' onClick={() => handleRemoveFromCart(item.id)}>Remove</Button>
            </CardActions>
        </Card>
    )
}

export default CartItem