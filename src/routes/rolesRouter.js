const express = require('express')
const router = express.Router()
const rolesController = require('../controllers/rolesController')

router.get('/',rolesController.getAllRoles)
router.get('/:pk', rolesController.getRoleById)
router.post('/', rolesController.createRole)
router.delete('/:pk', rolesController.deleteRole)
router.put('/:pk', rolesController.updateRole)

module.exports = router