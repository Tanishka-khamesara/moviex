const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const ErrorMiddleware = require("./Middlewares/ErrorMiddleware.js");
const authRoutes=require("./routes/authRoutes.js")
const path = require("path");
const cookieParser = require("cookie-parser");
const connectMongoDb=require("./db/connectMongoDb.js")
dotenv.config();
const corsOptions = {
    origin: ['http://localhost:5173'] ,
    credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

const Port = process.env.PORT || 10000;

app.use("/api/auth", authRoutes);
app.use(ErrorMiddleware);

app.listen(10000, () => {
    console.log(`server is up and running on port ${Port}`);
    connectMongoDb();
});