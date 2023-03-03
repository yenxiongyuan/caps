'uses strict';

const Chance = require('chance');
const chance = new Chance();

// As a vendor, I want to alert the system when I have a package to be picked up.
const generateOrder = (socket, payload = null) => {
  if(!payload){
    payload = {
      store: '1-800-flowers',
      id: chance.guid(),
      customer: chance.name(),
      address: chance.address(),
    };
  }

  console.log('VENDOR: order ready for pickup.');
  socket.emit('PICKUP', payload);
};

// As a vendor, I want to be notified when my package has been delivered.
const thankDriver = (payload) => {
  console.log('Thanks for delivery the package to', payload.customer);
};

module.exports = { generateOrder, thankDriver };
