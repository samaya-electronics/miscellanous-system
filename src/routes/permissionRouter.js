const express = require('express')
const router = express.Router()
const permissionController = require('../controllers/permissionsController')


router.get('/',permissionController.getPermissions)
router.get('/:id', permissionController.getPermissionById)
router.post('/', permissionController.postPermission)
router.delete('/:id', permissionController.deletePermission)
router.put('/:id', permissionController.updatePermission)

module.exports = router
