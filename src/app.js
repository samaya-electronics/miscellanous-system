const express = require('express');
const auth = require('./routes/auth');
const members= require('./routes/manage_members');
const catagories = require('./routes/catagories');
const cors = require('cors')
const {sequelize} = require('./models')
//init
const app = express()

// config
const PORT = process.env.PORT || 5000 
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors())


// router
app.use('/auth', auth)
app.use('/catagories', catagories)
app.use('/members', members)

app.get('/', (req, res)=>{
    res.json({homepage:true})
})

app.listen(PORT, async () => {
    console.log(`Server started on port ${PORT}`)
    try{
        await sequelize.sync({force: true})
        console.log("Database synced")
    }
    catch(err){
        console.log(err)
    }
})