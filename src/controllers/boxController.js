const BoxServices = require('../database/services/boxService')

const getBoxes = async(req, res)=>{
    const result = await BoxServices.getBoxes()

    res.json({
        err: result.err,
        msg: result.msg,
        boxes: result.boxes,
    })
}

const postBox = async (req, res)=>{
    const result = await BoxServices.createBox(req.body.Box_name, req.body.Box_code , req.body.section_id)

    res.json({
        err: result.err,
        msg: result.msg,
        box: result.box
    })
}

const getBoxById = async (req, res)=>{
    const result = await BoxServices.getBoxById(req.params.id)

    res.json({
        err: result.err,
        msg: result.msg,
        box: result.box
    })
}

const updateBox = async (req, res)=>{
    const result = await BoxServices.updateBox(req.body.Box_name,  req.body.Box_code , req.body.section_id ,req.params.id)

    res.json({
        err: result.err,
        msg: result.msg,
        box: result.box
    })
}

const deleteBox = async (req, res)=>{
    const result = await BoxServices.deleteBox(req.params.id)

    res.json({
        err: result.err,
        msg: result.msg,
        box: result.box
    })
}

module.exports = {
    getBoxById,
    postBox,
    updateBox,
    deleteBox,
    getBoxes
}