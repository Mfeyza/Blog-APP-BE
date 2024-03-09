'use strict'

/* -------------------------------------------------------------------------- */
/*                                 BLOG MODEL                                 */
/* -------------------------------------------------------------------------- */

const mongoose=require("mongoose")
const nameSchema=new mongoose.Schema(
{
//'id yazmaya gerek yok kend oluşturcak
// fieldName:String //'type ı
// fieldName2:BigInt

fieldName:{
    type:String,
    default:null,
    trim:true,
    unique:false, //'benzesiz
}

},
{

})