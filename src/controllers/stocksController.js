const stocksServices = require('../database/services/stocksServices')

const postStock = async (req, res) => {
    const result = await stocksServices.createStock(
        req.body.item_id,
        req.body.box_id,
        req.body.quantity
    )

    res.json({
        err: result.err,
        msg: result.msg,
        stock: result.stock
    })
}

const getStocks = async(req, res)=>{
    const result = await stocksServices.getStocks()

    res.json({
        err: result.err,
        msg: result.msg,
        stocks: result.stocks
    })
}

const getStockById = async (req, res)=>{
    const result = await stocksServices.getStockById(req.params.id)

    res.json({
        err: result.err,
        msg: result.msg,
        stock: result.stock
    })
}

const updateStock = async (req, res)=>{
    const result = await stocksServices.updateStock(
        req.params.id,
        req.body.item_id,
        req.body.box_id,
        req.body.quantity
    )

    res.json({
        err: result.err,
        msg: result.msg,
        stock: result.stock
    })
}

const deleteStock = async (req, res)=>{
    const result = await stocksServices.deleteStock(req.params.id)

    res.json({
        err: result.err,
        msg: result.msg,
        stock: result.stock
    })
}


module.exports = {
    getStocks,
    getStockById,
    updateStock,
    deleteStock,
    postStock
}