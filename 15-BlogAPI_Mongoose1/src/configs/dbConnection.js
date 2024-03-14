"use strict"; 

/* -------------------------------------------------------
    EXPRESSJS - MONGODB Connection Mongoose
    Bu bölüm, MongoDB veritabanına Mongoose aracılığıyla bağlanmayı sağlar.
------------------------------------------------------- */

const mongoose = require('mongoose'); //' Mongoose kütüphanesini dahil etme

//' Mongoose ile MongoDB bağlantı dizesini ortam değişkeninden alınması
const MONGODB = process.env.MONGODB;

mongoose.connect(MONGODB) //' Mongoose kullanarak MongoDB'ye bağlanma
    .then(() => console.log("DB Connected")) //' Bağlantı başarılı olduğunda konsola bilgi mesajı yazdırma
    .catch((err) => console.log("DB NOT Connected", err)); //' Bağlantı başarısız olduğunda hata mesajı ve hata detaylarını konsola yazdırma



//?MongoDB, belge tabanlı, yüksek performanslı, açık kaynak kodlu, NoSQL veritabanı programıdır. Verileri JSON benzeri bir format olan BSON'da saklar. Ölçeklenebilirlik ve esneklik sağlar ve karmaşık sorgulamalar için güçlü bir araç setine sahiptir.

//*Mongoose, MongoDB için bir Object Data Modeling (ODM) kütüphanesidir. Node.js ortamında çalışır ve MongoDB dokümanlarını yönetmek ve çalıştırmak için şematik bir çözüm sağlar. Mongoose, veritabanı işlemlerini yönetmek için basit bir çözüm sunar ve geliştiricilere şema tabanlı modeller tanımlama, veritabanı içindeki verileri doğrulama ve tür dönüşümü gibi işlemleri kolayca yapma imkanı verir