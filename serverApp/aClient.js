'use strict';

const http = require('http');
const fs = require('fs');
const serverHost = 'localhost';
const serverPort = 3000;
const configData = require('./config.json');

var webCall = function (secret) {
	var url = '/foo';
	var options = {
		host: serverHost,
		port: serverPort,
		path: url
	};
	if(secret) {
		options.headers = { Authorization: 'aClient:' + secret };
	}
	http.get(options, (res) => {
		if (res.statusCode !== 200) {
			console.log(`aClient ${url} response: ${res.statusCode} ${res.statusMessage}`);
		} else {
			console.log(`aClient  response: Success`);
		}
		// consume response body
		res.resume();
	}).on('error', (e) => {
		console.error(`aClient error: ${e.message}`);
	});
};

webCall(configData.secret);
webCall();