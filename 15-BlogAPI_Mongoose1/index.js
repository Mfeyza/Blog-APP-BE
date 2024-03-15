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
require('./src/configs/dbConnection') //' dotenv yüklendikten sonra veritabanı bağlantısını kurar.
/* ------------------------------------------------------- */
// SessionCookies:
// http://expressjs.com/en/resources/middleware/cookie-session.html
// https://www.npmjs.com/package/cookie-session
//* $ npm i cookie-session

const session = require('cookie-session')
app.use(session({
    secret: process.env.SECRET_KEY
}))

// Check logined User:
app.use(require('./src/middlewares/userControl'))
app.use(require('./src/middlewares/findSearchSortPage'))

//' Ana yolu tanımlama ve karşılama mesajı gönderme
app.all('/', (req, res) => {
    // res.send('WELCOME BLOG API PROJECT')
    if (req.isLogin) {
        res.send({
            error: false,
            message: 'WELCOME BLOG API PROJECT',
            session: req.session,
            user: req.user
        })
    } else {
        res.send({
            error: false,
            message: 'WELCOME BLOG API PROJECT',
            session: req.session,
        })
    }
})

//' Blog ile ilgili route'ları tanımlama
app.use('/blog', require("./src/routes/blog.router"))
app.use('/user', require("./src/routes/user.router"))

//' Hata yönetimi için errorHandler'ı kullanma
app.use(require('./src/middlewares/errorHandler')) //! Uygulamanın en sonunda yer almalıdır, böylece tüm hatalar bu middleware'e yönlendirilir.

//' Sunucuyu belirtilen port ve host üzerinde çalıştırma
app.listen(PORT, () => console.log(`Server Running on http://${HOST}:${PORT}`))

// require('./src/sync')()