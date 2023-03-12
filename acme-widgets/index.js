'use strict';

const { io } = require('socket.io-client'); //socket client
const { generateOrder, thankDriver } = require('./handlers');

const socket = io('http://localhost:3001/caps'); // http://localhost:3001/caps(nameSpace)
const store = 'acme-widgets';

socket.emit('JOIN', store);

socket.emit('GET-ALL', { queueId: store});


// socket is one of the socket to the /caps(nameSpace)
socket.on('DELIVERED', (payload) => {
  thankDriver(payload);
  socket.emit('RECEIVED', payload);
});

setInterval(() => {
  generateOrder(socket);
}, 7000);





