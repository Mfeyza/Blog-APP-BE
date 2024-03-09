"use strict";
/* -------------------------------------------------------
    EXPRESSJS - MONGODB Connection Mongoose
------------------------------------------------------- */

const mongoose=require('mongoose')
// mongoose.connect('mongodb://localhost:27017/blogAPI')
// const MONGODB=process.env.MONGODB
const MONGODB=process.env.MONGODB
mongoose.connect('mongodb://localhost:27017/blogAPI')
    .then(()=>console.log("DB Connected"))
    .catch((err)=>console.log("DB  NOT     Connected",err))