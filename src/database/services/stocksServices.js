const { Stock } = require('../models')

const createStock = async (item_id, box_id, quantity) => {
    const result = {}
    try{
        result.stock = await Stock.create({
            box_id,
            item_id,
            quantity
        })
        result.msg = "Stock created"
    }
    catch(err){
        result.err = err
        result.msg = "Could not create stock"
    }
    return result
}

const getStocks = async () => {
    const result = {}
    try{
        result.stocks = await Stock.findAll()
        result.msg = "Got all stocks"
    }
    catch(err){
        result.err = err
        result.msg = "Could not get all stocks"
    }
    return result
}

const getStockById = async (id) => {
   const result = {}
    try{
        result.stock = await Stock.findByPk(parseInt(id))
        result.msg = "Got Stock"
    }
    catch(err){
        result.err = err
        result.msg = "Could not get Stock"
    }
    return result
}

const updateStock = async (id, item_id, box_id, quantity) => {
    const result = {}
    try{
        const stock = await Stock.findByPk(id)
        result.stock = await stock.update({
            box_id,
            item_id,
            quantity
        })
        result.msg = "Updated stock"
    }
    catch(err){
        result.err = err
        result.msg = "Could not update stock"
    }
    return result
}

const deleteStock = async (id) => {
   const result = {}
    try{
        result.stock = await Stock.findByPk(id)
        result.stock.destroy()
        result.msg = "Deleted stock"
    }
    catch(err){
        result.err = err
        result.msg = "Could not delete stock"
    }
    return result
}

const getItemQuantity = async (item_id) => {
    const item = await Item.findByPk(item_id)
    const stocks = await item.getStocks()
    let quantity = 0
    stocks.forEach((stock, i) => {
        quantity = quantity + stock.quantity
    })
    return quantity
}

module.exports = {
    createStock,
    deleteStock,
    updateStock,
    getStockById,
    getItemQuantity,
    getStocks
}