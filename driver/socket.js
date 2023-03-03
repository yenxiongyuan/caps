'use strict';

// you take it over, you don't have make a connection/ pass it to the test.js
const { io } = require('socket.io-client');
const socket = io('http://localhost:3001/caps');

module.exports = socket;
