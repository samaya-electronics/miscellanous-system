const express = require('express')
<<<<<<< HEAD
//const { SequelizeScopeError } = require('sequelize/types')
=======
// const { SequelizeScopeError } = require('sequelize/types')
>>>>>>> f45cc187fb7d72076c3d6d8fae7e9d1d8c23604d
const router = express.Router()
router.use(express.json())


router.get('/login',(req,res)=>{
    const authentication = {
        status : true,
        links: ['/home','/items', '/catagories']
    }
    res.json(authentication)
})


module.exports = router


//By osama @ 2/8/2021
//adding test function