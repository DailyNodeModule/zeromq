const { emperors } = require('@dailynodemodule/emperor-data');
const zmq = require('zeromq');
const msgpack = require('msgpack-lite');

const socket = zmq.socket('pub');

// Can listen over several protocols including TCP.
socket.bindSync(`ipc://emperor-feed`);
// socket.bindSync('tcp://127.0.0.1:1234');

let index = 0;

setInterval(() => {
    const emp = emperors[index++];

    console.log(`sending: ${emp.house}, ${emp.name}`);
    
    // message will be sent as a Buffer.
    const buf = msgpack.encode(emp);
    
    socket.send(['emperors', buf]);

    if (index >= emperors.length) 
        index = 0;
}, 200);