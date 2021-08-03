const express = require('express');
const auth = require('./routes/auth');
const catagories = require('./routes/catagories');

//init
const app = express()

// config
const PORT = process.env.PORT || 5000 
app.use(express.json())


// router
app.use('/auth', auth)
app.use('/catagories', catagories)


app.listen(PORT, console.log(`Server started on port ${PORT}`))