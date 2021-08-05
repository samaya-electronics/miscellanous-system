const express = require('express')
const router = express.Router()
router.use(express.json())
const catagories = require('./cat')


router.get('/',(req,res)=>{
    res.json(catagories)
})


router.get('/:id',(req,res)=>{
    const found = catagories.some(catagories=>catagories.id===parseInt(req.params.id))
    if(found){
    res.json(catagories.filter(catagories=> catagories.id === req.params.id))
    } else{
        res.statusCode(400).json({msg:'catagorie not found d id ${req.params.id}'})
    }
})


module.exports = router

