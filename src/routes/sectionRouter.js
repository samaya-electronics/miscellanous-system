const express = require('express')
const router = express.Router()
const section = require('../controllers/sectionController')
const { onlyPassRoles } = require('../middleware/authMiddleware')


router.get('/:id',onlyPassRoles('superuser'),section.getSectionById)
router.get('/',onlyPassRoles('superuser'),section.getSections)
router.post('/',onlyPassRoles('superuser'),section.postSection)
router.put('/:id',onlyPassRoles('superuser'),section.updateSection)
router.delete('/:id',onlyPassRoles('superuser'),section.deleteSection)

module.exports = router