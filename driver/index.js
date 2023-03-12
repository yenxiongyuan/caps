'use strict';

const { io } = require('socket.io-client'); //socket client
const socket = io('http://localhost:3001/caps');

socket.emit('GET-ALL', {queueId: 'driver'});

// As a driver, I want to be notified when there is a package to be delivered.
//socket.on('PICKUP') listen to the PICKUP
socket.on('PICKUP', (payload) => {
  setTimeout(() => {
    // As a driver, I want to alert the system when I have picked up a package and it is in transit.
    console.log('DRIVER: picked up package.');
    socket.emit('IN-TRANSIT', payload);
    socket.emit('RECEIVED', {queueId: 'driver', messageId : payload.messageId} );
  }, 1000);
  setTimeout(() => {
    // As a driver, I want to alert the system when a package has been delivered.
    console.log('DRIVER: package has been delivered');
    // {... payload, event:'DELIVERED'}, make a copy of the payload and change the event to 'DELIVERED'
    socket.emit('DELIVERED', { ...payload, event: 'DELIVERED' });
  }, 2000);
});


