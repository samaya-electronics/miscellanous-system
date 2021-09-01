const express = require('express')
const router = express.Router()
const box = require('../controllers/boxController')
const { onlyPassRoles } = require('../middleware/authMiddleware')


router.get('/:id',onlyPassRoles('superuser'),box.getBoxById)
router.get('/',onlyPassRoles('superuser'),box.getBoxes)
router.post('/',onlyPassRoles('superuser'),box.postBox)
router.put('/:id',onlyPassRoles('superuser'),box.updateBox)
router.delete('/:id',onlyPassRoles('superuser'),box.deleteBox)

module.exports = router