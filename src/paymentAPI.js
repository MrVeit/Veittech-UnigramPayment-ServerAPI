const time = require('./timeUtils');

const axios = require('axios');

require('dotenv').config();

const createInvoiceLink = `https://api.telegram.org/bot${process.env.BOT_TOKEN}/createInvoiceLink`;
const refundPaymentLink = `https://api.telegram.org/bot${process.env.BOT_TOKEN}/refundStarPayment`;

async function createInvoice(request, result)
{
    var productData = createProductData(request);

    try
    {
        const response = await axios.post(createInvoiceLink, productData);

        if (response.data && response.data.result)
        {
            result.status(200).json({ invoiceLink: response.data.result });
        }
        else
        {
            result.status(500).json({ error: 'Failed to create invoice link.'});
        }
    }
    catch (error)
    {
        console.error(`[${time.timestamp}] Error creating invoice:`, error);

        if (error.response && error.response.data && error.response.data.description)
        {
            result.status(error.res.status).json({ error: error.response.data.description });
        }
        else
        {
            result.status(500).json({ error: 'Internal server error' });
        }
    }
}

async function refund(request, result)
{
    var refundData = createRefundData(request);

    try 
    {
        const response = await axios.post(refundPaymentLink, refundData);

        if (response.data && response.data.ok)
        {
            result.status(200).json({ message: 'The refund to the buyer was successfully made'})
        }
        else
        {
            result.status(500).json({ error: 'Failed to process refund' });
        }
    }
    catch (error)
    {
        console.error(`[${time.timestamp}] Error processing refund:`, error);

        if (error.response && error.response.data && error.response.data.description) 
        {
            result.status(error.response.status).json({ error: error.response.data.description });
        } 
        else 
        {
            result.status(500).json({ error: 'Internal server error' });
        }
    }
}

function createProductData(request)
{
    const { title, description, payload, providerToken, currency, amount } = request.body;

    const data =
    {
        title,
        description,
        payload,
        provider_token: providerToken,
        currency,
        prices: [{ label: title, amount }]
    };

    return data;
}

function createRefundData(request)
{
    const { userId, transactionId } = request.body;

    const data = 
    {
        user_id: userId,
        telegram_payment_charge_id: transactionId
    };

    return data;
}

module.exports = 
{
    createInvoice,
    refund
};