"use strict";
/* ====================================================== */
/*                     BLOG API CONTROLLERS               */
/* ====================================================== */

require("express-async-errors"); //' Async fonksiyonlarda hata yakalamayı kolaylaştırır.

const { BlogCategory, BlogPost } = require("../models/blog.model"); //* BlogPost modelini models klasöründen içe aktarır.

module.exports.BlogCategory = {
  list: async (req, res) => {
    const data = await BlogCategory.find();
    res.status(200).send({
      error: false,
      data: data,
    });
  },
  create: async (req, res) => {
    const data = await BlogCategory.create(req.body);
    res.status(201).send({
      error: false,
      body: req.body,
      data: data,
    });
  },
  read: async (req, res) => {
    const data = await BlogCategory.find({ _id: req.params.categoryId });
    res.status(202).send({
      error: false,
      data: data,
    });
  },
  update: async (req, res) => {
    const data = await BlogCategory.updateOne(
      { _id: req.params.categoryId },
      req.body
    );
    const newdata = await BlogCategory.find({ _id: req.params.categoryId });
    res.status(202).send({
      error: false,
      body: req.body,
      data: data, // info about update
      // güncel veriyi istiyorsan tekrar çağır
      newdata: newdata,
    });
  },
  delete: async (req, res) => {
    const data = await BlogCategory.deleteOne({ _id: req.params.categoryId });
    // console.log(data);
    res.sendStatus(data.deletedCount >= 1 ? 204 : 404);
  },
};

//* BlogPost controller objesini dışa aktarır. Bu obje, blog postları ile ilgili işlemleri yönetir.
module.exports.BlogPost = {
  //? Tüm blog postlarını listeler.
  list: async (req, res) => {
    const data = await BlogPost.find(); //' BlogPost modeli üzerinden tüm dokümanları bulur.
    res.status(200).send({
      error: false, //' Hata olmadığını belirten flag
      data: data, //' Bulunan dokümanları döndürür.
    });
  },

  //? Yeni bir blog postu oluşturur.
  create: async (req, res) => {
    const data = await BlogPost.create(req.body); //* req.body'deki veriyi kullanarak yeni bir blog postu oluşturur.
    res.status(201).send({
      error: false, //' Hata olmadığını belirten flag
      body: req.body, //' İstemciden alınan gövdeyi döndürür.
      data: data, //' Oluşturulan dokümanı döndürür.
    });
  },

  //? Belirli bir ID'ye sahip blog postunu getirir.
  read: async (req, res) => {
    const data = await BlogPost.find({ _id: req.params.postId }); //* URL'den alınan postId ile belirli bir dokümanı bulur.
    res.status(202).send({
      error: false, //' Hata olmadığını belirten flag
      data: data, //' Bulunan dokümanı döndürür.
    });
  },

  //? Belirli bir ID'ye sahip blog postunu günceller.
  update: async (req, res) => {
    const data = await BlogPost.updateOne({ _id: req.params.postId }, req.body); //* Belirli bir ID'ye sahip dokümanı günceller.
    const newData = await BlogPost.find({ _id: req.params.postId }); //' Güncellenmiş dokümanı tekrar bulur.
    res.status(202).send({
      error: false, //' Hata olmadığını belirten flag
      body: req.body, //' İstemciden alınan gövdeyi döndürür.
      data: data, //' Güncelleme işlemi hakkında bilgi verir.
      newData: newData, //' Güncellenmiş dokümanı döndürür.
    });
  },

  //? Belirli bir ID'ye sahip blog postunu siler.
  delete: async (req, res) => {
    const data = await BlogPost.deleteOne({ _id: req.params.postId }); //* Belirli bir ID'ye sahip dokümanı siler.
    //! Silme işlemi başarılıysa 204, başarısızsa 404 durum kodunu döndürür.
    res.sendStatus(data.deletedCount >= 1 ? 204 : 404);
  },
};
