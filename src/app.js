const express = require('express');
const bodyParser = require('body-parser');
const sqlize = require('sequelize');

// inits
const app = express()

const sequelize = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect: 'mysql'
    }
);

// config
const PORT = process.env.PORT || 5000 

//test
app.use(express.json())

users = [
    {
        id:1,
        username:"karim",
        password:"test123"
    },
    {
        id:2,
        username:"osama",
        password:"test123"
    },
    {
        id:3,
        username:"karim2",
        password:"test123"
    },
    {
        id:4,
        username:"osama2",
        password:"test123"
    },
    {
        id:5,
        username:"osama3",
        password:"test123"
    },    

]

app.get('/users', (req, res)=>{
    res.json(users)
})

app.get('/users/:id', (req, res)=>{
    const {id} = req.params
    res.json(users.find(user => user.id === Number(id)))
})


app.listen(PORT, console.log(`Server started on port ${PORT}`))