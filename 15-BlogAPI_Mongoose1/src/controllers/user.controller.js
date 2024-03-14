"use strict";
/* -------------------------------------------------------
    EXPRESSJS - BLOG API
------------------------------------------------------- */

require("express-async-errors"); //'asenkron fonksiyonlarda hata yakalar

const User = require("../models/user.model"); //'user modelini controllera import eder.Routerdan controlera geçiş olduğunda modelle bağlantılı çalışmasını sağlar.
const passwordEncrypt = require("../helpers/passwordEncrypt");
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
    const data = await User.findOne({ _id: req.params.userId });
    res.status(202).send({
      error: false,
      data: data,
    });
  },
  update: async (req, res) => {
    const data = await User.updateOne({ _id: req.params.userId }, req.body);
    const newdata = await User.findOne({ _id: req.params.userId });
    res.status(202).send({
      error: false,
      body: req.body,
      data: data, // info about update
      // güncel veriyi istiyorsan tekrar çağır
      newdata: newdata,
    });
  },
  delete: async (req, res) => {
    const data = await User.deleteOne({ _id: req.params.userId });
    // console.log(data);
    res.sendStatus(data.deletedCount >= 1 ? 204 : 404);
  },

  /* -------------------------------------------------------------------------- */
  /*                                login-logout                                */
  /* -------------------------------------------------------------------------- */
  login: async (req, res) => {
    const { email, password } = req.body;

    if (email && password) {
      // const user = await User.findOne({ email: email })
      const user = await User.findOne({ email });

      if (user && user.password == passwordEncrypt(password)) {
        /*cookies*/
        //*    req.session={
        //*     email:user.email,
        //*     password:user.password
        // *   }

        req.session.email = user.email;

        res.status(200).send({
          error: false,
          message: "Login OK",
          user,
        });
      } else {
        res.errorStatusCode = 401;
        throw new Error("Login parameters are not true.");
      }
    } else {
      res.errorStatusCode = 401;
      throw new Error("Email and password are required.");
    }
  },
  logout: async (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        console.log(err);
        res.status(500).send("Çıkamadın.");
      } else {
        console.log("çıktın");
      }
    });
  },
};
