const AreaServices = require('../database/services/areaService')

const getAreas = async(req, res)=>{
    const result = await AreaServices.getAreas()

    res.json({
        err: result.err,
        msg: result.msg,
        areas: result.areas,
    })
}

const postArea = async (req, res)=>{
    const result = await AreaServices.createArea(req.body.Area_name, req.body.Area_code)

    res.json({
        err: result.err,
        msg: result.msg,
        area: result.area
    })
}

const getAreaById = async (req, res)=>{
    const result = await AreaServices.getAreaById(req.params.id)

    res.json({
        err: result.err,
        msg: result.msg,
        area: result.area
    })
}

const updateArea = async (req, res)=>{
    const result = await AreaServices.updateArea(req.body.Area_name,  req.body.Area_code ,req.params.id)

    res.json({
        err: result.err,
        msg: result.msg,
        area: result.area
    })
}

const deleteArea = async (req, res)=>{
    const result = await AreaServices.deleteArea(req.params.id)

    res.json({
        err: result.err,
        msg: result.msg,
        area: result.area
    })
}

module.exports = {
    getAreaById,
    postArea,
    updateArea,
    deleteArea,
    getAreas
}