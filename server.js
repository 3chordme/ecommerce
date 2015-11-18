//npm init
//npm install [modules] --save
//verify package.json is correct
//require them in server.js
//instantiate express on app variable
//check app.listen to verify port is
//add middleware (cors, bodyParser) with app.use
//create connections to database (name database, create collection)

// DEPENDENCIES
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var mongojs = require('mongojs');


var app = express();

var db = mongojs('ecommerce');
var products = db.collection('products');

// MIDDLEWARE
app.use(bodyParser.json());
app.use(cors());


//CREATE

//result of insert's callback will be equal to the inserted object, including _id.

app.post('/products', function(req, res, next) {
  console.log('posting', req.body);
  products.insert(req.body, function(error, result) {
    if (error) {
      console.log('error', error);
      res.send(error);
    } else {
      console.log('result', result);
      res.status(200).send({ message: 'inserted ' + result._id, insertion: result });
    }
  })
});

//READ

app.get('/products', function(req, res, next) {
  console.log('getting');
  products.find({}, function(err, result) {
    if (err) {
      console.log('error', err);
      res.send(err);
    } else {
      console.log('result', result);
      res.status(200).send(result);
    }
  });
});

//UPDATE

// remember that collection.update({...}) replaces the entire object.
// result of update is an object { "ok": 1, "nModified": 1, "n": 1 }

app.put('/products', function(req, res, next) {
  console.log('putting', req.body);
  products.update({_id: mongojs.ObjectId(req.query.id)}, req.body, function(err, result) {
    if (err) {
      console.log('error', err);
      res.send(err);
    } else {
      console.log('result', result);
      res.send(result);
    }
  });
});


//DELETE
// result of remove is an object { "ok": 1, "n": 1 }

app.delete('/products', function(req, res, next) {
  console.log('deleting', req.body);
  products.remove({_id: mongojs.ObjectId(req.query.id)}, req.body, function(err, result) {
    if (err) {
      console.log('error', err);
      res.send(err);
    } else {
      console.log('result', result);
      res.send(result);
    }
  });
});

var port = 3333;
app.listen(port, function() { console.log('listening', port)})
