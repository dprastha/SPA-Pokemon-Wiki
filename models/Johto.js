const mongoose = require('mongoose');

const schema = mongoose.Schema({
   name: String,
   element: String,
   url_pict: String
});

module.exports = mongoose.model('Johtos', schema);