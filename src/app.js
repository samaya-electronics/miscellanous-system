const express = require('express')
const cors = require('cors')

const homeRouter = require('./routes/homeRouter')
const authRouter = require('./routes/authRouter')
const categoriesRouter = require('./routes/categoriesRouter')
const itemsRouter = require('./routes/itemsRouter')
const usersRouter = require('./routes/usersRouter')
const requestRouter = require('./routes/requestsRouter')
const permissionRouter = require('./routes/permissionRouter')
const rolesRouter = require('./routes/rolesRouter')

const { sequelize } = require('./models')

// config
const app = express()
const PORT = process.env.PORT || 5000 
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors())


// router
app.use('/', homeRouter)
app.use('/auth', authRouter)
app.use('/categories', categoriesRouter)
app.use('/items', itemsRouter)
app.use('/users',usersRouter)
app.use('./routers',requestRouter)
app.use('./permissions',permissionRouter)
app.use('/roles',rolesRouter)


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