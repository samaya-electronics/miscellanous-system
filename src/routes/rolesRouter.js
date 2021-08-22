const express = require('express')
const router = express.Router()
const rolesController = require('../controllers/rolesController')

router.get('/',rolesController.getRoles)
router.get('/:id', rolesController.getRoleById)
router.post('/', rolesController.postRole)
router.delete('/:id', rolesController.deleteRole)
router.put('/:id', rolesController.updateRole)

module.exports = router