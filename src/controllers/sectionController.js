const SectionServices = require('../database/services/sectionService')

const getSections = async(req, res)=>{
    const result = await SectionServices.getSections()

    res.json({
        err: result.err,
        msg: result.msg,
        sections: result.sections,
    })
}

const postSection = async (req, res)=>{
    const result = await SectionServices.createSection(req.body.Section_name, req.body.Section_code, req.body.area_id )

    res.json({
        err: result.err,
        msg: result.msg,
        section: result.section
    })
}

const getSectionById = async (req, res)=>{
    const result = await SectionServices.getSectionById(req.params.id)

    res.json({
        err: result.err,
        msg: result.msg,
        section: result.section
    })
}

const updateSection = async (req, res)=>{
    const result = await SectionServices.updateSection(req.body.Section_name,  req.body.Section_code, req.body.area_id ,req.params.id)

    res.json({
        err: result.err,
        msg: result.msg,
        section: result.section
    })
}

const deleteSection = async (req, res)=>{
    const result = await SectionServices.deleteSection(req.params.id)

    res.json({
        err: result.err,
        msg: result.msg,
        section: result.section
    })
}

const deleteSection = async (req, res)=>{
    const result = await SectionServices.deleteSection(req.params.id)

    res.json({
        err: result.err,
        msg: result.msg,
        section: result.section
    })
}

const getBoxesBySection = async (req, res)=>{
    const result = await SectionServices.getBoxesBySection(req.params.id)

    res.json({
        err: result.err,
        msg: result.msg,
        boxes: result.boxes
    })
}

module.exports = {
    getSectionById,
    getBoxesBySection,
    postSection,
    updateSection,
    deleteSection,
    getSections
}