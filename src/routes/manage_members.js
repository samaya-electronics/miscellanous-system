const express = require('express')
const router = express.Router()
router.use(express.json())



router.get('/',(req,res)=>{
    res.json(members)
})


router.get('/:id',(req,res)=>{
    const found = members.find(mem=> mem.id === parseInt(req.params.id))
    if(found){
        res.json(found)
    } else{
        res.json({msg:'member not found d id ${req.body.id}'})
    }
})


// creating members

router.post('/',(req,res)=>{
    const newMember = {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email,
        status: 'active'
    }

    if(!newMember.name || !newMember.email){
       return res.status(400).json({msg: 'please write the name and email'})
    }

    members.push(newMember)
    res.json(members)
})

// update members

router.put('/:id',(req,res)=>{
    const found = members.find(mem=> mem.id === parseInt(req.params.id))

    if(found){
        const updateMember = req.body
        members.forEach(member => {
            if(member.id === parseInt(req.params.id)){
                member.name = updateMember.name ? updateMember.name : member.name
                member.email= updateMember.email ? updateMember.email: member.email

                res.json({msg: 'member updated', member})
            }
        })
    } else{
        res.json({msg:'member not found d id ${req.body.id}'})
    }

})

// delete member

router.delete('/:id',(req,res)=>{
    const found = members.find(mem=> mem.id === parseInt(req.params.id))
    if(found){
        res.json({
            msg:'member deleted',
            members: found.delete
        })
    } else{
        res.json({msg:'member not found d id ${req.body.id}'})
    }
})

module.exports = router

