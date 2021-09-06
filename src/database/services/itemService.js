const { Item, User, sequelize } = require('../models')
const stocksServices = require('../services/stocksServices')
const { Op  } = require("sequelize")

const createItem = async (name, threshold, category_id, code, leader_approve) => {
    const result = {}
    try{
        result.item = await Item.create({
            name,
            threshold,
            category_id,
            code,
			leader_approve
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
        // result.items = await Item.findAll({
        //     where: {
        //         quantity: {
        //             [Op.gt]: sequelize.col('Item.threshold')
        //         }
        //     }
        // })
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

const getItemsByName = async (item_name) => {
    result = {}
    try {
        result.items = await Item.findAll({
            where: {
                name: {
                    [Op.substring]: item_name
                }
            }
        })
        result.msg = "Here are your search results"
    }
    catch(err){
        result.err = err
        result.msg = "Could not get your search results"
    }
    return result
}

 const updateItem = async (name, threshold, category_id, code, leader_approve, id) => {
    const result = {}
    try{
        const item = await Item.findByPk(id)
        result.item = await item.update({
					name,
					threshold,
					category_id,
					code,
					leader_approve
				})
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

const createItemAuthenticators = async (item, users_ids) => {
	try{
		let user
		for await (const [i, user_id] of users_ids.entries()){
			user = await User.findByPk(user_id)
			await item.addUser(user, {
				through: {
					order: i+1,
					leader_approve: true
				}
			})
		}
	}
	catch(err){
		return err
	}
	return undefined
}

const editItemAuthenticators = async (item, users_ids) => {
	await item.setUsers([])
	try{
		for await (const [i, user] of users.entries()){
			await item.addUser(user, {
				through: {
					order: i+1,
					leader_approve: true
				}
			})
		}
	}
	catch(err){
		return err
	}
}

const getItemQuantity = async (item_id) => {
    const item = await Item.findByPk(item_id)
    const stocks = await item.getStocks()
    let quantity = 0
    stocks.forEach((stock, i) => {
        quantity = quantity + stock.quantity
    })
    return quantity
}

// const getItemStocks = async (item_id) => {
//     const result = {}
//     try{
//         const quantity = await getItemQuantity(item_id)

//     }
//     catch(err){
//     }
//     return result
// }

module.exports = {
	createItem,
	getItems,
	getItemById,
	updateItem,
	deleteItem,
	createItemAuthenticators,
    getItemsByName,
    getItemQuantity,
	editItemAuthenticators
}