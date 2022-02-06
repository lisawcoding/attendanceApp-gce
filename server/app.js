const express = require("express");
// const mongoose = require("mongoose");
const connectDB = require("./config/db");
const path = require("path");
const app = express();
// const dotenv = require("dotenv");

connectDB();
// dotenv.config();

app.use((req, res, next) => {
     res.setHeader("Access-Control-Allow-Origin", "*");
     res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
     // res.setHeader("Access-Control-Allow-Headers", "*");
     res.setHeader("Access-Control-Allow-Headers", "content-type, Authorization, x-token");
     // Set to true if you need the website to include cookies in the requests sent to the API (e.g. in case you use sessions)
     // res.setHeader('Access-Control-Allow-Credentials', true);
     next(); // Pass to next layer of middleware
});



//init middeware
// app.use(express.static(__dirname + '../public'));
// app.use(express.static(path.join(__dirname,"../public")));
app.use(express.static(path.join(__dirname,"../build")));


app.use(express.json({ extended: false }));
app.use("/auth", require("./auth"));
app.use("/users", require("./api/routes/users"));
app.use("/users/:id/employees", require("./api/routes/employees"));
app.use("/users/:id/employees/:employeeId/records", require("./api/routes/records"));
app.get("/usertoken", (req, res) => {
     UserToken.find()
          .then((data) => res.json(data))
          .catch((err) => res.json(err));
});

app.get("*", (req, res) => {
     res.sendFile(path.join(__dirname, "../build", "index.html"))
})

const PORT = process.env.PORT || 9001;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));