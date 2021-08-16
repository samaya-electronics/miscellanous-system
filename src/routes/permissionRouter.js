const express = require('express')
const router = express.Router()
const permissionController = require('../controllers/permissionsController')

router.get('/',permissionController.getpermissions)
router.get('/:pk', permissionController.getpermissionsById)
router.post('/', permissionController.createPermission)
router.delete('/:pk', permissionController.deletePermission)
router.put('/:pk', permissionController.updatePermission)

module.exports = router
