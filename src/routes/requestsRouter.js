const express = require('express')
const router = express.Router()
const requestController = require('../controllers/requestController')
const { onlyPassRoles } = require('../middleware/authMiddleware')

router.get('/',onlyPassRoles('admin', 'superuser', 'teamleader', 'user') ,requestController.getRequests)
router.get('/deliveries',onlyPassRoles('admin','superuser') , requestController.getDeliveries)
router.get('/:id',onlyPassRoles('admin', 'superuser', 'teamleader', 'user') ,requestController.getRequestById)
router.post('/',onlyPassRoles('admin', 'superuser','teamleader','user') ,requestController.createRequest)
router.put('/:id/deliveries/approve',onlyPassRoles('admin', 'superuser') ,requestController.deliverRequest)
router.put('/:id/approve',onlyPassRoles('admin', 'superuser','teamleader') ,requestController.approveRequest)
router.put('/:id/reject',onlyPassRoles('admin', 'superuser','teamleader') ,requestController.rejectRequest)
router.delete('/:id',onlyPassRoles('admin', 'superuser', 'teamleader' ,'user') ,requestController.deleteRequest)

module.exports = router