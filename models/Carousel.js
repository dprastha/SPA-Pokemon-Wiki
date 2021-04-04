const mongoose = require('mongoose');

const schema = mongoose.Schema({
   name: String,
   url_pict: String,
})

module.exports = mongoose.model('Carousels', schema);