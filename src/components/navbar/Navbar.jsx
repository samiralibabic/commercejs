import React from 'react'
import { Box, AppBar, Toolbar, IconButton, Badge, Typography, alpha } from '@mui/material'
import Image from 'mui-image';
import { useTheme } from '@mui/material/styles';
import logo from '../../assets/logo.png';
import { ShoppingCart } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const Navbar = ({ totalItemsInCart }) => {
    const theme = useTheme();
    const drawerWidth = 0;
    const styles = {
        appBar: {
            boxShadow: 'none',
            borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
            [theme.breakpoints.up('sm')]: {
                width: `calc(100% - ${drawerWidth}px)`,
                marginLeft: drawerWidth,
            },
        },
        title: {
            flexGrow: 1,
            alignItems: 'center',
            display: 'flex',
            textDecoration: 'none',
        },
        image: {
            marginRight: '10px',
        },
        menuButton: {
            marginRight: theme.spacing(2),
            [theme.breakpoints.up('sm')]: {
                display: 'none',
            },
        },
        grow: {
            flexGrow: 1,
        },
        search: {
            position: 'relative',
            borderRadius: theme.shape.borderRadius,
            backgroundColor: alpha(theme.palette.common.white, 0.15),
            '&:hover': {
                backgroundColor: alpha(theme.palette.common.white, 0.25),
            },
            marginRight: theme.spacing(2),
            marginLeft: 0,
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                width: 'auto',
            },
        },
        searchIcon: {
            padding: theme.spacing(0, 2),
            height: '100%',
            position: 'absolute',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        inputRoot: {
            color: 'inherit',
        },
        inputInput: {
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('md')]: {
                width: '20ch',
            },
        },
    }

    return (
        <>
            <AppBar position='fixed' sx={styles.appBar} color='inherit'>
                <Toolbar>
                    <Image src={logo} alt='webshop1' width={30} height={30} sx={styles.image} />
                    <Typography component={Link} to='/' sx={styles.title} ml={1}>
                        Commerce.js
                    </Typography>
                    <Box sx={styles.grow} />
                    <Box component={Link} to='/cart'>
                        <IconButton aria-label='Show cart items' color='inherit'>
                            <Badge badgeContent={totalItemsInCart} color='secondary'>
                                <ShoppingCart />
                            </Badge>
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
        </>
    )
}

export default Navbar