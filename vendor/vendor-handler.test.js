'use strict';

const socket = require('../driver/socket');
const { generateOrder, thankDriver } = require('./handlers');

jest.mock("../driver/socket", () => {
  return {
    on: jest.fn(),
    emit: jest.fn(),
  };
});
console.log = jest.fn();

describe('Vendor', () => {
  let payload = {
    store: '1-206-flowers',
    orderId: '6789',
    customer: 'Alex',
    address: 'House',
  };
  it('emits an order as expected', () => {
    generateOrder(socket, payload);
    expect(console.log).toHaveBeenCalledWith('VENDOR: order ready for pickup.');
    expect(socket.emit).toHaveBeenCalledWith('PICKUP', payload);
  });

  it('thanks driver', () => {
    thankDriver(payload);
    expect(console.log).toHaveBeenCalledWith('Thanks for delivery the package to', payload.customer);

  });
});
