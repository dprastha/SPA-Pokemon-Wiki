const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const port = 5000;

mongoose
   // .connect("mongodb://localhost:27017/spa_pokemon", {
   //    useNewUrlParser: true
   // })
   .connect("mongodb+srv://adminBaru:GJHnAcRDp3ia3lCL@cluster0.a7mrd.mongodb.net/spa_pokemon?retryWrites=true&w=majority", {
      useNewUrlParser: true, useCreateIndex: true,
      useUnifiedTopology: true
   })
   .then(() => {
      const app = express();
      app.use(express.json());
      app.use("/", routes);
      app.listen(5000, () => {
         console.log(`Server listening at http://localhost:${port}`);
      });
   });