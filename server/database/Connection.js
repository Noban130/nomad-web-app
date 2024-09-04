const mongoose = require("mongoose");

const connection = async () => {
    try {
        let con = await mongoose.connect(process.env.MONGODB_URI)
        console.log(`mongodb connected on : ${con.connection.host}`);
    } catch (err) {
        console.log('mongodb error: ', err);
    }
}

module.exports = connection