const express = require('express');
const http = require('http');

app.use(express.static('assets'))

app.get('/', (req, res) => {
   res.sendFile(__dirname + '/index.html');
});

app.get('/dashboard', (req, res) => {
   res.sendFile(__dirname + '/dashboard.html');
});

app.get('/signup', (req, res) => {
   res.sendFile(__dirname + '/sign-up.html');
});

app.get('/profile', (req, res) => {
   res.sendFile(__dirname + '/profile.html');
});

/* INICIO CODIGO ACOPLE */

const app = express();
const server = http.createServer(app);
var io = require('socket.io')(server);
server.listen(process.env.PORT || 3000);
console.log('Server is running');

const SerialPort = require('serialport').SerialPort;
const mySerial = new SerialPort({ path: 'COM13', baudRate: 9600 })

io.on('connection', function (socket) {
   console.log('a new socket connection');
})

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

/* FIN CODIGO ACOPLE */