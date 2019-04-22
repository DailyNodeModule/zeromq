const zmq = require('zeromq');
const msgpack = require('msgpack-lite');

const port = Number(process.env.PORT) || 3000;

const socket = zmq.socket('sub');

socket.connect(`tcp://127.0.0.1:${port}`);

// The client can subscribe to multiple channels.
socket.subscribe('emperors');

socket.on('message', (topic, message) => {
    // The message will come in as a Buffer.
    const emp = msgpack.decode(message);

    console.log(`received: ${emp.house}, ${emp.name}`);
});