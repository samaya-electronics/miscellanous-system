const express = require('express')
const router = express.Router()
const permissionController = require('../controllers/permissionController')

router.get('/',permissionController.getpermissions)
router.get('/:pk', permissionController.getpermissionsById)
router.post('/', permissionController.createpermissions)
router.delete('/:pk', permissionController.deletepermissions)
router.put('/:pk', permissionController.updatepermissions)

module.exports = router