"use strict"; 

/* -------------------------------------------------------
    EXPRESSJS - Error Handler
    Bu middleware, uygulama genelinde meydana gelebilecek hataları yakalar ve işler.
------------------------------------------------------- */

module.exports = (err, req, res, next) => {
    //' Varsayılan hata durum kodunu 500 olarak ayarla veya mevcutsa özelleştirilmiş durum kodunu kullan
    const errorStatusCode = res.errorStatusCode ?? 500;

    console.log('errorHandler worked.'); //' Konsola hata yöneticisinin çalıştığına dair mesaj yazdır

    //' Kullanıcıya hata ile ilgili bilgileri içeren bir JSON yanıtı gönder
    res.status(errorStatusCode).send({
        error: true, //' Hata olduğunu belirten bir işaretçi
        message: err.message, //' Hatanın açıklaması
        cause: err.cause, //' Hataya yol açan neden (eğer mevcutsa)
        // stack: err.stack, //' Hatanın detayları. Güvenlik nedeniyle genellikle üretim ortamında devre dışı bırakılır
    });
}