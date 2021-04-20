const express = require("express");
const Carousel = require('./models/Carousel');
const Kanto = require('./models/Kanto');
const Johto = require('./models/Johto');
const Hoenn = require("./models/hoenn");
const router = express.Router();
var path = require('path');
const e = require("express");

// * Admin
router.get('/admin', async (req, res) => {
   res.sendFile(path.join(__dirname + '/view/admin_dashboard.html'));
});

// * Kanto
// Get all data
router.get('/kanto', async (req, res) => {
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
router.get('/johto', async (req, res) => {
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

// * Hoenn
// Get all data
router.get('/hoenn', async (req, res) => {
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


// Export
module.exports = router;