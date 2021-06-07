const express = require("express");
const Carousel = require('./models/Carousel');
const Kanto = require('./models/Kanto');
const Johto = require('./models/Johto');
const Hoenn = require("./models/Hoenn");
const Auth = require('./models/Auth');
const router = express.Router();
var path = require('path');
var jwt = require('jsonwebtoken');
var cors = require('cors');
router.use(cors());


// * function untuk mengecek token
function isAuthenticated(req, res, next) {
   var token = req.header('auth-token') || req.params.id; //req.body.token || req.query.token || req.headers.authorization; // mengambil token di antara request
   if (token) { //jika ada token
      jwt.verify(token, 'jwtsecret', function (err, decoded) { //jwt melakukan verify
         if (err) { // apa bila ada error
            res.json({ message: 'Failed to authenticate token' }); // jwt melakukan respon
         } else { // apa bila tidak error
            req.decoded = decoded; // menyimpan decoded ke req.decoded
            next(); //melajutkan proses
         }
      });
   } else { // apa bila tidak ada token
      return res.status(403).send({ message: 'No token provided.' }); // melkukan respon kalau token tidak ada
   }
}

// Router SPA
// * Admin
router.get('/admin/', async (req, res) => {
   res.sendFile(path.join(__dirname + '/view/admin_dashboard.html'));
});

router.get('/admin/carousel', async (req, res) => {
   res.sendFile(path.join(__dirname + '/view/admin_carousel.html'));
});

router.get('/admin/johto', async (req, res) => {
   res.sendFile(path.join(__dirname + '/view/admin_johto.html'));
});

router.get('/admin/hoenn', async (req, res) => {
   res.sendFile(path.join(__dirname + '/view/admin_hoenn.html'));
});

// * End Admin

// * Kanto
// Get all data
router.get('/kanto', isAuthenticated, async (req, res) => {
   const kanto = await Kanto.find();
   res.send(kanto);
});

router.get('/', async (req, res) => {
   res.sendFile(path.join(__dirname + '/view/index.html'));
});

// Posting data
router.post('/kanto', async (req, res) => {
   const kanto = new Kanto({
      name: req.body.name,
      element: req.body.element,
      url_pict: req.body.url_pict
   });
   await kanto.save();
   res.send(kanto);
});

// Get one data
router.get('/kanto/:id', async (res, req) => {
   try {
      const kanto = await Kanto.findOne({ _id: req.params.id });
      res.send(kanto);
   } catch {
      res.status(404);
      res.send({ error: "Post doesn't exist!" });
   }
});

// Update
router.patch('/kanto/:id', async (req, res) => {
   try {
      const kanto = await Kanto.findOne({ _id: req.params.id });

      if (req.body.name) {
         kanto.name = req.body.name;
      }

      if (req.body.element) {
         kanto.element = req.body.element;
      }

      if (req.body.url_pict) {
         kanto.url_pict = req.body.url_pict;
      }

      await kanto.save();
      res.send(kanto);
   } catch (error) {
      req.status(404);
      req.send({ error: "Post doesn't exist!" });
   }
});

// Delete
router.delete('/kanto/:id', async (req, res) => {
   try {
      await Kanto.deleteOne({ _id: req.params.id });
      res.status(204).send();
   } catch {
      res.status(404);
      res.send({ error: "Post doesn't exist!" });
   }
});

// * Johto
// Get all data
router.get('/johto', isAuthenticated, async (req, res) => {
   const johto = await Johto.find();
   res.send(johto);
});

// Post 
router.post('/johto', async (req, res) => {
   const johto = new Johto({
      name: req.body.name,
      element: req.body.element,
      url_pict: req.body.url_pict
   });
   await johto.save();
   res.send(johto);
});

// Get one data
router.get('/johto/:id', async (res, req) => {
   try {
      const johto = await Johto.findOne({ _id: req.params.id });
      res.send(johto);
   } catch {
      res.status(404);
      res.send({ error: "Post doesn't exist!" });
   }
});

// Update
router.patch('/johto/:id', async (req, res) => {
   try {
      const johto = await Johto.findOne({ _id: req.params.id });

      if (req.body.name) {
         johto.name = req.body.name;
      }

      if (req.body.element) {
         johto.element = req.body.element;
      }

      if (req.body.url_pict) {
         johto.url_pict = req.body.url_pict;
      }

      await johto.save();
      res.send(johto);
   } catch (error) {
      req.status(404);
      req.send({ error: "Post doesn't exist!" });
   }
});

// Delete
router.delete('/johto/:id', async (req, res) => {
   try {
      await Johto.deleteOne({ _id: req.params.id });
      res.status(204).send();
   } catch {
      res.status(404);
      res.send({ error: "Post doesn't exist!" });
   }
});


// * Hoenn
// Get all data
router.get('/hoenn', isAuthenticated, async (req, res) => {
   const hoenn = await Hoenn.find();
   res.send(hoenn);
});

// Post
router.post('/hoenn', async (req, res) => {
   const hoenn = new Hoenn({
      name: req.body.name,
      element: req.body.element,
      url_pict: req.body.url_pict
   });
   await hoenn.save();
   res.send(hoenn);
});

// Get one data
router.get('/hoenn/:id', async (res, req) => {
   try {
      const hoenn = await Hoenn.findOne({ _id: req.params.id });
      res.send(hoenn);
   } catch {
      res.status(404);
      res.send({ error: "Post doesn't exist!" });
   }
});

// Update
router.patch('/hoenn/:id', async (req, res) => {
   try {
      const hoenn = await Hoenn.findOne({ _id: req.params.id });

      if (req.body.name) {
         hoenn.name = req.body.name;
      }

      if (req.body.element) {
         hoenn.element = req.body.element;
      }

      if (req.body.url_pict) {
         hoenn.url_pict = req.body.url_pict;
      }

      await hoenn.save();
      res.send(hoenn);
   } catch (error) {
      req.status(404);
      req.send({ error: "Post doesn't exist!" });
   }
});

// Delete
router.delete('/hoenn/:id', async (req, res) => {
   try {
      await Hoenn.deleteOne({ _id: req.params.id });
      res.status(204).send();
   } catch {
      res.status(404);
      res.send({ error: "Post doesn't exist!" });
   }
});


// * Carousel
router.get('/carousel', async (req, res) => {
   const carousel = await Carousel.find();
   res.send(carousel);
});

// Posting data
router.post('/carousel', async (req, res) => {
   const carousel = new Carousel({
      name: req.body.name,
      url_pict: req.body.url_pict,
   });
   await carousel.save();
   res.send(carousel);
});

router.get("/login", async (req, res) => {

   res.sendFile(path.join(__dirname + '/view/login.html'));
});

// Login Auth
router.post('/login_auth', async (req, res) => {
   const user = await Auth.findOne({
      username: req.body.username,
      password: req.body.password
   });

   if (user) return res.status(400).json({
      status: res.statusCode,
      message: 'Gagal Login!'
   });
   else
      var token = jwt.sign({
         username: req.body.username
      }, 'jwtsecret', { algorithm: 'HS256', expiresIn: '1000s' });

   return res.status(200).json({
      token: token,
      username: req.body.username,
      status: res.statusCode,
      message: 'Sukses Login!'
   });
});

//function untuk cek apa boleh akses halaman
router.post("/cek_page", async (req, res) => {
   var old_token = req.body.old_token;
   jwt.verify(old_token, 'jwtsecret', function (err, decoded) { //jwt melakukan verify
      if (err) {
         return res.status(200).json({
            message: 'failed'
         });
      } else {
         return res.status(200).json({
            message: 'ok'
         });
      }
   });
});

router.post("/refresh_token", async (req, res) => {
   var last_username = req.body.username;
   var last_token = req.body.last_token;
   jwt.verify(last_token, 'jwtsecret', function (err, decoded) { //jwt melakukan verify
      if (err) { // apa bila ada error
         res.json({ message: 'Failed to authenticate token' }); // jwt melakukan respon
      } else { // apa bila tidak error
         req.decoded = decoded; // menyimpan decoded ke req.decoded
         // terbitkan token baru
         var token = jwt.sign({ last_username }, 'jwtsecret', { algorithm: 'HS256', expiresIn: '10s' });
         return res.status(200).json({
            token: token,
            status: res.statusCode,
            message: 'Token Baru!'
         });
      }
   });
});



// Export
module.exports = router;