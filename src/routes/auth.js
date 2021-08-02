const express = require('express')
let router = express.Router()


router.get('/login',(req,res)=>{
    res.send(true)
})





module.exports = router