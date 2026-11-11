const buf = Buffer.from('Node', 'utf8');

setTimeout(() => {
    console.log(buf);
    console.log(buf.toString());
}, 10000);