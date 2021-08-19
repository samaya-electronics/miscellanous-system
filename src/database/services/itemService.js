const { Item } = require('../models')

const createItem = async (name, quantity, location, threshold, category_id) => {
    const result = {}
    try{
        result.item = await Item.create({
            name: name,
            quantity: quantity,
            location: location,
            threshold: threshold,
            category_id: category_id
        })
        result.msg = "Item Created"
    }
    catch(err){
        result.err = err
        result.msg = "Could not create item, try again later."
    }
    return result
}



const getItems = async () => {
    const result = {}
    try{
        result.items = await Item.findAll()
        result.msg = "Got all items"
    }
    catch(err){
        result.err = err
        result.msg = "Could not get all items"
    }
    return result
}

const getItemById = async (id) => {
    const result = {}
     try{
         result.item = await Item.findByPk(parseInt(id))
         result.msg = "Got item"
     }
     catch(err){
         result.err = err
         result.msg = "Could not get item"
     }
     return result
 }

 const updateItem = async (id, name, quantity, location, threshold, category_id) => {
    const result = {}
    try{
        const item = await Item.findByPk(id)
        result.item = await category.update({name: name , quantity: quantity , location: location, threshold: threshold , category_id: category_id})
        result.msg = "Updated Item"
    }
    catch(err){
        result.err = err
        result.msg = "Could not update item"
    }
    return result
}

const deleteItem = async (id) => {
    const result = {}
     try{
         result.item = await Item.findByPk(id)
         result.item.destroy()
         result.msg = "Deleted Item"
     }
     catch(err){
         result.err = err
         result.msg = "Could not delete Item"
     }
     return result
 }
 
 module.exports = {
     createItem,
     getItems,
     getItemById,
     updateItem,
     deleteItem,
 }