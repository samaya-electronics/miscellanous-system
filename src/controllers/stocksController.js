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


module.exports = {
    postStock
}