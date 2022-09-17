//Dependencies
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
// const cookies = require("cookie-parser");
if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

// Files
const routes = require("./routes/Routes");
const dbURL = require("./config/keys").mongoDbURL;

// PORT
const port = 80;

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cookies());
app.use(cors({ origin: true, credentials: true }));

//Database
mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (err) {
        console.log("DB Connection Failed, ", err);
    } else {
        console.log("Successfully connected to mongoDB");
    }
});

// Routes
app.use("/", routes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
