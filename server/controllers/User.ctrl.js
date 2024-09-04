const User = require('../models/User.model');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const { uploadFiles, deleteFile } = require('./S3.methods');
const SendMail = require('./SendMail');

const UserCtrl = {
    register: async (req, res) => {
        try {
            const { email, password } = req.body
            
            if(!validator.isEmail(email)) return res.status(400).json({ message: 'Please enter a valid email!'}) 
            if(password.length < 8) return res.status(400).json({ message: 'Please enter a password at least 8 characters!'}) 
            
            const user = await User.findOne({ email })
            if(user) return res.status(400).json({ message: 'This email is already token. Please choose another one!'})
            
            let random_username = 'user-' + new Date().getTime()

            const salt = 10
            const hashedPassword = await bcrypt.hash(password, salt)
            
            // const newUser = new User({
            //     username: random_username, email, password: hashedPassword
            // })

            // await newUser.save()
            // const accessToken = createAccessToken({ id: newUser._id })
            // const refreshtoken = createRefreshToken({ id: newUser._id })

            // res.cookie('refreshtoken', refreshtoken, {
            //     httpOnly: true,
            //     path: '/api/v0/user/refreshtoken'
            // })

            const newUser = {
                email, password: hashedPassword
            }

            const activationToken = createActivationToken(newUser)
            const url = `${process.env.CLIENT_URL}/user/activate/${activationToken}`
            SendMail('activate', email, url)

            return res.json({ success: true, message: 'Please check your email to complet your registration!' })            
        } catch (error) {
            return res.status(500).json({ success: false, message: error.message })
        }
    },
    
    activateEmail: async (req, res) => {
        try {
            const { activationToken } = req.body
            const user = jwt.verify(activationToken, process.env.ACTIVATION_TOKEN_SECRET)
            const { email, password } = user

            const check = await User.findOne({ email })
            if(check) return res.status(400).json({ msg: 'This email is already exist!' })
            
            let random_username = 'user-' + new Date().getTime()
            
            const newUser = new User({
                username: random_username, email, password
            })
            await newUser.save()

            return res.status(200).json({ success: true, message: 'You account has been activated successfully!' })
        } catch (err) {
            return res.status(500).json({ message: err.message })            
        }
    },
    
    login: async (req, res) => {
        try {
            const { email, password } = req.body

            if(!validator.isEmail(email)) return res.status(400).json({ success: false, message: 'Please enter a valid email!'}) 
            const user = await User.findOne({ email })
            if(!user) return res.status(400).json({  success: false, message: 'Email not found!!' })
            if(password.length < 8) return res.status(400).json({ success: false, message: 'Please enter a password at least 8 characters!'}) 
            
            const isMatch = await bcrypt.compare(password, user.password)
            if(!isMatch) return res.status(400).json({ success: false, message: 'Incorrect password!!' })

            const accesstoken = createAccessToken({ id: user._id })
            const refreshtoken = createRefreshToken({ id: user._id })

            res.cookie('refreshtoken', refreshtoken, {
                httpOnly: true,
                path: '/api/v0/user/refreshtoken'
            })

            return res.status(200).json({ success: true, data: user, accesstoken: accesstoken })
            
        } catch (error) {
            return res.status(500).json({ success: false, message: error.message })
        }
    },
    refreshtoken: async (req, res) => {
        try {
            const token = req.cookies.refreshtoken
            if(!token) return res.status(400).json({ success: false, message: 'Invalid Authentication!' })
            jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
                if(err) return res.status(400).json({ success: false, message: 'Invalid Authentication!'})

                const accesstoken = createAccessToken({ id: user.id })
                return res.status(200).json({ success: true, data: accesstoken })
            })

        } catch (error) {
            return res.status(500).json({ success: false, message: error.message })
        }
    },
    
    forgotPassword: async (req, res) => {
        try {
            const { email } = req.body

            if(!email) return res.status(400).json({ success: false, message: 'Please enter your email!' })
            if(!validator.isEmail(email)) return res.status(400).json({ success: false, message: 'Please enter a valid email!' })
            const user = await User.findOne({ email })
            if(!user) return res.status(400).json({ success: false, message: 'This email does not exist!' })

            const accesstoken = createAccessToken({ id: user._id })
            const url = `${process.env.CLIENT_URL}/user/reset/${accesstoken}`
            
            SendMail('reset', email, url)

            return res.status(200).json({ success: true, message: 'Re-send the password. Please check your email!' })
        } catch (err) {
            return res.status(500).json({ success: false, message: err.message })
        }
    },
    
    resetPassword: async (req, res) => {
        try {
            const { password, confirmPassword } = req.body

            if(!password) return res.status(400).json({ success: false, message: 'Please enter a password!' })
            if(password.length < 8) return res.status(400).json({ success: false, message: 'The password should be at least 8 caracters!' })
            if(password !== confirmPassword) return res.status(400).json({ success: false, message: 'confirm password incorrect!' })
            
            const salt = 10
            const hashedPassword = await bcrypt.hash(password, salt)
            await User.findByIdAndUpdate({ _id: req.user.id }, {
                password: hashedPassword
            })

            return res.json({ success: true, message: 'Your password is updated successfully!' })
        } catch (err) {
            return res.status(500).json({ success: false, message: err.message })
        }
    },

    logout: async (req, res) => {
        try {
            res.clearCookie('refreshtoken', { path: '/api/v0/user/refreshtoken' })
            res.status(200).json({ success: false, data: 'Logout successfult!'})
        } catch (error) {
            return res.status(500).json({ success: false, message: error.message })
        }
    },
    userInfo: async (req, res) => {
        try {
            const user = await User.findById(req.user.id).select('-password')
            return res.status(200).json({ success: true, data: user })
        } catch (error) {
            return res.status(500).json({ success: false, message: error.message })
        }
    },
    fullname: async (req, res) => {
        try {
            let user = await User.findById({ _id: req.user.id })

            let { firstname, lastname, username } = req.body
            if(firstname.lenght < 3) return res.status(400).json({ success: false, message: 'Please write your firstname!' })
            if(username.lenght < 3) return res.status(400).json({ success: false, message: 'Please write your username!' })
            
            let isUsernameUnique = await User.findOne({ username: username })
            if(isUsernameUnique) return res.status(400).json({ success: false, message: 'please choose another username! this username is already token!' }) 
            
            let step_completed = user?.step_completed >= 1 ? user?.step_completed : 1
            const updated_user = await User.findByIdAndUpdate({ _id: req.user.id }, user.username === username ? {
                firstname, lastname,
                step_completed: step_completed
            } : {
                username, firstname, lastname,
                step_completed: step_completed
            })

            return res.status(200).json({ success: true, data: updated_user })
        } catch (error) {
            return res.status(500).json({ success: false, message: error.message })
        }
    },
    birthday: async (req, res) => {
        try {
            let user = await User.findById({ _id: req.user.id })
            let { birthday } = req.body
            
            let step_completed = user?.step_completed >= 2 ? user?.step_completed : 2
            const user_updated = await User.findByIdAndUpdate({ _id: req.user.id }, {
                birthday: birthday,
                step_completed: step_completed
            })

            return res.status(200).json({ success: true, data: user_updated })
        } catch (error) {
            return res.status(500).json({ success: false, message: error.message })
        }
    },
    country: async (req, res) => {
        try {
            let user = await User.findById({ _id: req.user.id })
            let { country } = req.body
            
            let step_completed = user?.step_completed >= 3 ? user?.step_completed : 3
            const user_updated = await User.findByIdAndUpdate({ _id: req.user.id }, {
                country: country,
                step_completed: step_completed
            })

            return res.status(200).json({ success: true, data: user_updated })
        } catch (error) {
            return res.status(500).json({ success: false, message: error.message })
        }
    },
    upload_profile_img: async (req, res) => {
        try {
            let user = await User.findById({ _id: req.user.id })
            if(!user) return res.status(400).json({ success: false, message: 'user not found!' })

            let userId = req.user.id;
            let files = req.files.files;
            
            if (!Array.isArray(files)) {
                files = [files];
            }

            let mimetypes = ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp"]
            if(!mimetypes.includes(files[0].mimetype)) return res.status(400).json({ success: false, message: 'file type is not supported!' })

            let results = await uploadFiles(userId, [files[0]])

            const user_updated = await User.findByIdAndUpdate({ _id: req.user.id }, {
                profile_img: results[0],
                step_completed: 4
            })

            return res.status(200).json({ success: true, data: { results, user: user_updated }, message: 'Files uploaded successfully'  })
        } catch(error) {
            return res.status(500).json({ success: false, message: error.message })
        }
    },
    delete_profile_img: async (req, res) => {
        try {
            let user = await User.findById({ _id: req.user.id })
            if(!user) return res.status(400).json({ success: false, message: 'user not found!' })

            let { owner } = req.params
            let { key } = req.body
            if(!key || key.length === 0) return res.status(400).json({ success: false, message: 'no key uploaded' })
            if(!owner || owner.length === 0) return res.status(400).json({ success: false, message: 'no owner uploaded' })

            user.profile_img = {}
            await user.save()

            if(req.user.id === owner) {
                await deleteFile(key)
            } else {
                return res.status(400).json({ success: false, message: 'you do not have the right to delete this image' })
            }

            return res.status(200).json({ success: true, data: 'image deleted successfult!' })
        } catch(error) {
            return res.status(500).json({ success: false, message: error.message })
        }
    },

    fullinfos: async (req, res) => {
        try {
            let user = await User.findById({ _id: req.user.id })
            if(!user) return res.status(400).json({ success: false, message: 'user not found!' })
            
            let { firstname, lastname, username, country } = req.body
            if(firstname.lenght < 3) return res.status(400).json({ success: false, message: 'Please write your firstname!' })
            if(username.lenght < 3) return res.status(400).json({ success: false, message: 'Please write your username!' })
            
            const updateUser = await User.findByIdAndUpdate({ _id: req.user.id }, user.username === username ? {
                firstname, lastname, country
            } : 
            {
                username: username, 
                firstname, lastname, country
            })

            return res.status(200).json({ success: true, data: updateUser })
        } catch (error) {
            return res.status(500).json({ success: false, message: error.message })
        }
    },
    
    inbox: async (req, res) => {
        try {
            let user = await User.findById({ _id: req.user.id })
            .populate({ 
                path: 'inbox',
                select :'email firstname lastname username profile_img'
            })
            .select('inbox')
            if(!user) return res.status(400).json({ success: false, message: 'user not found!' })

            return res.status(200).json({ success: true, data: user })
        } catch (error) {
            return res.status(500).json({ success: false, message: error.message })
        }
    },

    add_visited_country: async (req, res) => {
        try {
            let { country } = req.body

            if(!country || country.length === 0) return res.status(400).json({ success: false, message: 'Please select a country!' })
            const user = await User.findById(req.user.id).select('-password')

            let countryFounded = user.visited_countries.includes(country)
            if(countryFounded) return res.status(400).json({ success: false, message: 'this country is already in your visited countries list!' }) 

            user.visited_countries.push(country)
            await user.save()

            return res.status(200).json({ success: true, data: user })
        } catch (error) {
            return res.status(500).json({ success: false, message: error.message })
        }
    },
    
    add_bucket_list_country: async (req, res) => {
        try {
            let { country } = req.body
            if(!country || country.length === 0) return res.status(400).json({ success: false, message: 'Please select a country!' })
            const user = await User.findById(req.user.id).select('-password')

            let countryFounded = user.bucket_list.includes(country.toLowerCase())
            if(countryFounded) return res.status(400).json({ success: false, message: 'this country is already in your visited countries list!' }) 

            user.bucket_list.push(country)
            await user.save()

            return res.status(200).json({ success: true, data: user })
        } catch (error) {
            return res.status(500).json({ success: false, message: error.message })
        }
    },
    
    remove_visited_country: async (req, res) => {
        try {
            let { country } = req.body
            if(!country || country.length === 0) return res.status(400).json({ success: false, message: 'Please select a country!' })
            const user = await User.findById(req.user.id).select('-password')

            let countryFounded = user.visited_countries.includes(country.toLowerCase())
            if(!countryFounded) return res.status(400).json({ success: false, message: 'this country is not in your visited countries list!' }) 

            user.visited_countries.pull(country)
            await user.save()

            return res.status(200).json({ success: true, data: user })
        } catch (error) {
            return res.status(500).json({ success: false, message: error.message })
        }
    },
    
    remove_bucket_list_country: async (req, res) => {
        try {
            let { country } = req.body
            if(!country || country.length === 0) return res.status(400).json({ success: false, message: 'Please select a country!' })
            const user = await User.findById(req.user.id).select('-password')

            let countryFounded = user.bucket_list.includes(country.toLowerCase())
            if(!countryFounded) return res.status(400).json({ success: false, message: 'this country is not in your bucket list!' }) 

            user.bucket_list.pull(country)
            await user.save()

            return res.status(200).json({ success: true, data: user })
        } catch (error) {
            return res.status(500).json({ success: false, message: error.message })
        }
    },

    accountProfile: async (req, res) => {
        try {
            let user = await User.findById({ _id: req.user.id }).select('-password')
            
            let account = await User.findById({ _id: req.params.id }).select('-password -inbox')
            if(!account) return res.status(400).json({ success: false, message: 'user not found!' })

            let connected = user.connections.includes(req.params.id)
            let connection_request = user.connections_requests.includes(req.params.id)
            let connection_request_sent = user.sent_connections_requests.includes(req.params.id)

            let connection_status = ''

            if(connected) {
                connection_status = 'connected'
            }
            else if(connection_request) {
                connection_status = 'accept'
            } 
            else if(connection_request_sent) {
                connection_status = 'request sent'
            }
            else {
                connection_status = 'connect'
            }

            return res.status(200).json({ success: true, data: { account, connection_status } })
        } catch(error) {
            return res.status(500).json({ success: false, message: error.message })
        }
    },
    

    send_remove_connection_request: async (req, res) => {
        try {
            let user = await User.findById({ _id: req.user.id }).select('-password')
            let account = await User.findById({ _id: req.params.id }).select('-password -inbox')
            if(!account) return res.status(400).json({ success: false, message: 'user not found!' })

            let connected = user.connections.includes(req.params.id)
            let connection_request = user.connections_requests.includes(req.params.id)
            let connection_request_sent = user.sent_connections_requests.includes(req.params.id)

            if(connected) {
                user.connections.pull(req.params.id)
                account.connections.pull(req.user.id)
                
                await user.save()
                await account.save()

                return res.status(200).json({ success: true, data: { user, connection_status: 'connect' }, message: 'remove connection successfuly!' })
            }
            else if(connection_request) {
                return res.status(500).json({ success: false, data: { connection_status: 'accept' }, message: 'you can not send request to this account until you deny his connection request!' })
            } 
            else if(connection_request_sent) {
                user.sent_connections_requests.pull(req.params.id)
                account.connections_requests.pull(req.user.id)
                
                await user.save()
                await account.save()

                return res.status(200).json({ success: true, data: { user, connection_status: 'connect' }, message: 'connection request removed!' })
            }
            else {
                user.sent_connections_requests.push(req.params.id)
                account.connections_requests.push(req.user.id)
                
                await user.save()
                await account.save()

                return res.status(200).json({ success: true, data: { user, connection_status: 'request sent' }, message: 'connection request sent!' })
            }
        } catch(error) {
            return res.status(500).json({ success: false, message: error.message })
        }
    },
    

    accept_deny_connection_request: async (req, res) => {
        try {
            let { accept } = req.body
            if(accept === undefined || accept.length === 0) return res.status(400).json({ success: false, message: 'please accept or deny this account!' })

            let user = await User.findById({ _id: req.user.id }).select('-password')
            let account = await User.findById({ _id: req.params.id }).select('-password -inbox')
            if(!account) return res.status(400).json({ success: false, message: 'user not found!' })

            let connected = user.connections.includes(req.params.id)
            let connection_request = user.connections_requests.includes(req.params.id)
            let connection_request_sent = user.sent_connections_requests.includes(req.params.id)

            if(connected) {
                return res.status(500).json({ success: false, data: { connection_status: 'connected' }, message: 'this account is already in your connections!' })
            }
            else if(connection_request) {
                if(accept) {
                    user.connections_requests.pull(req.params.id)
                    account.sent_connections_requests.pull(req.user.id)

                    user.connections.push(req.params.id)
                    account.connections.push(req.user.id)
                    
                    await user.save()
                    await account.save()

                    return res.status(200).json({ success: true, data: { user, connection_status: 'connected' }, message: 'user connection request accepted successfuly!' })
                }
                else {
                    user.connections_requests.pull(req.params.id)
                    account.sent_connections_requests.pull(req.user.id)
                    
                    await user.save()
                    await account.save()

                    return res.status(200).json({ success: true, data: { user, connection_status: 'connect' }, message: 'user connection request denied successfuly!' })
                }
                
            } 
            else if(connection_request_sent) {
                return res.status(500).json({ success: false, data: { connection_status: 'request sent' }, message: 'you can not accept or deny this account until he/she sends you connection request!' })
            }
            else {
                return res.status(500).json({ success: false, data: { connection_status: 'request sent' }, message: 'you can not accept or deny this account until he/she sends you connection request!' })
            }
        } catch(error) {
            return res.status(500).json({ success: false, message: error.message })
        }
    },
    
    get_connections_requests: async (req, res) => {
        try {
            let connections_requests = await User.findById({ _id: req.user.id })
            .populate({ 
                path: 'connections_requests',
                select :'email firstname lastname username profile_img'
            })
            .select('connections_requests')

            return res.status(200).json({ success: true, data: connections_requests })
        } catch(error) {
            return res.status(500).json({ success: false, message: error.message })
        }
    },
    
    get_connections_requests_sent: async (req, res) => {
        try {
            let sent_connections_requests = await User.findById({ _id: req.user.id })
            .populate({ 
                path: 'sent_connections_requests',
                select :'email firstname lastname username profile_img'
            })
            .select('sent_connections_requests')
            return res.status(200).json({ success: true, data: sent_connections_requests })
        } catch(error) {
            return res.status(500).json({ success: false, message: error.message })
        }
    },
    
    connections: async (req, res) => {
        try {
            let user = await User.findById({ _id: req.user.id })
            .populate({ 
                path: 'connections',
                select :'email firstname lastname username profile_img'
            })
            .select('connections')

            let connections = user.connections.filter(conn => conn._id.toString() !== req.user.id);
            return res.status(200).json({ success: true, data: connections })
        } catch(error) {
            return res.status(500).json({ success: false, message: error.message })
        }
    },
    
    account_connections: async (req, res) => {
        try {
            let user = await User.findById({ _id: req.params.id })
            .populate({ 
                path: 'connections',
                select :'email firstname lastname username profile_img'
            })
            .select('connections')
            
            let connections = user.connections.filter(conn => conn._id.toString() !== req.params.id);
            return res.status(200).json({ success: true, data: connections })
        } catch(error) {
            return res.status(500).json({ success: false, message: error.message })
        }
    },

    all_users: async (req, res) => {
        try {
            const { page = 1, limit = 30 } = req.query;
    
            const users = await User.find({}, 'firstname lastname username profile_img')
                .skip((page - 1) * limit)
                .limit(Number(limit));
    
            const totalUsers = await User.countDocuments();
    
            return res.status(200).json({
                success: true,
                data: users,
                totalPages: Math.ceil(totalUsers / limit),
                currentPage: page
            });
        } catch(error) {
            return res.status(500).json({ success: false, message: error.message })
        }
    },

    find_user: async (req, res) => {
        try {
            const { search } = req.query;
            if (search === undefined) return res.status(400).json({ success: false, message: "Search query is required" })
                
            if (search.length === 0) {
                const { page = 1, limit = 30 } = req.query;
                const users = await User.find({}, 'firstname lastname username profile_img')
                .skip((page - 1) * limit)
                .limit(Number(limit));

                return res.status(200).json({ success: true, data: users })
            }
    
            const regex = new RegExp(search, 'i');
    
            const users = await User.find({
                $or: [
                    { firstname: { $regex: regex } },
                    { lastname: { $regex: regex } },
                    { username: { $regex: regex } }
                ]
            }, 'firstname lastname username profile_img');
    
            return res.status(200).json({ success: true, data: users });
        } catch (error) {
            return res.status(500).json({ success: false, message: error.message });
        }
    },
}

const createActivationToken = (payload) => {
    return jwt.sign(payload, process.env.ACTIVATION_TOKEN_SECRET, { expiresIn: '15m' })
}

const createAccessToken = (id) => {
    return jwt.sign(id, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' })
}

const createRefreshToken = (id) => {
    return jwt.sign(id, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' })
}

module.exports = UserCtrl