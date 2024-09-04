const User = require("../models/User.model")
const Video = require("../models/Video.model")
const Comment = require("../models/Comment.model")
const { uploadFiles, deleteFile } = require("./S3.methods.js")

let VideoCtrl = {
    create: async (req, res) => {
        try {
            let { place, assets, location, country, city, rating, description, like } = req.body

            let user = await User.findById({ _id: req.user.id })

            if(assets === undefined || assets === null) return res.status(400).json({ success: false, message: 'please select your assets!' })
            if(location === undefined || location === null) return res.status(400).json({ success: false, message: 'please select the location!' })
            if(country === undefined || country === null) return res.status(400).json({ success: false, message: 'please select a country!' })
            if(city === undefined || city === null) return res.status(400).json({ success: false, message: 'please select a country!' })
            if(rating === undefined || rating === null) return res.status(400).json({ success: false, message: 'please make a rating!' })
            if(description === undefined || description === null) return res.status(400).json({ success: false, message: 'please write a description!' })
            if(like === undefined || like === null) return res.status(400).json({ success: false, message: "please select if you like or you don't like the place!" })

            let video = new Video({
                user: req.user.id,
                profile_img: user.profile_img,
                place: place,
                assets: assets,
                location: location,
                country: country,
                city: city,
                rating: rating,
                description: description,
                like: like,
            })
            await video.save()

            user.videos.push(video._id);
            user.reviews.push(video._id);
            await user.save();

            return res.status(200).json({ success: true, data: { video: video, user } })
        } catch (error) {
            return res.status(500).json({ success: false, message: error.message })
        }
    },
    upload_assets: async (req, res) => {
        try {let user = await User.findById({ _id: req.user.id })
            if(!user) return res.status(400).json({ success: false, message: 'user not found!' })

            let userId = req.user.id;
            console.log('req.files: ', req.files)
            let files = req.files.files;

            if (!Array.isArray(files)) {
                files = [files];
            }

            let mimetypes = ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp", "video/mp4", "video/webm", "video/ogg", "video/x-msvideo", "video/mpeg", "video/quicktime", "video/3gpp", "video/3gpp2", "video/x-flv", "video/x-matroska", "video/x-ms-asf", "video/x-ms-wmv", "video/x-m4v"]
            
            let supported_files = files.map(file => mimetypes.includes(file.mimetype) ? file : null).filter(file => file !== null)

            let results = await uploadFiles(userId, supported_files)

            return res.status(200).json({ success: true, data: { results }, message: 'Files uploaded successfully'  })

        } catch(error) {
            return res.status(500).json({ success: false, message: error.message })
        }
    },
    
    delete_asset: async (req, res) => {
        try {
            let user = await User.findById({ _id: req.user.id })
            if(!user) return res.status(400).json({ success: false, message: 'user not found!' })

            let { key, owner } = req.body

            if(req.user.id === owner) {
                await deleteFile(key)
            } else {
                return res.status(400).json({ success: false, message: 'you do not have the right to delete this video' })
            }

            return res.status(200).json({ success: true, data: 'video deleted successfult!' })
        } catch(error) {
            return res.status(500).json({ success: false, message: error.message })
        }
    },

    upload_video: async (req, res) => {
        try {
            let user = await User.findById({ _id: req.user.id })
            if(!user) return res.status(400).json({ success: false, message: 'user not found!' })
            
            let video = new Video({
                user: req.user.id,
                assets: results,
                location: { long: '', lat: '' },
                country: '',
                city: '',
                rating: 0,
                description: '',
                like: false,
            })
            await video.save()

            user.videos.push(video._id);
            user.reviews.push(video._id);
            await user.save();

            return res.status(200).json({ success: true, data: { results, video, user }, message: 'Files uploaded successfully'  })
        } catch(error) {
            return res.status(500).json({ success: false, message: error.message })
        }
    },
    delete_video: async (req, res) => {
        try {
            let user = await User.findById({ _id: req.user.id })
            if(!user) return res.status(400).json({ success: false, message: 'user not found!' })

            let { id, key, owner } = req.body

            let video = await Video.findOneAndDelete({ _id: id, user: req.user.id })
            if(video) {
                await user.videos.pull(newVideo._id)
            }

            if(req.user.id === owner) {
                await deleteFile(key)
            } else {
                return res.status(400).json({ success: false, message: 'you do not have the right to delete this video' })
            }

            return res.status(200).json({ success: true, data: 'video deleted successfult!' })
        } catch(error) {
            return res.status(500).json({ success: false, message: error.message })
        }
    },

    getOne: async (req, res) => {
        try {
            let video = await Video.findById(req.params.id)
            if(!video) return res.status(400).json({ success: false, message: 'video not found!' })
                
            let user = await User.findById(req.user.id)
            if(!user) return res.status(400).json({ success: false, message: 'user not found!' })
            
            let connected = user.connections.includes(video.user)
            let liked = user.liked_videos.includes(req.params.id)
            let saved = user.saved_videos.includes(req.params.id)
                
            return res.status(200).json({ success: true, data: { video, connected, liked, saved } })
        } catch (error) {
            return res.status(500).json({ success: false, message: error.message })
        }
    },
    getAll: async (req, res) => {
        try {
            let videos = await User.findById(req.user.id).populate('videos').select('videos')
            return res.status(200).json({ success: true, data: videos })
        } catch (error) {
            return res.status(500).json({ success: false, message: error.message })
        }
    },

    foryou: async (req, res) => {
        try {
            let videos = await Video.find()
            return res.status(200).json({ success: true, data: videos })
        } catch (error) {
            return res.status(500).json({ success: false, message: error.message })
        }
    },

    update: async (req, res) => {
        try {
            let { url, location, rating, description, country, city } = req.body
            let { id } = req.params

            let video = await Video.findOne({ _id: id, user: req.user.id })
            if(!video) return res.status(400).json({ success: false, message: 'video not found!' })

            if(url === undefined || url.length === 0) return res.status(400).json({ success: false, message: 'Please select your video!' })
            if(location === undefined || Object.keys(location).length === 0) return res.status(400).json({ success: false, message: 'Please select your location!' })
            if(rating === undefined || rating.length === 0) return res.status(400).json({ success: false, message: 'Please make a rating!' })
            if(description === undefined || description.length === 0) return res.status(400).json({ success: false, message: 'Please write a description!' })

            await Video.findOneAndUpdate({ _id: id, user: req.user.id }, {
                url, location, rating, description, country, city
            })

            return res.status(200).json({ success: true, data: 'Video updated successfult!' })
        } catch (error) {
            return res.status(500).json({ success: false, message: error.message })
        }
    },

    delete: async (req, res) => {
        try {
            await Video.findOneAndDelete({ _id: req.params.id, user: req.user.id })
            let user = await User.findById(req.user.id)
            
            user.videos.pull(req.params.id)
            await user.save()

            return res.status(200).json({ success: true, data: 'video deleted successfuly!' })
        } catch (error) {
            return res.status(500).json({ success: false, message: error.message })
        }
    },

    like: async (req, res) => {
        try {
            let user = await User.findById(req.user.id)
            if(!user) return res.status(404).json({ success: false, message: 'user not found!' })
                
            let video = await Video.findById(req.params.id)
            if(!video) return res.status(404).json({ success: false, message: 'video not found!' })

            let liked = video.likes.includes(req.user.id)
            
            if(!liked) {
                video.likes.push(req.user.id)
                user.liked_videos.push(video._id)
            }
            else {
                video.likes.pull(req.user.id)
                user.liked_videos.pull(video._id)
            }

            await video.save()
            await user.save()

            return res.status(200).json({ success: true, data: { video, user } })
        } catch (error) {
            return res.status(500).json({ success: false, message: error.message })
        }
    },

    save: async (req, res) => {
        try {
            let user = await User.findById(req.user.id)
            if(!user) return res.status(404).json({ success: false, message: 'user not found!' })
                
            let video = await Video.findById(req.params.id)
            if(!video) return res.status(404).json({ success: false, message: 'video not found!' })

            let saved = video.saves.includes(req.user.id)
            
            if(!saved) {
                video.saves.push(req.user.id)
                user.saved_videos.push(video._id)
            }
            else {
                video.saves.pull(req.user.id)
                user.saved_videos.pull(video._id)
            }

            await video.save()
            await user.save()

            return res.status(200).json({ success: true, data: { video, user } })
        } catch (error) {
            return res.status(500).json({ success: false, message: error.message })
        }
    },

    add_comment: async (req, res) => {
        try {
            let video = await Video.findById(req.params.id)
            if(!video) return res.status(400).json({ success: false, message: 'video not found!' })
                
            let user = await User.findById(req.user.id)
            if(!user) return res.status(400).json({ success: false, message: 'user not found!' })
            
            let { comment } = req.body
            if(comment === undefined || comment.length === 0) return res.status(400).json({ success: false, message: 'please writhe your comment!' })

            let newComment = new Comment({
                author: req.user.id,
                profile_img: user.profile_img,
                author_name: user.username,

                video: req.params.id,
                content: comment
            })
            await newComment.save()

            video.comments.push(newComment._id)
            await video.save()

            return res.status(200).json({ success: true, data: { video, comment: newComment }})
        } catch (error) {
            return res.status(500).json({ success: false, message: error.message })
        }
    },

    get_comments: async (req, res) => {
        try {
            let video = await Video.findById(req.params.id)
            if(!video) return res.status(400).json({ success: false, message: 'video not found!' })
            
            let comments = await Video.findById(req.params.id).populate('comments').select('comments')

            return res.status(200).json({ success: true, data: comments })
        } catch (error) {
            return res.status(500).json({ success: false, message: error.message })
        }
    },

    remove_comment: async (req, res) => {
        try {
            let video = await Video.findById(req.params.id)
            if(!video) return res.status(400).json({ success: false, message: 'video not found!' })
                
            let user = await User.findById(req.user.id)
            if(!user) return res.status(400).json({ success: false, message: 'user not found!' })
        
            let comment = await Comment.findOne({ _id: req.query.comment_id, author: user._id })
            if(!comment) return res.status(400).json({ success: false, message: 'comment not found!' })
            
            await Comment.findOneAndDelete({ _id: req.query.comment_id, author: user._id })
            
            video.comments.pull(req.query.comment_id)
            await video.save()
            
            return res.status(200).json({ success: true, data: video })
        } catch (error) {
            return res.status(500).json({ success: false, message: error.message })
        }
    },
    
    get_account_videos: async (req, res) => {
        try {
            let videos = await User.findById({ _id: req.params.id }).populate('videos').select('videos')
            return res.status(200).json({ success: true, data: videos })
        } catch(error) {
            return res.status(500).json({ success: false, message: error.message })
        }
    },
    
    liked_videos: async (req, res) => {
        try {
            let liked_videos = await User.findById(req.params.id).populate('liked_videos').select('liked_videos')
            return res.status(200).json({ success: true, data: liked_videos })
        } catch (error) {
            return res.status(500).json({ success: false, message: error.message })
        }
    },
    
    saved_videos: async (req, res) => {
        try {
            let saved_videos = await User.findById(req.params.id).populate('saved_videos').select('saved_videos')
            return res.status(200).json({ success: true, data: saved_videos })
        } catch (error) {
            return res.status(500).json({ success: false, message: error.message })
        }
    },

    find_video: async (req, res) => {
        try {
            const { search } = req.query;
            if (!search) return res.status(400).json({ success: false, message: "Search query is required" });
    
            const regex = new RegExp(search, 'i');
    
            const videos = await Video.find({
                description: { $regex: regex }
            })
            .populate({
                path: 'user',
                select: 'username profile_img'
            })
    
            return res.status(200).json({ success: true, data: videos, results_found: videos.length });
        } catch (error) {
            return res.status(500).json({ success: false, message: error.message });
        }
    },
}

module.exports = VideoCtrl