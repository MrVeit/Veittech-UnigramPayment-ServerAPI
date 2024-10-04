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

    delete(item)
    {
        var itemId = this.items.indexOf(item);

        delete items[itemId];
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