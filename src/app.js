const express = require('express')
const cors = require('cors')
const app = express()

const homeRouter = require('./routes/homeRouter')
const authRouter = require('./routes/authRouter')
const categoriesRouter = require('./routes/categoriesRouter')
const itemsRouter = require('./routes/itemsRouter')
const usersRouter = require('./routes/usersRouter')
const requestRouter = require('./routes/requestsRouter')
const permissionRouter = require('./routes/permissionRouter')
const rolesRouter = require('./routes/rolesRouter')
const authMiddleware = require('./middleware/authMiddleware')

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors())

// router
app.use('/', homeRouter)
app.use('/auth', authRouter)

app.use(authMiddleware.authenticateToken)
app.use('/categories', categoriesRouter)
app.use('/items', itemsRouter)
app.use('/users', usersRouter)
app.use('/requests', requestRouter)
app.use('/permissions', permissionRouter)
app.use('/roles', rolesRouter)

module.exports = app