const express = require('express')
const router = express.Router()
const boxRouter = require('../controllers/boxController')
const { onlyPassRoles } = require('../middleware/authMiddleware')


router.get('/',onlyPassRoles('superuser'),boxRouter.getBoxes)
router.get('/:id',onlyPassRoles('superuser'),boxRouter.getBoxById)
router.post('/',onlyPassRoles('superuser'),boxRouter.postBox)
router.put('/:id',onlyPassRoles('superuser'),boxRouter.updateBox)
router.delete('/:id',onlyPassRoles('superuser'),boxRouter.deleteBox)

module.exports = router