const mongoose = require("mongoose");
const db="mongodb+srv://tolisacoding:tlc89751345@cluster0.gsnhn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const connectDB = async () => {
    try {
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log("MongoDB is Conntected");
    } catch(err) {
        console.error(err.messsage)
    //     process.exit(1);
    }
}

module.exports = connectDB;