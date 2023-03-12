'uses strict';

const Chance = require('chance');
const chance = new Chance();
const store = 'acme-widgets';

// As a vendor, I want to alert the system when I have a package to be picked up.
const generateOrder = (socket, order = null) => {
  if(!order){
    order = {
      store,
      id: chance.guid(),
      customer: chance.name(),
      address: chance.address(),
    };
  }

  let payload = {
    event: 'PICKUP',
    messageID: order.id,
    queueId: store,
    order,
  };

  console.log('VENDOR: order ready for pickup.');
  socket.emit('PICKUP', payload);
};

// As a vendor, I want to be notified when my package has been delivered.
const thankDriver = (payload) => {
  console.log('Thanks for delivery the package to', payload.order.customer);
};

module.exports = { generateOrder, thankDriver };
