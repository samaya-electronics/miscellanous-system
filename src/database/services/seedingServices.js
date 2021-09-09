const { User, Role, Item, sequelize, Category, Area, Section, Box, Stock } = require('../models')


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
    await Area.bulkCreate([
        {name: 'area-1', code: 'A1'},
        {name: 'area-2', code: 'A2'},
        {name: 'area-3', code: 'A3'},
    ])
    await Section.bulkCreate([
        {name: 'section-1', code: 'S1', area_id: 1},
        {name: 'section-2', code: 'S2', area_id: 1},
        {name: 'section-3', code: 'S3', area_id: 2},
    ])
    await Box.bulkCreate([
        {name: 'Box-1', code: 'B1', section_id: 2},
        {name: 'Box-2', code: 'B2', section_id: 2},
        {name: 'Box-3', code: 'B3', section_id: 3},
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
    await Stock.bulkCreate([
        {item_id: 1, box_id: 1, quantity: 30},
        {item_id: 2, box_id: 2, quantity: 40},
        {item_id: 3, box_id: 3, quantity: 50},
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