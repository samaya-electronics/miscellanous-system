const { Stock } = require('../models')

const createStock = async (item_id, box_id, quantity) => {
    const result = {}
    try{
        result.categories = await Stock.create({
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

module.exports = {
    createStock
}