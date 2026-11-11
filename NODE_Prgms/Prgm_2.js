const fs = require('fs');

setTimeout(() => console.log('timeout'), 0);
setImmediate(() => console.log('immediate'));

fs.readFile(__filename, () => {
  setTimeout(() => console.log('fs → timeout'), 0);
  setImmediate(() => console.log('fs → immediate'));
  process.nextTick(() => console.log('fs → nextTick'));
});

Promise.resolve().then(() => console.log('promise'));
process.nextTick(() => console.log('nextTick'));