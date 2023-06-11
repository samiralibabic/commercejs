import React from 'react'
import { Typography, Button, Divider } from '@mui/material'
import { Elements, CardElement, ElementsConstructor } from '@stripe/react-stripe-js'
import Review from './Review'

const PaymentForm = ({ checkoutToken }) => {
  return (
    <>
      <Review checkoutToken={checkoutToken} />
    </>
  )
}

export default PaymentForm