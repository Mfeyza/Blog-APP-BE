"use strict";
/*
    BLOG API MODELS
    Bu bölüm, blog API'si için veritabanı modellerini tanımlar.
*/

const mongoose = require("mongoose"); //' Mongoose kütüphanesini dahil etme

//' BLOG CATEGORY: 

const blogCategorySchema= new mongoose.Schema({
name: {
    type:String,
    trim:true,
    required:true
}

},{
    collection: 'blogCategory',
    timeseries:true //' ayarlar
})




//' Blog gönderileri için mongoose şeması oluşturma BLOG POST : 
const blogPostSchema = new mongoose.Schema(
  {
    blogCategoryId: {
      type:mongoose.Schema.Types.ObjectId ,//foreignKey,relationalID  
      ref:'BlogCategory', //! ref de yazdığım model ismi mongoose da yazdığım isimle aynı olmak zorunda
      
    },
    title: {
      type: String, //' Veri tipi olarak String
      trim: true, //' Başlangıç ve sonundaki boşlukları kırpar
      required: true, //' Bu alanın doldurulması zorunludur
    },
    content: {
      type: String, //' Veri tipi olarak String
      trim: true, //' Başlangıç ve sonundaki boşlukları kırpar
      required: true, //' Bu alanın doldurulması zorunludur
    },
    published:{
      type:Boolean,
      default:true
    }
  },
  {
    collection: "blogPost", //' Bu şema MongoDB'de "blogPost" koleksiyonunu temsil eder
    timestamps: true, //' Oluşturulma ve güncellenme zaman damgalarını otomatik olarak yönetir
  }
);

//' BlogPost adında bir model oluşturma ve bu modeli blogPostSchema şeması ile ilişkilendirme
module.exports = {
 BlogCategory: mongoose.model("BlogCategory", blogCategorySchema),
  BlogPost: mongoose.model("BlogPost", blogPostSchema), //!BlogPost adında bir model oluştur, bu model blogPostSchema şemasını kullanarak veritabanı işlemleri gerçekleştirecek. Bu modeli, modülü içe aktaran dosyalarda BlogPost adı altında erişilebilir yap
};













// const nameSchema = new mongoose.Schema(
//     {
//         fieldName: {
//             type: String, // Alanın veri tipi
//             default: null, // Varsayılan değer
//             trim: true,  // String değerlerin başında ve sonunda boşlukları kırpar
//             unique: true, // Bu alana sahip belgelerin benzersiz olmasını zorunlu kılar
//             select: false, // Bu alanın varsayılan sorgularda döndürülmemesini sağlar
//             index: false, // Bu alana göre indeks oluşturulup oluşturulmayacağı
//             required: true, // Bu alanın zorunlu olup olmadığı
//             required: [true, 'error message'], // Alan zorunlu ise ve veri sağlanmadığında gösterilecek hata mesajı
//             enum: [[1,2,3], 'error message'], // Bu alanın alabileceği değerler ve uymadığında gösterilecek hata mesajı
//             validate: [function(data){ return true; }, 'error message'], // Özel doğrulama fonksiyonu ve hata mesajı
//             get: function(data){ return data; }, // Veriyi okurken çalıştırılacak getter fonksiyonu
//             set: function(data){ return data; } // Veriyi kaydederken çalıştırılacak setter fonksiyonu
//         }
//     },
//     {
//         collection: 'collectionName', // Şemanın MongoDB'deki koleksiyon ismi
//         timestamps: true // createdAt ve updatedAt alanlarını otomatik olarak ekler
//     }
// );
