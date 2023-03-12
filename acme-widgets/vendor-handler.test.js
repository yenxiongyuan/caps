'use strict';

const socket = require('./socket');
const { generateOrder, thankDriver } = require('./handlers');


jest.mock('./socket', () => {
  return {
    on: jest.fn(),
    emit: jest.fn(),
  };
});
console.log = jest.fn();

describe('Vendor', () => {

  let order = {
    store: 'acme-widgets',
    id: 'acme-widgets',
    customer: 'acme-widgets',
    address: 'acme-widgets',
  };

  let payload = {
    event: 'PICKUP',
    messageID: 'jjhhkjkhj',
    queueId: 'acme-widgets',
    order,
  };
 

  it('emits an order as expected', () => {
    generateOrder(socket, payload);
    expect(console.log).toHaveBeenCalledWith('VENDOR: order ready for pickup.');
    expect(socket.emit).toHaveBeenCalledWith('PICKUP', payload);
  });

  it('thanks driver', () => {
    thankDriver(payload);
    expect(console.log).toHaveBeenCalledWith(
      'Thanks for delivery the package',
      payload.order.customer,
    );
  });
});
