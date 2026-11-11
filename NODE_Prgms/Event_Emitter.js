const EventEmitter = require('events');

class Order extends EventEmitter {}
const order = new Order();

order.on('placed', (id) => console.log('Order placed:', id));
order.once('shipped', (id) => console.log('Shipped once:', id));

order.emit('placed', 101);
order.emit('shipped', 101);
order.emit('shipped', 101); // ignored: `once`