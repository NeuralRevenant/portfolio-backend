require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware setup
app.use(cors());
app.use(bodyParser.json());

// Routes setup
const contactRoute = require("./routes/contact");
app.use("/api/contact", contactRoute);

// Default route
app.get("/", (req, res) => {
    res.send("Portfolio Backend Server is Running!");
});

app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT} port`);
});
