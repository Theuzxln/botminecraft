const mineflayer = require('mineflayer');
const http = require('http');

http.createServer((req, res) => {
  res.writeHead(200);
  res.end('OK');
}).listen(process.env.PORT || 10000);

function startBot() {
  console.log('Iniciando bot...');

  const bot = mineflayer.createBot({
    host: process.env.HOST,
    port: parseInt(process.env.PORT_MC),
    username: process.env.BOT_NAME,
    auth: 'offline'
  });

  bot.on('login', () => {
    console.log('Login realizado');
  });

  bot.on('spawn', () => {
    console.log('Bot entrou no servidor');

    setInterval(() => {
      if (!bot.entity) return;

      bot.setControlState('jump', true);

      setTimeout(() => {
        bot.setControlState('jump', false);
      }, 500);
    }, 10000);
  });

  bot.on('kicked', (reason) => {
    console.log('Kickado:', reason);
  });

  bot.on('error', (err) => {
    console.log('Erro:', err);
  });

  bot.on('end', () => {
    console.log('Desconectado. Reconectando em 15 segundos...');

    setTimeout(() => {
      startBot();
    }, 15000);
  });
}

startBot();
