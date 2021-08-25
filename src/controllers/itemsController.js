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
        req.body.category_id,
        req.body.code,
        req.body.leader_approve
    )
    const err = await itemServices.createItemAuthenticators(
        result.item,
        req.body.users_ids
    )

    res.json({
        err: result.err || err,
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
        req.body.code,
        req.body.leader_approve,
        req.params.id
    )
    const err = await itemServices.createItemAuthenticators(
        result.item,
        req.body.users_ids
    )

    res.json({
        err: result.err || err,
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