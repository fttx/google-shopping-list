
const express = require('express');
const app = express();
const googleshoppinglist = require('./index');
const to = require('./lib/to');
const path = require('path');

require('dotenv').config()
const creds = {
	email: process.env.GOOGLEEMAIL,
	password: process.env.GOOGLEPASSWORD
};

app.get('/', async function (req, res) {
	let [err, list] = await to(googleshoppinglist.getList(creds, { cookies: true }));

	if (err) {
		res.send('Error: ' + err)
	} else {
		list = JSON.parse(JSON.stringify(list));
		list.pop();
		res.send({ items: list });
	}
});

app.listen(process.env.SHOPPINGLISTPORT, function () {
	console.log('Listening on port ' + process.env.SHOPPINGLISTPORT);
});

