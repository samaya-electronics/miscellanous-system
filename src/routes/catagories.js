const express = require('express')
const router = express.Router()
router.use(express.json())
const catagories = require('./test_data/catagories_test_data')


router.get('/',(req,res)=>{
    res.json(catagories)
})


router.get('/:id',(req,res)=>{
    const found = catagories.find(cat=> cat.id === parseInt(req.params.id))
    if(found){
        res.json(found)
    } else{
        console.log(found)
        res.json({msg:'catagorie not found d id ${req.body.id}'})
    }
})


module.exports = router

