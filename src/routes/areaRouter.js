const express = require('express')
const router = express.Router()
const area = require('../controllers/areaController')
const { onlyPassRoles } = require('../middleware/authMiddleware')


router.get('/:id',onlyPassRoles('superuser'),area.getAreaById)
router.get('/',onlyPassRoles('superuser'),area.getAreas)
router.post('/',onlyPassRoles('superuser'),area.postArea)
router.put('/:id',onlyPassRoles('superuser'),area.updateArea)
router.delete('/:id',onlyPassRoles('superuser'),area.deleteArea)

module.exports = router