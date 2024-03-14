"use strict";
/* -------------------------------------------------------
    EXPRESSJS - BLOG API
------------------------------------------------------- */

require("express-async-errors"); //'asenkron fonksiyonlarda hata yakalar

const User = require("../models/user.model"); //'user modelini controllera import eder.Routerdan controlera geçiş olduğunda modelle bağlantılı çalışmasını sağlar.
const passwordEncrypt = require("../helpers/passwordEncrypt"); //? login işlemlerinde password eşleşmesini  kontrol etmek için import ettik
module.exports = {
  //*export edilen coontrollerlar
  list: async (req, res) => {
    //! list constollerı userı bulur getirir (find) get için çalışır.
    const data = await User.find(); //'async ve await yazmayı unutma!
    res.status(200).send({
      //' status 200 döner başarılı get isteğinde her seferinde error u false ve istediğimiz datayı getirir.
      error: false,
      data: data, //'dönecek olan data
    });
  },
  create: async (req, res) => {
    //! create controllerı yeni data oluşturmamızı sağlayan controller post ile çalışır (create)
    const data = await User.create(req.body);
    res.status(201).send({
      //' post başarılı dönüşü 201
      error: false, //' başarılı istekte en başta hata almadığını errorun false döndüğünü gösterir
      body: req.body, //' eklediğim yani body ile gönderdiğim datayı çevirir
      data: data, //' dönen tüm datayı gösterir
    });
  },
  read: async (req, res) => {
    const data = await User.findOne({ _id: req.params.userId }); //'URL 'den alınan UserId değerine göre kullanıcı arar.

    res.status(202).send({
      error: false, //'hata olmadığını gösterir
      data: data, //'bulunan datayı döndürür
    });
  },
  update: async (req, res) => {
    const data = await User.updateOne({ _id: req.params.userId }, req.body); //' belirttilen UserId ye sahip kullanıcıyı , body de gönderdiğimiz bilgilerle günceller. ilk parametre hedef ikincisi bilgi.!!
    const newdata = await User.findOne({ _id: req.params.userId }); //*güncellediken sonra güncel verileri bulup getirir yine UserId ye göre
    res.status(202).send({
      error: false,
      body: req.body, //'güncellemede giden body değiştirmek istediğimiz veriler
      data: data, //! güncelleme işlmi hakkında bilgi
      // güncel veriyi istiyorsan tekrar çağır
      newdata: newdata, //'son hali.
    });
  },
  delete: async (req, res) => {
    const data = await User.deleteOne({ _id: req.params.userId }); //'belirtilenn userId ye sahip kullanıcıyı siler
    console.log(data);
    res.sendStatus(data.deletedCount >= 1 ? 204 : 404); //'silme işlemi okeyse yani silinen bir veri varsa,204 yoksa 404 döndür :)
  },

  /* -------------------------------------------------------------------------- */
  /*                                login-logout                                */
  /* -------------------------------------------------------------------------- */
  login: async (req, res) => {
    const { email, password } = req.body; //' İstek gövdesinden alınan e-posta ve şifre dest ile

    if (email && password) {
      //'epost ve şifre var mı varsa şunları yap
      // const user = await User.findOne({ email: email })
      const user = await User.findOne({ email }); //! veri tabanındaki epostaya göre arar

      if (user && user.password == passwordEncrypt(password)) {
        //'kullanıcı varsa ve şifresi eşleşiyorsa
        /*cookies*/
        //*    req.session={
        //*     email:user.email,
        //*     password:user.password
        // *   }

        req.session.id = user.id; //? Kullanıcı ID'si oturuma kaydedilir.
        req.session.password = user.password; //! Kullanıcı şifresi oturuma kaydedilir.

        /* COOKIE */
        if (req.body?.remindMe) {
          req.session.remindMe = req.body.remindMe;
          // SET maxAge:
          req.sessionOptions.maxAge = 1000 * 60 * 60 * 24 * 3; // 3 days
        }
        /* COOKIE */

        res.status(200).send({
          error: false,
          message: "Login OK",
          user,
        });
      } else {
         //' Eğer kullanıcı bulunamazsa veya şifre eşleşmezse hata fırlatılır.
        res.errorStatusCode = 401;
        throw new Error("Login parameters are not true.");
      }
    } else {
         //' E-posta veya şifre eksikse hata fırlatılır.
      res.errorStatusCode = 401;
      throw new Error("Email and password are required.");
    }
  },
  logout: async (req, res) => {
    // Session destroy:
    req.session = null;  //* Kullanıcının oturum bilgilerini sıfırlar.

    res.status(200).send({
      error: false,
      message: "Logout OK",
    });
  },
};
