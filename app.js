const express = require('express');
const app = express()
const bcrypt = require('bcrypt')
 
// test comment
app.use(express.json())

users = [
    {
        username:"karim",
        password:"test123"
    },
    {
        username:"osama",
        password:"test123"
    }
]

app.get('/users', (req, res)=>{
    res.json(users)
})

app.post('/users', async (req, res)=>{
    try {
        // const userSalt = await bcrypt.genSalt()
        const hashedP = await bcrypt.hash(req.body.password, 10)
        const user = {username: req.body.username, password: hashedP}
        users.push(user)
        console.log(user)
        res.status(201).send()
    }
    catch {
        res.status(500).send()
    }
})

app.listen(5000)