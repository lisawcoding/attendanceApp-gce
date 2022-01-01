const express = require("express");
// const mongoose = require("mongoose");
const connectDB = require("./config/db");
// const dotenv = require("dotenv");
// const UserToken = require("./api/models/UserToken");
// var cors = require("cors");

const app = express();
connectDB();
// dotenv.config();
// app.use(cors({
//     origin: true,
//     credentials: true
// }))

app.use((req, res, next) => {
     res.setHeader("Access-Control-Allow-Origin", "*");// Website you wish to allow to connect
     res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");// Request methods you wish to allow
     // Request headers you wish to allow
     // res.setHeader("Access-Control-Allow-Headers", "content-type, Authorization");
     res.setHeader("Access-Control-Allow-Headers", "*");
     // Set to true if you need the website to include cookies in the requests sent to the API (e.g. in case you use sessions)
     // res.setHeader('Access-Control-Allow-Credentials', true);
     next(); // Pass to next layer of middleware
});

//init middeware
app.use(express.json({ extended: false }));
app.get("/", (req, res) => res.send("Hello World"));
app.use("/users", require("./api/routes/users"));
app.use("/users/:id/employees", require("./api/routes/employees"));
app.use("/users/:id/employees/:employeeId/records", require("./api/routes/records"));

//testing route
app.get("/usertoken", (req, res) => {
     UserToken.find()
          .then((data) => res.json(data))
          .catch((err) => res.json(err));
});

const PORT = process.env.PORT || 9001;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));