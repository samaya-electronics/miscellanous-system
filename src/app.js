const express = require('express');
const cors = require('cors')

const authRouter = require('./routes/authRouter');
const categoriesRouter = require('./routes/categoriesRouter');
const itemsRouter = require('./routes/itemsRouter')

const { sequelize } = require('./models');

// config
const app = express()
const PORT = process.env.PORT || 5000 
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors())


// router
app.use('/auth', authRouter)
app.use('/categories', categoriesRouter)
app.use('/items', itemsRouter)

app.get('/', async (req, res)=>{
    res.json({
        homepage:true
    })
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