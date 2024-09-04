const CheckinCtrl = require('../controllers/Checkin.ctrl')
const auth = require('../middleware/auth')

let router = require('express').Router()

router.post('/', auth, CheckinCtrl.createCheckin)
router.post('/checkin-and-review', auth, CheckinCtrl.createCheckinAndReview)
router.post('/upload-imgs', auth, CheckinCtrl.upload_imgs)
router.delete('/delete-img', auth, CheckinCtrl.delete_img)
router.get('/checkins', auth, CheckinCtrl.getAllCheckins)
router.get('/reviews', auth, CheckinCtrl.getAllReviews)

router.route('/:id')
    .get(auth, CheckinCtrl.getOne)
    .put(auth, CheckinCtrl.update)
    .delete(auth, CheckinCtrl.delete)

module.exports = router