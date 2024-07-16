const time = require('./timeUtils');

const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');
const fs = require('fs');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 1000;

const options =
{
    key: fs.readFileSync('/usr/src/app/cert/private.key'),
    cert: fs.readFileSync('/usr/src/app/cert/certificate.crt')
};

let latestPaymentDataFromBot = null;

app.use(bodyParser.json());

app.post('/api/payment/process', (request, result) =>
{
    latestPaymentDataFromBot = request.body;

    console.log(`[${time.timestamp}] Received payment data:`, latestPaymentDataFromBot);

    result.sendStatus(200);
});

app.get('/api/payment/get-info', (request, result) =>
{
    if (!latestPaymentDataFromBot)
    {
        return result.status(404).json({ error: 'Bot payment data not found, please try again later!'});
    }

    result.status(200).json(latestPaymentDataFromBot);
});

https.createServer(options, app).listen(port, () => {
    console.log(`Server running at https://${process.env.SERVER_DOMAIN}:${port}`);
});