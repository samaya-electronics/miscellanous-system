const { Box } = require('../models')

const createBox = async (name , code , section_id ) => {
    const result = {}
    try{
        result.box = await Box.create({
            name,
            code,
            section_id
        })
        result.msg = "Box Created"
    }
    catch(err){
        result.err = err
        result.msg = "Could not create box, try again later."
    }
    return result
}

const getBoxes = async () => {
    const result = {}
    try{
        result.boxes = await Box.findAll()
        result.msg = "Got all boxes"
    }
    catch(err){
        result.err = err
        result.msg = "Could not get all boxes"
    }
    return result
}

const getBoxById = async (id) => {
   const result = {}
    try{
        result.box = await Box.findByPk(parseInt(id))
        result.msg = "Got Box"
    }
    catch(err){
        result.err = err
        result.msg = "Could not get box"
    }
    return result
}

const updateBox = async (name, code, section_id , id) => {
    const result = {}
    try{
        const box = await Box.findByPk(id)
        result.box = await box.update({name: name , code:code, section_id})
        result.msg = "Updated box"
    }
    catch(err){
        result.err = err
        result.msg = "Could not update box"
    }
    return result
}

const deleteBox = async (id) => {
   const result = {}
    try{
        result.box = await Box.findByPk(id)
        result.box.destroy()
        result.msg = "Deleted box"
    }
    catch(err){
        result.err = err
        result.msg = "Could not delete box"
    }
    return result
}

module.exports = {
    createBox,
    getBoxes,
    getBoxById,
    updateBox,
    deleteBox,
}