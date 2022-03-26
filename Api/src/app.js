import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

//import routes
import {loginRoutes, restaurantRoutes} from './routes';

const app = express();

// start app on port
var server = app.listen(process.env.PORT || 4000, () =>
  console.log('express app listening on port 4000!'),
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin,Authorization,email,X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE');
  next();
});

// routes
app.use(loginRoutes);
app.use(restaurantRoutes);

// mongodb server connection
mongoose.connect(`your connection string`, 
      { useNewUrlParser: true, useUnifiedTopology: true,useCreateIndex:true }, 
      (err) => {
          if (err) console.log('Failed to connect to mongodb server', err);
          else console.log('successfully connected to mongodb server!');
});


//error handling
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send(`Something went wrong! ${err.message}`);
})