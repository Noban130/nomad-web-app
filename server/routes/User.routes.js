const router = require('express').Router()
const UserCtrl = require('../controllers/User.ctrl')
const auth = require('../middleware/auth')

router.post('/register', UserCtrl.register)
router.post('/login', UserCtrl.login)
router.post('/activate', UserCtrl.activateEmail)
router.post('/forgot-password', UserCtrl.forgotPassword)
router.post('/reset-password', auth, UserCtrl.resetPassword)
router.get('/refreshtoken', UserCtrl.refreshtoken)
router.get('/logout', UserCtrl.logout)

router.get('/userinfo', auth, UserCtrl.userInfo)
router.put('/fullname', auth, UserCtrl.fullname)
router.put('/birthday', auth, UserCtrl.birthday)
router.put('/country', auth, UserCtrl.country)
router.put('/profile-img', auth, UserCtrl.upload_profile_img)
router.put('/profile-img/:owner', auth, UserCtrl.delete_profile_img)
router.put('/fullinfos', auth, UserCtrl.fullinfos)

router.get('/inbox', auth, UserCtrl.inbox)

router.put('/add-visited-country', auth, UserCtrl.add_visited_country)
router.put('/add-bucket-list-country', auth, UserCtrl.add_bucket_list_country)
router.put('/remove-visited-country', auth, UserCtrl.remove_visited_country)
router.put('/remove-bucket-list-country', auth, UserCtrl.remove_bucket_list_country)

router.get('/all', auth, UserCtrl.all_users)
router.get('/search', auth, UserCtrl.find_user)

router.get('/account/:id', auth, UserCtrl.accountProfile)
router.get('/account/connect/:id', auth, UserCtrl.send_remove_connection_request)
router.post('/account/accept/:id', auth, UserCtrl.accept_deny_connection_request)

router.get('/connection-requests', auth, UserCtrl.get_connections_requests)
router.get('/connection-requests-sent', auth, UserCtrl.get_connections_requests_sent)
router.get('/connections', auth, UserCtrl.connections)
router.get('/connections/:id', auth, UserCtrl.account_connections)

module.exports = router