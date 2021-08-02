const express = require('express');
const auth = require('./routes')

//init
const app = express()

// config
const PORT = process.env.PORT || 5000 
app.use(express.json())


// router
app.use('/auth', auth)


//dummy data

app.get('/users', (req, res)=>{
    res.json(users)
})

app.get('/users/:id', (req, res)=>{
    const {id} = req.params
    res.json(users.find(user => user.id === Number(id)))
})


app.listen(PORT, console.log(`Server started on port ${PORT}`))