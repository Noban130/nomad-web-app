const Places = require('../controllers/Google.places')
const auth = require('../middleware/auth')
let router = require('express').Router()

router.get('/google-places', Places)

module.exports = router