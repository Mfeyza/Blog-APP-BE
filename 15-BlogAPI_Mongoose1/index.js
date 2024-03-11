"use strict"

/*
    BLOG API with Mongoose

*/

// Gerekli paketlerin kurulumu için komutlar
/*
    $ npm i express dotenv express-async-errors
    $ npm i mongoose
*/

//' Express modülünü dahil etme ve app nesnesini oluşturma
const express = require("express")
const app = express()

app.use(express.json()) //' Gelen isteklerdeki JSON verilerini otomatik olarak ayrıştırır.

// 'Ortam değişkenlerini .env dosyasından yükleme
require('dotenv').config()
const PORT = process.env.PORT //' Sunucunun çalışacağı port numarası
const HOST = process.env.HOST //' Sunucunun çalışacağı host adresi

/* Veritabanı bağlantısının kurulması */
require('./src/dbConnection') //' dotenv yüklendikten sonra veritabanı bağlantısını kurar.

//' Ana yolu tanımlama ve karşılama mesajı gönderme
app.all('/', (req, res) => {
    res.send('WELCOME TO THE BLOG API PROJECT')
})

//' Blog ile ilgili route'ları tanımlama
app.use('/blog', require("./src/routes/blog.route"))

//' Hata yönetimi için errorHandler'ı kullanma
app.use(require('./src/errorHandler')) //! Uygulamanın en sonunda yer almalıdır, böylece tüm hatalar bu middleware'e yönlendirilir.

//' Sunucuyu belirtilen port ve host üzerinde çalıştırma
app.listen(PORT, () => console.log(`Server Running on http://${HOST}:${PORT}`))