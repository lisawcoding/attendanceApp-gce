const express = require("express");
// const mongoose = require("mongoose");
const connectDB = require("./config/db");
var cors = require("cors");

const app = express();
connectDB();
app.use(cors({
    origin: true,
    credentials: true
}))

//init middeware
app.use(express.json({extended: false}))

app.get("/", (req, res) => res.send("Hello World"))
app.use("/employees", require("./api/routes/employees"))

const PORT = process.env.PORT || 9001;
app.listen(PORT, () => console.log(`Server running on ${PORT}`))
