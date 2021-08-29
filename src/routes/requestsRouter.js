const express = require('express')
const router = express.Router()
const requestController = require('../controllers/requestController')
const { onlyPassRoles } = require('../middleware/authMiddleware')

router.get('/:id',onlyPassRoles('admin', 'superuser', 'teamleader', 'user') ,requestController.getRequestById)
router.get('/',onlyPassRoles('admin', 'superuser', 'teamleader', 'user') ,requestController.getRequests)
router.post('/',onlyPassRoles('admin', 'superuser','teamleader','user') ,requestController.createRequest)
router.delete('/:id',onlyPassRoles('admin', 'superuser', 'teamleader' ,'user') ,requestController.deleteRequest)

module.exports = router