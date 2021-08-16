const express = require('express')
const router = express.Router()
const request = require('../controllers/requestController')

router.get('/:PK',request.getrequestById)

router.get('/',request.getAllrequests)

router.post('/',request.createrequest)

router.delete('/:PK',request.deleterequest)


module.exports = router