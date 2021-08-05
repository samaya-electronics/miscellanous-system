const express = require('express')
//const { SequelizeScopeError } = require('sequelize/types')

const router = express.Router()
router.use(express.json())


router.get('/login',(req,res)=>{
    const authentication = {
        status : true,
        links: ['/home','/items', '/catagories']
    }
    res.json(authentication)
})


router.post('login',(req,res)=>{
    if(req.body.username=='UN' && req.body.password=='PW'){
        res.json({
            status : true,
            username: hazem,
            links: [
                {name:'/items', power:'crud'},
                {name:'/catagories',power:'crud'},
                {name:'reports',power:'crud'}
            ]
        })
    }
    else{
        res.json({
            status:false,
            username:"",
            links: []
        })
    }

        
    }
})


module.exports = router


//By osama @ 2/8/2021
//adding test function