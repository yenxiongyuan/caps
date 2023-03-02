'use strict';

const eventPool = require('./eventPool.js');

//-----handlers-----//
require('./vendor/index');
require('./driver/index');

//-----listeners-----//
// Listens to ALL events in the Event Pool.
// eventPool.on('EVENT', Callback)
eventPool.on('PICKUP', (payload) => logger('PICKUP', payload));
eventPool.on('IN-TRANSIT', (payload) => logger('IN-TRANSIT', payload));
eventPool.on('DELIVERY', (payload) => logger('DELIVERY', payload));


// Logs a timestamp and the payload of every event.
function logger(event, payload) {
  const timestamp = new Date();
  console.log('EVENT:', {event, timestamp, payload});
}
