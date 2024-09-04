const Checkin = require("../models/Checkin.model");
const User = require("../models/User.model");
let { uploadFiles, deleteFile } = require("./S3.methods.js")

let CheckinCtrl = {
    createCheckin: async (req, res) => {
        try {
            let { place } = req.body
            if(Object.keys(place).length === 0 || place === undefined) return res.status(400).json({ success: false, message: 'Please select a place!' })
            
            let checkin = new Checkin({
                user: req.user.id,
                place: place,
            })
            await checkin.save()

            let user = await User.findById(req.user.id);
            if (!user.checkins) {
                user.checkins = [];
            }

            user.checkins.push(checkin._id);
            await user.save();

            return res.status(200).json({ success: true, data: { checkin, user } });
        } catch (error) {
            return res.status(500).json({ success: false, message: error.message })
        }
    },

    // create a checkin with it review
    createCheckinAndReview: async (req, res) => {
        try {
            let { place, assets, rating, recommend, visible_for } = req.body
            if(Object.keys(place).length === 0) return res.status(400).json({ success: false, message: 'Please select a place!' })
            if(!rating) return res.status(400).json({ success: false, message: 'Please make a rating!' })
            if(recommend === undefined || recommend.length === 0) return res.status(400).json({ success: false, message: 'Please tel us if you recommend this place or not?' })
            if(visible_for === undefined || visible_for.length === 0) return res.status(400).json({ success: false, message: 'Please select who you want to see your review!' })
            
            let checkin = new Checkin({
                user: req.user.id,
                place: place,
                assets: assets,
                rating: rating,
                recommend: recommend,
                visible_for: visible_for,
            })
            await checkin.save()

            let user = await User.findById(req.user.id);
            if (!user.checkins) {
                user.checkins = [];
            }

            if (!user.reviews) {
                user.reviews = [];
            }

            user.checkins.push(checkin._id);
            user.reviews.push(checkin._id);
            await user.save();

            return res.status(200).json({ success: true, data: { checkin, user } });
        } catch (error) {
            return res.status(500).json({ success: false, message: error.message })
        }
    },

    upload_imgs: async (req, res) => {
        try {
            let user = await User.findById({ _id: req.user.id })
            if(!user) return res.status(400).json({ success: false, message: 'user not found!' })

            let userId = req.user.id;
            let files = req.files.files;
            
            if (!Array.isArray(files)) {
                files = [files];
            }

            let mimetypes = ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp"]
            
            let supported_files = files.map(file => mimetypes.includes(file.mimetype) ? file : null).filter(file => file !== null)
            console.log('supported_files: ', supported_files);

            let results = await uploadFiles(userId, supported_files)
            
            let checkin = new Checkin({
                user: req.user.id,
                assets: results,
                place: {},
                rating: 5,
                recommend: true,
                visible_for: '',
            })
            await checkin.save()

            user.checkins.push(checkin._id);
            user.reviews.push(checkin._id);
            await user.save();

            return res.status(200).json({ success: true, data: { results, checkin, user }, message: 'Files uploaded successfully'  })
        } catch(error) {
            return res.status(500).json({ success: false, message: error.message })
        }
    },
    delete_img: async (req, res) => {
        try {
            let user = await User.findById({ _id: req.user.id })
            if(!user) return res.status(400).json({ success: false, message: 'user not found!' })

            let { checkin_id, key, owner } = req.body
            if(!checkin_id || checkin_id.length === 0) return res.status(400).json({ success: false, message: 'no checkin id uploaded' })
            if(!key || key.length === 0) return res.status(400).json({ success: false, message: 'no key uploaded' })
            if(!owner || owner.length === 0) return res.status(400).json({ success: false, message: 'no owner uploaded' })

            let checkin = await Checkin.findOne({ _id: checkin_id, user: req.user.id })
            if(!checkin) return res.status(400).json({ success: false, data: 'checkin not found' })

            if(req.user.id === owner) {
                await deleteFile(key)
            } else {
                return res.status(400).json({ success: false, message: 'you do not have the right to delete this image' })
            }
            
            let filtered_checkins = checkin.assets.filter(ck => ck.key !== key)
            
            await Checkin.findByIdAndUpdate({ _id: checkin_id }, {
                assets: filtered_checkins
            })

            return res.status(200).json({ success: true, data: 'image deleted successfult!' })
        } catch(error) {
            return res.status(500).json({ success: false, message: error.message })
        }
    },

    getAllCheckins: async (req, res) => {
        try {
            let checkins = await User.findById(req.user.id).populate('checkins').select('checkins')
            return res.status(200).json({ success: true, data: checkins })
        } catch (error) {
            return res.status(500).json({ success: false, message: error.message })
        }
    },

    getAllReviews: async (req, res) => {
        try {
            let reviews = await User.findById(req.user.id).populate('reviews').select('reviews')
            return res.status(200).json({ success: true, data: reviews })
        } catch (error) {
            return res.status(500).json({ success: false, message: error.message })
        }
    },
    
    getOne: async (req, res) => {
        try {
            let checkin = await Checkin.findById({ _id: req.params.id })
            if(!checkin) return res.status(400).json({ success: false, data: 'checkin not found' })
            
            return res.status(200).json({ success: true, data: checkin })
        } catch (error) {
            return res.status(500).json({ success: false, message: error.message })
        }
    },
    
    // create a review or update a review
    update: async (req, res) => {
        try {
            
            let checkin = await Checkin.findById({ _id: req.params.id })
            if(!checkin) return res.status(400).json({ success: false, data: 'checkin not found' })
            
            let { assets, rating, recommend, visible_for } = req.body
            if(!rating) return res.status(400).json({ success: false, message: 'Please make a rating!' })
            if(recommend === undefined || recommend.length === 0) return res.status(400).json({ success: false, message: 'Please tel us if you recommend this place or not?' })
            if(visible_for === undefined || visible_for.length === 0) return res.status(400).json({ success: false, message: 'Please select who you want to see your review!' })

            await Checkin.findByIdAndUpdate({ _id: req.params.id }, {
                assets: assets,
                rating: rating,
                recommend: recommend,
                visible_for: visible_for,
            })
            
            let user = await User.findById(req.user.id);
            if (!user.reviews) {
                user.reviews = [];
            }

            user.reviews.push(checkin._id);
            await user.save()

            return res.status(200).json({ success: true, data: checkin });
        
        } catch (error) {
            return res.status(500).json({ success: false, message: error.message })
        }
    },

    delete: async (req, res) => {
        try {
            await Checkin.findByIdAndDelete({ _id: req.params.id })

            let user = await User.findById(req.user.id);
            user.checkins.filter(chechin => chechin !== req.params.id)
            user.reviews.filter(review => review !== req.params.id)
            await user.save();

            return res.status(200).json({ success: true, data: 'checkin deleted successfuly!' })
        } catch (error) {
            return res.status(500).json({ success: false, message: error.message })
        }
    },
}

module.exports = CheckinCtrl