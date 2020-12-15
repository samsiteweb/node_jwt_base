const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const errorHandler = require("./core/common/errorHanderMiddleware/errorHandler");
const connectDB = require("./core/common/database/db");

//  Load environment variables
dotenv.config({ path: "./core/common/config/config.env" });

// establishing database connection
connectDB();

// Route files
const auth = require("./core/apis/authModule/auth.routes")

// setting server variables
const app = express();

const PORT = process.env.PORT || 6301;
const apiVersion = "/dev/v1";

// Middlewares
app.use(express.static('public'));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(cors());

app.options('*', cors());

// cookie parser
app.use(cookieParser());

// Dev logging middleware
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

// api routes decleration
app.use(`${apiVersion}/auth`, auth)



// error handler middleware
app.use(errorHandler);

// Base get request
app.get("/", (req, res) => {
    res.send(`Welcome to my API Platform`);
});

// Server
app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
