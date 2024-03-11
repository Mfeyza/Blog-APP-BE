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


app.use(express.json()) // yukarıda  kalsın

require('dotenv').config()
const PORT=process.env.PORT
const HOST=process.env.HOST

/* DB connection  */
require('./src/dbConnection') // dotenv çalıştıktan sonra 

app.all('/',(req,res)=>{
    res.send('WELCOME BLOG API PROJECT')
})

app.use('/blog',require("./src/routes/blog.route"))

app.use(require('./src/errorHandler')) // aşağıda kalsın

app.listen(PORT,()=> console.log(` Server Running on http://${HOST}:${PORT}`))