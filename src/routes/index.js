const { Router } = require('express');
const router = Router();
const stripe = require('stripe')('sk_test_51GqW6WKZFg7mmPnYMsudgkjxSdkWstmBQHVS04ziPldsYgAxL86hNKEn58nH1D7Y9GWoR1NWzkTZ5bYOQMYVTCch00YXEvlZDq');

router.get('/', (req, res) => {
    res.render('partials/index.hbs');

});
/**
 * Recibo tres datos y eso me sirve para iniciar una transaccion
 * Creo un comprador con email y el source: es el token
 * Cargos de la compra, el valor. moneda, comprador, descripcion
 * una vez este hecha me da un id
 */
router.post('/checkout', async (req, res) => {
    console.log(req.body);
    const customer = await stripe.customers.create({
        email: req.body.stripeEmail,
        source: req.body.stripeToken
    });

    const charge = await stripe.charges.create({
        amount: '3000',
        currency: 'usd',
        customer: customer.id,
        description: 'Windows 10 Software'
    });
    console.log(charge.id);

    //Final show a sucess view
    res.render('partials/download');
});

module.exports = router;