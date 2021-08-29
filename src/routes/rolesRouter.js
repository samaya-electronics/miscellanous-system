const express = require('express')
const router = express.Router()
const rolesController = require('../controllers/rolesController')
const { onlyPassRoles } = require('../middleware/authMiddleware')

router.get('/',onlyPassRoles('admin', 'superuser'),rolesController.getRoles)
router.get('/:id',onlyPassRoles('admin', 'superuser') ,rolesController.getRoleById)
router.get('/:id/users',onlyPassRoles('admin', 'superuser') ,rolesController.getRoleUsers)
router.post('/',onlyPassRoles('admin') ,rolesController.postRole)
router.delete('/:id',onlyPassRoles('admin') ,rolesController.deleteRole)
router.put('/:id',onlyPassRoles('admin') ,rolesController.updateRole)

module.exports = router