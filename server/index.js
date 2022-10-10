const express = require('express');
const http = require('http');

const app = express();
const server = http.createServer(app);
var io = require('socket.io')(server);
server.listen(process.env.PORT || 3000);
console.log('Server is running');

io.on('connection', function (socket) {
   console.log('a new socket connection');
})

app.use(express.static('public'))

// routes
app.get('/', (req, res) => {
   res.sendFile(__dirname + '/index.html');
});

// static files
// app.use(express.static(path.join(__dirname, 'public')));

const SerialPort = require('serialport').SerialPort;
// const Readline = require('@serialport/parser-readline')

const mySerial = new SerialPort({ path: 'COM13', baudRate: 9600 })

/* const parser = port.pipe(new Readline({ delimiter: '\r\n' }))

mySerial.pipe(parser); */

mySerial.on('open', function () {
   console.log('Opened Port.');
});

mySerial.on('data', function (data) {
   // console.log(parseInt(data));
   console.log(data.toString());
   io.emit('arduino:data', {
      value: data.toString()
   });
});

mySerial.on('err', function (data) {
   console.log(err.message);
});