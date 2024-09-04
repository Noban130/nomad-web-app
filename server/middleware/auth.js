const jwt = require("jsonwebtoken")

const auth = (req, res, next) => {
    try {
        const token = req.header('Authorization')
        if(!token) return res.status(400).json({ msg: 'Invalid Authentication!'})

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if(err) return res.status(400).json({ success: false, message: err.message })

            req.user = user
            next()
        })

    } catch (err) {
        return res.status(500).json({ err: err.message })
    }
}

module.exports = auth