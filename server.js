const express = require("express");
const dotenv = require("dotenv").config()
const MongoDB = require("./config/DB")
const authRouter = require("./router/authRouter")
const postRouter = require("./router/postRouter")

const app = express()
MongoDB()

app.use(express.json())

app.use("/", authRouter)
app.use("/", postRouter)

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});

