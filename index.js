const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const port = 5000;

mongoose.connect("mongodb://localhost:27017/spa_pokemon", {
   useNewUrlParser: true
}).then(() => {
   const app = express();
   app.use(express.json());
   app.use("/", routes);
   app.listen(5000, () => {
      console.log(`Server listening at http://localhost:${port}`);
   });
});