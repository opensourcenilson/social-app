const mongoose = require("mongoose")

async function connect() {
    try {
        await mongoose.connect(process.env.DB_URL)
        console.log("MongoDB connected")
 } catch (err) {
        console.error(err)
    }
}

module.exports = connect