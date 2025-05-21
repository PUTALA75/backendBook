/*
const express = require("express");
const { default: mongoose } = require("mongoose");
const morgan = require("morgan");
const bookRoute = require("./routes/bookRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express();


app.use(express.json());
app.use(morgan("dev"));
const cors = require('cors');
app.use(cors());

app.use(express.json());
app.use('/api/book', bookRoute);


app.get('/', (req, res) => {
    res.send("Hello from Node API");
});


app.use(errorHandler);


require('dotenv').config(); 


mongoose.connect(process.env.MONGO_URL)
.then(() => {
    console.log("Connected to Database");
    app.listen(process.env.PORT || 3000, () => {
        console.log(`Server running on port ${process.env.PORT || 3000}`);
    });
})
.catch((err) => {
    console.log("Connection failed", err.message);
});

*/
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const bookRoute = require("./routes/bookRoutes");
const errorHandler = require("./middleware/errorHandler");
require("dotenv").config();

const app = express();

// Middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

// Routes
app.use("/api/book", bookRoute);

app.get("/", (req, res) => {
  res.send("Hello from Node API");
});

// Error handling
app.use(errorHandler);

// Database connection and server start
mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to Database");
    app.listen(process.env.PORT || 3000, () => {
      console.log(`Server running on port ${process.env.PORT || 3000}`);
    });
  })
  .catch((err) => {
    console.error("Connection failed:", err.message);
  });
