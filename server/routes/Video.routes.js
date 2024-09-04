const router = require('express').Router()
const VideoCtrl = require('../controllers/Video.ctrl')
const auth = require('../middleware/auth')

router.post('/', auth, VideoCtrl.create)
router.get('/', auth, VideoCtrl.getAll)
router.get('/foryou', auth, VideoCtrl.foryou)

router.get('/videos/:id', auth, VideoCtrl.get_account_videos)
router.get('/liked-videos/:id', auth, VideoCtrl.liked_videos)
router.get('/saved-videos/:id', auth, VideoCtrl.saved_videos)

router.post('/search', auth, VideoCtrl.find_video)

router.post('/upload-assets', auth, VideoCtrl.upload_assets)
router.post('/delete-asset', auth, VideoCtrl.delete_asset)

router.post('/upload-video', auth, VideoCtrl.upload_video)
router.delete('/delete-video', auth, VideoCtrl.delete_video)

router.get('/:id', auth, VideoCtrl.getOne)
router.put('/:id', auth, VideoCtrl.update)
router.delete('/:id', auth, VideoCtrl.delete)
    
router.post('/:id/like', auth, VideoCtrl.like)
router.post('/:id/save', auth, VideoCtrl.save)

router.get('/:id/comment', auth, VideoCtrl.get_comments)
router.post('/:id/comment', auth, VideoCtrl.add_comment)
router.delete('/:id/comment', auth, VideoCtrl.remove_comment)


module.exports = router