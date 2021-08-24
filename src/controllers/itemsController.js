const itemServices = require('../database/services/itemService')

const getItems = async(req, res)=>{
    const result = await itemServices.getItems()

    res.json({
        err: result.err,
        msg: result.msg,
        items: result.items
    })
}

const postItem = async (req, res)=>{
    const result = await itemServices.createItem(
        req.body.name,
        req.body.quantity,
        req.body.location,
        req.body.threshold,
        req.body.category_id
    )
    await itemServices.createItemAuthenticators(
        item,
        req.body.users_ids,
        req.body.order,
        req.body.leader_approve
    )

    res.json({
        err: result.err,
        msg: result.msg,
        item: result.item
    })
}

const getItemById = async (req, res)=>{
    const result = await itemServices.getItemById(req.params.id)

    res.json({
        err: result.err,
        msg: result.msg,
        item: result.item
    })
}

const updateItem = async (req, res)=>{
    const result = await itemServices.updateItem(
        req.body.name,
        req.body.quantity,
        req.body.location,
        req.body.threshold,
        req.body.category_id,
        req.params.id
    )

    res.json({
        err: result.err,
        msg: result.msg,
        item: result.item
    })
}

const deleteItem = async (req, res)=>{
    const result = await itemServices.deleteItem(req.params.id)

    res.json({
        err: result.err,
        msg: result.msg,
        item: result.item
    })
}

module.exports = {
    getItemById,
    postItem,
    updateItem,
    deleteItem,
    getItems
}