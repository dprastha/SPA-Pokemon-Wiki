const express = require("express")
const Carousel = require('./models/Carousel');
const Kanto = require('./models/Kanto');
const Johto = require('./models/Johto');
const Hoenn = require("./models/hoenn");
const router = express.Router();
var path = require('path');


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
})

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