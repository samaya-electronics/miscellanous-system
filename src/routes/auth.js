const express = require('express')
const { SequelizeScopeError } = require('sequelize/types')
const router = express.Router()
router.use(express.json())


router.get('/login',(req,res)=>{
    const authantication = {
        status : true,
        links: ['/home','/items', '/catgries']
    }
    res.json(authantication)
})


module.exports = router


//By osama @ 2/8/2021
//adding test fuction