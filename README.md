# Webshop Example

This is a simple webshop example showcasing the usage of Commerce.js, MUI, and Stripe.

## Instructions

Follow these steps to set up and run the project:

1. Log in or create an account on [Commerce.js](https://commercejs.com/).
2. Go to the "Developer" section and copy your API key (sandbox, public).
3. Log in or create an account on [Stripe](https://stripe.com/).
4. Go to Developer -> API keys and copy your publishable key.
5. Create a new file named `.env` at the root of the project.
6. Add `.env` to your `.gitignore` file to avoid publishing sensitive data.
7. Inside the `.env` file, assign your Commerce.js Sandbox API key to the variable `REACT_APP_CHEC_PK`.
   Also, assign your Stripe API key to another variable `REACT_APP_STRIPE_PK`. Example:
   `REACT_APP_CHEC_PK=your_commercejs_api_public_key`
   `REACT_APP_STRIPE_PK=your_stripe_api_public_key`
8. Add Stripe as payment gateway in commercejs [Dashboard](https://dashboard.chec.io/settings/gateways).
8. Run `npm install` to install the project dependencies.
9. Start the project with `npm start`.

Make sure you have Node.js and npm installed on your system before running the above commands.

Please note that by ignoring the `.env` file, you are preventing the API key from being exposed in github. This is important to ensure the security of your application.

Happy coding!
