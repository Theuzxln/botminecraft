const mineflayer = require('mineflayer');
const http = require('http');

const WEB_PORT = process.env.PORT || 10000;

http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Bot Online');
}).listen(WEB_PORT, () => {
  console.log(`🌐 HTTP online na porta ${WEB_PORT}`);
});

let bot;
let reconnecting = false;

function conectar() {
  console.log('================================');
  console.log('🚀 Iniciando conexão...');
  console.log(`Host: ${process.env.HOST}`);
  console.log(`Porta: ${process.env.PORT_MC}`);
  console.log(`Nick: ${process.env.BOT_NAME}`);
  console.log('================================');

  bot = mineflayer.createBot({
    host: process.env.HOST,
    port: Number(process.env.PORT_MC),
    username: process.env.BOT_NAME,
    version: false
  });

  bot.once('login', () => {
    console.log('🔑 Login realizado');
  });

  bot.once('spawn', () => {
    console.log('✅ Bot conectado');

    iniciarAFK();
  });

  bot.on('chat', (username, message) => {
    if (username === bot.username) return;

    console.log(`[CHAT] ${username}: ${message}`);
  });

  bot.on('kicked', (reason) => {
    console.log('🚫 Kickado:');
    console.log(reason);
  });

  bot.on('error', (err) => {
    console.log('❌ Erro:');
    console.log(err?.message || err);
  });

  bot.on('end', () => {
    console.log('⚠️ Conexão encerrada');

    if (!reconnecting) {
      reconnecting = true;

      setTimeout(() => {
        reconnecting = false;
        conectar();
      }, 15000);
    }
  });
}

function iniciarAFK() {
  setInterval(() => {
    if (!bot || !bot.entity) return;

    try {
      bot.look(
        Math.random() * Math.PI * 2,
        (Math.random() - 0.5) * 0.5,
        true
      );

      bot.setControlState('jump', true);

      setTimeout(() => {
        bot.setControlState('jump', false);
      }, 500);

      console.log('🤖 Movimento AFK executado');
    } catch (err) {
      console.log('Erro movimento:', err.message);
    }
  }, 15000);
}

conectar();
