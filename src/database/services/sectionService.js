const { Section } = require('../models')

const createSection = async (name, code , area_id ) => {
    const result = {}
    try{
        result.section = await Section.create({
            name,
            code,
            area_id
        })
        result.msg = "Section Created"
    }
    catch(err){
        result.err = err
        result.msg = "Could not create section, try again later."
    }
    return result
}

const getSections = async () => {
    const result = {}
    try{
        result.sections = await Section.findAll()
        result.msg = "Got all sections"
    }
    catch(err){
        result.err = err
        result.msg = "Could not get all sections"
    }
    return result
}

const getSectionById = async (id) => {
   const result = {}
    try{
        result.section = await Section.findByPk(parseInt(id))
        result.msg = "Got Section"
    }
    catch(err){
        result.err = err
        result.msg = "Could not get Section"
    }
    return result
}

const updateSection = async (name, code , area_id ,id) => {
    const result = {}
    try{
        const section = await Section.findByPk(id)
        result.section = await section.update({name: name , code:code , area_id})
        result.msg = "Updated section"
    }
    catch(err){
        result.err = err
        result.msg = "Could not update section"
    }
    return result
}

const deleteSection = async (id) => {
   const result = {}
    try{
        result.section = await Section.findByPk(id)
        result.section.destroy()
        result.msg = "Deleted section"
    }
    catch(err){
        result.err = err
        result.msg = "Could not delete section"
    }
    return result
}

module.exports = {
    createSection,
    getSections,
    getSectionById,
    updateSection,
    deleteSection,
}