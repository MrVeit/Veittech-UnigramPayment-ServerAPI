const session = require('./session');
const payment = require('./paymentAPI');
const time = require('./timeUtils');

const express = require('express');
const bodyParser = require('body-parser');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 1000;

let latestPaymentDataFromBot = null;

app.use(bodyParser.json());

app.post('/api/authenticate', bodyParser.text(), (request, result) => 
{
    session.startClientCheckIn(request, result);
});

app.post('/api/payment/create-invoice', session.authenticateClient, async (request, result) =>
{
    await payment.createInvoice(request, result);
});

app.post('/api/payment/refund', session.authenticateClient, async (request, result) =>
{
    await payment.refund(request, result);
});

app.get('/api/payment/latest-order-receipt', session.authenticateClient, (request, result) => 
{
    if (!latestPaymentDataFromBot)
    {
        return result.status(404).json({ error: 'Payment data not found, please try again later!'});
    }

    result.status(200).json(latestPaymentDataFromBot);
});

app.post('/api/payment/order-receipt', session.authenticateBot, (request, result) => 
{
    latestPaymentDataFromBot = request.body;
        
    console.log(`[${time.timestamp}] Received payment data:`, latestPaymentDataFromBot);
        
    result.sendStatus(200);
});

app.listen(port, () => 
{
    console.log(`${time.timestamp} API Server running at ${process.env.SERVER_DOMAIN}:${port}`);
});