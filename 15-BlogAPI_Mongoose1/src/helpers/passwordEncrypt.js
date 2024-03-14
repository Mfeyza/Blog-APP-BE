"use strict";
/* -------------------------------------------------------
    EXPRESSJS - BLOG API
------------------------------------------------------- */
// Password Encryption:
// https://nodejs.org/api/crypto.html#cryptopbkdf2syncpassword-salt-iterations-keylen-digest
const crypto = require('node:crypto') //'crypto modülünü içe aktarır

const keyCode = process.env?.SECRET_KEY || 'write_random_chars_in_here' //'secret key i oku yoksa varsayılanı göster
const loopCount = 10_000 // 10K //'şifreleme algortimasının iterasyon(tekrarlanma) sayısı (_ js de sorun çıkartmaz)
const charCount = 32 // write 32 for 64 //'oluşturulan şifrenin "bayt"cinsinden uzunluğu
const encType = 'sha512' //' kullanılacak hash uygulamasının adı

module.exports = function (password) {
    return crypto.pbkdf2Sync(password, keyCode, loopCount, charCount, encType).toString('hex')
} //' şifrelenmiş veriyi string ve hex formatında döndürür.


//! Şifreleme işlemi sonucunda elde edilen veri, bayt cinsinden belirtilir. Örneğin, charCount olarak 32 belirlendiğinde, bu 32 bayt uzunluğunda bir veri demektir. Ancak bu veri, hexadecimal formata dönüştürüldüğünde her bayt 2 karaktere dönüşür çünkü hexadecimal sistemde her karakter, bir baytın yarısını (4 bit) temsil eder. Bu yüzden, 32 baytlık bir veri hexadecimal string olarak ifade edildiğinde 64 karakter uzunluğunda olur.

//? Bu durumda, eğer charCount değeri 32 ise ve sonuç hex formatında döndürülüyorsa, sonuç string'in uzunluğu 64 karakter olacaktır. İşte bu yüzden bazen "charCount yarısı kadar" gibi ifadeler kullanılabilir; aslında bu, bayt cinsinden belirtilen uzunluğun, hexadecimal string olarak ifade edildiğinde karakter sayısının iki katına çıkması anlamına gelir.