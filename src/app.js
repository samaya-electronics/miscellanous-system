const express = require('express');
const auth = require('./routes/auth')

//init
const app = express()

// config
const PORT = process.env.PORT || 5000 
app.use(express.json())


// router
app.use('/auth', auth)

app.get('/', (req, res)=>{
    res.json({allGood:true})
})

app.listen(PORT, console.log(`Server started on port ${PORT}`))