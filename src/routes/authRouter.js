const express = require('express')
const router = express.Router()

router.get('/login',(req,res)=>{
    const authentication = {
        status : true,
        links: ['/home','/items', '/catagories']
    }
    res.json(authentication)
})

router.post('/login',(req,res)=>{
    const username = req.body.username
    const password = req.body.password
    if((username == 'user' && password == 'user') ||
        (username == 'admin' && password == 'admin') ||
        (username == 'superuser' && password == 'superuser')
        ){
        res.json({
            status : true,
            username: username,
            links: [
                {name:'items', power:["create","read","update","delete"]},
                {name:'catagories',power:["create","read","update","delete"]},
                {name:'reports',power:["create","read","update","delete"]}
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
})

module.exports = router