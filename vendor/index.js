'use strict';

const { io } = require('socket.io-client'); //socket client
const { generateOrder, thankDriver } = require('./handlers');

const socket = io('http://localhost:3001/caps'); // http://localhost:3001/caps(nameSpace)

// socket is one of the socket to the /caps(nameSpace)
socket.on('DELIVERY', (payload) => {
  thankDriver(payload);
});

setInterval(() => {
  generateOrder(socket);
}, 5000);





