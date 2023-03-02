'use strict';

// Step 1
const Event = require('events'); // require events from Node.js

const eventPool = new Event(); // make a new Event

module.exports = eventPool; // eventPool is like a stage in the concert where everything is happening. Singer sings, people listen