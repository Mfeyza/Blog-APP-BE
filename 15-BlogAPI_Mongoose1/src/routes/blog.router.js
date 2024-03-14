"use strict"
/* ====================================================== */
/*                     BLOG API Routes               */
/* ====================================================== */
const router = require("express").Router(); //* Express Router modülünü dahil etme

const { BlogPost,BlogCategory } = require("../controllers/blog.controller"); //* Blog ile ilgili işlemleri yapacak controller'ı dahil etme

// BlogCategory:
router.route('/categories')
    .get(BlogCategory.list)
    .post(BlogCategory.create)
router.route('/categories/:categoryId')
    .get(BlogCategory.read)
    .put(BlogCategory.update) // put patch aynı
    .patch(BlogCategory.update)
    .delete(BlogCategory.delete)


// '/posts' endpoint'i için route tanımlamaları
router.route('/posts')
    .get(BlogPost.list) //* Tüm blog gönderilerini listelemek için GET isteği
    .post(BlogPost.create) //* Yeni bir blog gönderisi oluşturmak için POST isteği

// '/posts/:postId' endpoint'i için route tanımlamaları
router.route('/posts/:postId')
    .get(BlogPost.read) //* Belirli bir ID'ye sahip blog gönderisini okumak için GET isteği
    .put(BlogPost.update) //* Belirli bir ID'ye sahip blog gönderisini güncellemek için PUT isteği
    .patch(BlogPost.update) //* PUT ile aynı işlevi görür, belirli bir ID'ye sahip blog gönderisini kısmi güncellemek için PATCH isteği
    .delete(BlogPost.delete); //* Belirli bir ID'ye sahip blog gönderisini silmek için DELETE isteği

module.exports = router; //* Yapılandırılmış router'ı dışa aktarma, böylece başka dosyalardan erişilebilir hale gelir.
