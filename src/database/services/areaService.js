const { Area } = require('../models')

const createArea = async (name,code) => {
    const result = {}
    try{
        result.area = await Area.create({
            name,
            code,
        })
        result.msg = "Area Created"
    }
    catch(err){
        result.err = err
        result.msg = "Could not create area, try again later."
    }
    return result
}

const getAreas = async () => {
    const result = {}
    try{
        result.areas = await Area.findAll()
        result.msg = "Got all areas"
    }
    catch(err){
        result.err = err
        result.msg = "Could not get all areas"
    }
    return result
}

const getAreaById = async (id) => {
   const result = {}
    try{
        result.area = await Area.findByPk(parseInt(id))
        result.msg = "Got Area"
    }
    catch(err){
        result.err = err
        result.msg = "Could not get area"
    }
    return result
}

const updateArea = async (name, code ,id) => {
    const result = {}
    try{
        const area = await Area.findByPk(id)
        result.area = await area.update({name: name , code:code})
        result.msg = "Updated area"
    }
    catch(err){
        result.err = err
        result.msg = "Could not update area"
    }
    return result
}

const deleteArea = async (id) => {
   const result = {}
    try{
        result.area = await Area.findByPk(id)
        result.area.destroy()
        result.msg = "Deleted area"
    }
    catch(err){
        result.err = err
        result.msg = "Could not delete area"
    }
    return result
}

const getSectionsByArea = async (area_id) => {
    const result = {}
     try{
         const area = await Area.findByPk(area_id)
         result.sections = await item.getSections()
         result.msg = "got all sections of the area"
     }
     catch(err){
         result.err = err
         result.msg = "Could not get sections"
     }
     return result
 }



module.exports = {
    createArea,
    getAreas,
    getSectionsByArea,
    getAreaById,
    updateArea,
    deleteArea,
}