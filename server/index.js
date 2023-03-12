'use strict';

require('dotenv').config();
const { Server } = require('socket.io');
// const socket = require('../acme-widgets/socket');
const PORT = process.env.PORT || 3002;
const Queue = require('./lib/queue');
const capsQueue = new Queue();

// server singleton,  #1 server is the building
const server = new Server();

// create namespace, #2 namespace is the floor in the building
const caps = server.of('/caps');

// create / allow for connections, #3 go to correct floor
caps.on('connection', (socket) => {
  console.log('connect to the caps namespace', socket.id);
  //socket.onAny listen to any events that comes in
  // #4 go to correct room on the floor
  socket.onAny((event, payload) => {
    const time = new Date();
    console.log('EVENT:', { event, time, payload });
  });

  socket.on('JOIN', (room) => {
    socket.join(room);
    console.log(`${socket.id} joined the ${room} room`);
  });

  // manage the PICKUP EVENT
  socket.on('PICKUP', (payload) => {
    let driverQueue = capsQueue.read('driver');
    // if no driverQuequ
    if (!driverQueue) {
      // if no driverQuequ, create new driverQueue and store in capsQueue
      let driverKey = capsQueue.store('driver', new Queue());
      // get it back out, so we can reference it
      driverQueue = capsQueue.read(driverKey);
    }
    driverQueue.store(payload.messageId, payload);

    socket.broadcast.emit('PICKUP', payload); // broadcast send it to anyone, but not to the sender
  });

  socket.on('IN-TRANSIT', (payload) => {
    // fair, no one is listening.  but a relay station(server.js) relays things
    socket.broadcast.emit('IN-TRANSIT', payload);
  });

  socket.on('DELIVERED', (payload) => {
    let vendorQueue = capsQueue.read(payload.queueId);
    // if no vendorQuequ
    if (!vendorQueue) {
      // if no vendorQuequ, create new vendorQueue with payload.queueId and store in capsQueue
      let vendorKey = capsQueue.store(payload.queueId, new Queue());
      // get it back out, so we can reference it
      vendorQueue = capsQueue.read(vendorKey);
    }
    vendorQueue.store(payload.messageId, payload);

    socket.to(payload.queueId).emit('DELIVERED', payload);
  });

  socket.on('RECEIVED', (payload) => {
    console.log('Server: Received event registered');

    let currentQueue = capsQueue.read(payload.queueId);
    if (!currentQueue) {
      throw new Error('we have payloads, but No queue');
    }

    currentQueue.remove(payload.messageId);
  });

  socket.on('GET-ALL', (payload) => {
    console.log('trying to get all');
    let currentQueue = capsQueue.read(payload.queueId);
    if (currentQueue && currentQueue.data) {
      Object.keys(currentQueue.data).forEach((messageId) => {
        let payload = currentQueue.read(messageId);
        socket.emit(payload.event, payload);
      });
    }
  });
});

console.log('listening on port', PORT);
server.listen(PORT);
