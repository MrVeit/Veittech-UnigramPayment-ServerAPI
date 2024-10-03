class transactionData
{
    constructor(id, buyerId, itemId, itemPrice)
    {
        this.id = id;
        this.buyerId = buyerId;
        this.itemId = itemId;
        this.price = itemPrice;
    }
}

class transactionStorage
{
    constructor()
    {
        this.items = [];
    }

    add(item)
    {
        this.items.push(item);
    }

    get(transactionId)
    {
        return this.items.find(item => item.transactionId === transactionId);
    }

    getByUserId(buyerId)
    {
        return this.items.filter(item => item.buyerId === buyerId);
    }

    getByItemId(itemId)
    {
        return this.items.filter(item => item.itemId === itemId);
    }

    getByUserIdAndItemId(buyerId, itemId) 
    {
        return this.items.find(item => item.buyerId === buyerId && item.itemId === itemId);
    }
}

module.exports = 
{
    transactionStorage,
    transactionData
}