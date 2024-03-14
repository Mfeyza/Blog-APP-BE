"use strict";
/* -------------------------------------------------------
    EXPRESSJS - BLOG API
------------------------------------------------------- */

const mongoose = require('mongoose')

// // Password Encryption:
// // https://nodejs.org/api/crypto.html#cryptopbkdf2syncpassword-salt-iterations-keylen-digest
// const crypto = require('node:crypto')

// const keyCode = process.env?.SECRET_KEY || 'write_random_chars_in_here'
// const loopCount = 10_000 //'  10000 defa şifrele
// const charCount = 32 // write 32 for 64 //'bana çıktı verirken 64 karakterlik çıktı ver
// const encType = 'sha512' //' bu şifreleme algoritmasını kullan

// const passwordEncrypt = function (password) {
//     return crypto.pbkdf2Sync(password, keyCode, loopCount, charCount, encType).toString('hex')
// }
const passwordEncrypt = require('../helpers/passwordEncrypt')


//? USER Schema:
const UserSchema = new mongoose.Schema({

    email: {
        type: String,
        trim: true,
        unique: true,
        // unique: [true, 'Email must be unique.'], // Not support
        // required: true,
        required: [true, 'Email must be required.'],
        // validate: (email) => { return true },
        // validate: [
        //     (email) => {
        //         if (email.includes('@') && email.includes('.')) {
        //             return true
        //         }
        //         return false
        //     },
        //     'Email type is incorrect'
        // ],
        validate: [
            (email) => (email.includes('@') && email.includes('.')), //* Basit bir doğrulama fonksiyonu. E-posta adresinin '@' ve '.' karakterlerini içermesi gerektiğini kontrol eder.
            'Email type is incorrect' //* Doğrulama başarısız olduğunda gösterilecek hata mesajı.
        ]
    },

    password: {
        type: String,
        trim: true,
        required: true,
        // set: (password) => { return password + '123' }, //' set şunu yapıyor gelen veri ne olursa olsun yanına bu şekilde kaydet
        // set: function (password) { return password + '123' },
        set: (password) => passwordEncrypt(password) //* Kullanıcı tarafından girilen parolanın, kaydedilmeden önce şifrelenmesi için bir setter fonksiyonu kullanılır.
        // set: passwordEncrypt
    },

    firstName: String,

    lastName: String,

}, {
    collection: 'user',//! MongoDB'de bu şema için kullanılacak koleksiyonun adı
    timestamps: true //?Her kayıt için oluşturulma ve güncellenme zamanlarının otomatik olarak eklenmesini sağlar.
})

// module.exports = {
//     User: mongoose.model('User', UserSchema)
// }

module.exports = mongoose.model('User', UserSchema) //'dışa aktar