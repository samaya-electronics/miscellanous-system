const { User, Role, Item, sequelize, Category } = require('../models')


const mockDB = async () => {
    await sequelize.sync({force: true})
    await Role.bulkCreate([
        {name: 'admin'},
        {name: 'superuser'},
        {name: 'teamleader'},
        {name: 'user'},
    ])
    await Category.bulkCreate([
        {name: 'cat-1'},
        {name: 'cat-2'},
        {name: 'cat-3'},
       ]) 
    await Item.bulkCreate([
        {
        name: "copy book",
        threshold: 20,
        code: "klsjd4l5",
        category_id: 1
        },{
        name: "red tape",
        threshold: 40,
        code: "klsajd45",
        category_id: 2
        },{
        name: "blue tape",
        threshold: 23,
        code: "klsasjd45",
        category_id: 1
        },{
        name: "blue marker",
        threshold: 30,
        code: "klsjads45",
        category_id: 2
        },{
        name: "red marker",
        threshold: 120,
        code: "klsjads45",
        category_id: 3
        },{
        name: "blue pen",
        threshold: 23,
        code: "klsasjd45",
        category_id: 3
        },{
        name: "highliter",
        threshold: 30,
        code: "klsjads45",
        category_id: 3
        }
    ])
    await User.bulkCreate([
        {
        name: "sa3dawy",
        role_id: 2
        },{
        name: "hazem",
        role_id: 3
        },{
        name: "nourhan",
        role_id: 4,
        user_leader_id: 2
        },{
        name: "karim",
        role_id: 4,
        user_leader_id: 2
    },{
        name: "osama",
        role_id: 4,
        user_leader_id: 2
    },{
        name: "youssef",
        role_id: 4,
        user_leader_id: 2
    },{
        name: "shafik",
        role_id: 4,
        user_leader_id: 2
        }
    ])
}

module.exports = {
    mockDB
}