"use strict"
/*
    BLOG API with Mongoose
*/
/*
    $ npm i express dotenv express-async-errors
    $ npm i mongoose
*/
const express=require("express")
const app=express()
/* DB connection  */
require('./src/dbConnection')

app.use(express.json()) // yukarıda  kalsın



require('dotenv').config()
const PORT=process.env.PORT
const HOST=process.env.HOST

app.all('/',(req,res)=>{
    res.send('WELCOME BLOG API PROJECT')
})


app.use(require('./src/errorHandler')) // aşağıda kalsın

app.listen(PORT,()=> console.log(` Server Running on http://${HOST}:${PORT}`))