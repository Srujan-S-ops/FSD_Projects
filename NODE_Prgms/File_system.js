const fs = require('fs');
const fsp = require('fs/promises');

// Async with promises
async function demo() {
  await fsp.writeFile('note.txt', 'Hello');
  await fsp.appendFile('note.txt', '\nWorld');
  const data = await fsp.readFile('note.txt', 'utf8');
  console.log(data);
  await fsp.rename('note.txt', 'renamed.txt');
  await fsp.unlink('renamed.txt');
}
demo().catch(console.error);

// Callback style
fs.readFile('a.txt', 'utf8', (err, data) => {
  if (err) return console.error(err);
  console.log(data);
});

// Sync (blocks! use only at startup/scripts)
const text = fs.readFileSync('a.txt', 'utf8');