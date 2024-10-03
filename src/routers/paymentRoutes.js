const { transactionData, transactionStorage } = require('../database/transactionsStorage');

const sessionValidation = require('../handlers/sessionValidation');
const payment = require('../handlers/paymentApiHelper');

const storage = new transactionStorage();

const express = require('express');
const router = express.Router();

router.post('/create-invoice', 
    sessionValidation.authenticateClient, async (request, result) =>
{
    await payment.createInvoice(request, result);
});

router.post('/refund',
    sessionValidation.authenticateClient, async (request, result) =>
{
    await payment.refund(request, result);
});

router.get('/order-receipt',
    sessionValidation.authenticateClient,(request, result) => 
{
    const { userId, itemId } = request.body;

    if (!userId)
    {
        return result.status(404).json(
        {
            error: `Param 'userId' is required`
        });
    }

    const loadedTransaction = storage.getByUserIdAndItemId(userId, itemId);

    console.log(JSON.stringify(`Loaded available transaction by filter: ${loadedTransaction}`));

    if (!loadedTransaction || loadedTransaction.length === 0)
    {
        return result.status(404).json(
        {
            error: `Target transaction not found`
        });
    }

    result.status(200).json(loadedTransaction);
});

router.post('/update-order-receipt',
    sessionValidation.authenticateBot, (request, result) => 
{
    latestReceipt = request.body;

    if (!latestReceipt)
    {
        return result.status(404).json(
        {
            error: `Failed to load order receipt from bot`
        });
    }
        
    console.log(`[${time.getCurrentTimestamp()}] Received payment data:`, latestReceipt);

    const buyerTelegramId = latestReceipt.provider_payment_charge_id.split('_')[0];

    storage.add(new transactionData(
        `${latestReceipt.telegram_payment_charge_id}`,
        `${buyerTelegramId}`,
        `${latestReceipt.invoice_payload}`,
        `${latestReceipt.total_amount}`));

    console.log(`[${time.getCurrentTimestamp()}] ` +
        `Receipt ${lates.telegram_payment_charge_id} ` +
        `successfully added to temporary storage: ` +
        `${storage.get(lates.telegram_payment_charge_id)} for user: ${buyerTelegramId}`);
        
    result.sendStatus(200);
});

router.get('/purchase-history', 
    sessionValidation.authenticateClient, async (request, result) =>
{
    await payment.getPurchaseHistory(request, result);
});

router.get('/refund-history', 
    sessionValidation.authenticateClient, async (request, result) =>
{
    await payment.getRefundHistory(request, result);
});

module.exports = router;