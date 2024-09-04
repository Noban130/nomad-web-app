require('dotenv').config()
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const fileupload = require('express-fileupload');
const path = require('path');
const connection = require('./database/Connection');

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.use(cookieParser())
app.use(fileupload({
    useTempFiles: true,
    tempFileDir: '/tmp/',
    createParentPath: true,
    limits: { 
        fileSize: 100 * 1024 * 1024
    },
    debug: false
}));

connection()

app.use('/api/v0/user', require('./routes/User.routes'))
app.use('/api/v0/checkin', require('./routes/Checkin.routes'))
app.use('/api/v0/video', require('./routes/Video.routes'))
app.use('/api/v0/places', require('./routes/Places.routes'))
app.use('/api/v0/trip',require('./routes/Trip.routes.js'))

app.get('/api/v0/', (req, res) => {
    return res.status(200).json({ success: true, data: 'Welcome Home!' })
})

app.listen(process.env.PORT, () => console.log(`Server is listening on port: http://localhost:${process.env.PORT}`))