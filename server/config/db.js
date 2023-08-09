const mongoose = require('mongoose')
const connectDB = async () => {
    try {
        mongoose.set('strictQuery', false)
        const connect = await mongoose.connect(process.env.MONGODB_URL)
        console.log(`Database Connected: ${connect.connection.host}`)
    } catch (e) {
        console.log(e)
    }
}

module.exports = connectDB;