
const express = require('express');
const app = express();
const googleshoppinglist = require('./index');
const to = require('./lib/to');
const cors = require('cors');
const bodyParser = require('body-parser');

require('dotenv').config()
const creds = {
	email: process.env.GOOGLEEMAIL,
	password: process.env.GOOGLEPASSWORD
};

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', async function (req, res) {
	let [err, list] = await to(googleshoppinglist.getList(creds, { cookies: true }));

	if (err) {
		res.send('Error: ' + err)
	} else {
		// list = JSON.parse(JSON.stringify(list));
		// list.pop();
		res.send({ items: list });
	}
});

app.listen(process.env.SHOPPINGLISTPORT, function () {
	console.log('Listening on port ' + process.env.SHOPPINGLISTPORT + ' account: ' + creds.email);
});

