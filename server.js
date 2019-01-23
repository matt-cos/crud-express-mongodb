const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const MongoClient = require('mongodb').MongoClient;
var port = process.env.PORT || 3000;
var db;

MongoClient.connect('mongodb://cem-user1:BsqEagpSRtKT2hB@ds253324.mlab.com:53324/crud-express-mongodb', function(err, client) {
	if (err) {
		console.log(err);
	}

	db = client.db('crud-express-mongodb');

	// only starts server once the database is connected
	app.listen(port, function() {
		console.log("listening on port 3000");
	});
});

app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.get('/', function(req, res) {

	db.collection('quotes').find().toArray(function(err, result) {
		if (err) {
			console.log(err);
		}

		res.render('index.ejs', { quotes: result });
	});
});

app.get('/answers', function(req, res) {

	db.collection('quotes').find().toArray(function(err, result) {
		if (err) {
			console.log(err);
		}

		res.render('answers.ejs', { quotes: result });
	});
});

app.post('/quotes', function(req, res) {
	db.collection('quotes').save(req.body, function(err, result) {
		if (err) {
			console.log(err);
		}

		console.log('saved to databse');
		res.redirect('/answers'); // where to redirect after posting
	});
});
