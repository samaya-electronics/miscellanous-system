const express = require('express')
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