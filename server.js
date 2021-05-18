const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const port = 6969;
const server = http.createServer(express);
const wss = new WebSocket.Server({ server });

wss.on('connection', function connection(ws) {
	ws.on('message', function incoming(data) {

		console.log(data);

		wss.clients.forEach(function each(client) {
			console.log(client);

			if(data === 'batteryLevel') {
				client.send('96%'); // return the battery level
			} else {
				client.send('Message from websocket server');
			}			
		});
	});
});

server.listen(port, function () {
	console.log(`Server is listening on ${port}!`);
});