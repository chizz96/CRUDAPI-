const express = require('express');
const router = require("./router/userRouter")
const app = express()

app.use(express.json())

app.use(router)

app.listen(9000, ()=> {
    console.log(`server is running on port: 9000`)
})