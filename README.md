# Webshop Example

![screenshot](screenshot.png)

This is a simple webshop example showcasing the usage of [Commerce.js](https://commercejs.com/), [MUI](https://mui.com/), and [Stripe](https://stripe.com/).

## Instructions

### Create Commerce.js account

1. Log in or create an account on [Commerce.js](https://commercejs.com/).
1. Go to the "Developer" section and copy your API key (sandbox, public).

### Create Stripe account

1. Log in or create an account on [Stripe](https://stripe.com/).
1. Go to Developer -> API keys and copy your publishable key.

### Clone the repository

```shell
git clone https://github.com/samiralibabic/commercejs.git
```

### Setup environment

Add `.env` to your `.gitignore` file to avoid publishing sensitive data.

Create a new file named `.env` at the root of the project and add your Commerce.js and Stripe Keys:

```shell
REACT_APP_CHEC_PK=your_commercejs_api_public_key
REACT_APP_STRIPE_PK=your_stripe_api_public_key
```

### Add Stripe as a payment gateway

Add Stripe as payment gateway in commercejs [Dashboard](https://dashboard.chec.io/settings/gateways).

### Install dependencies

```shell
npm install
```

### Run

```shell
npm start
```

> Please note that by ignoring the `.env` file, you are preventing the API key from being exposed in github. This is important to ensure the security of your application.

The server runs on `http://localhost:3000`. Happy coding!
