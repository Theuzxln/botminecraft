const net = require('net');

console.log('Testando conexão...');

const socket = net.createConnection({
  host: 'myworldgbgat.aternos.me',
  port: 62351
});

socket.on('connect', () => {
  console.log('PORTA ABERTA');
  socket.destroy();
});

socket.on('error', (err) => {
  console.log('ERRO:', err.message);
});

socket.setTimeout(10000);

socket.on('timeout', () => {
  console.log('TIMEOUT');
  socket.destroy();
});
