const mineflayer = require('mineflayer');
const http = require('http');

// Servidor HTTP para o Render
const WEB_PORT = process.env.PORT || 10000;

http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Bot Minecraft Online!');
}).listen(WEB_PORT, () => {
  console.log(`🌐 Servidor HTTP rodando na porta ${WEB_PORT}`);
});

function criarBot() {
  console.log('=================================');
  console.log('🚀 Iniciando bot...');
  console.log('HOST:', process.env.HOST);
  console.log('PORT_MC:', process.env.PORT_MC);
  console.log('BOT_NAME:', process.env.BOT_NAME);
  console.log('=================================');

  const bot = mineflayer.createBot({
    host: process.env.HOST,
    port: parseInt(process.env.PORT_MC),
    username: process.env.BOT_NAME
  });

  bot.on('login', () => {
    console.log('🔑 Login realizado!');
  });

  bot.on('spawn', () => {
    console.log('✅ Bot conectado ao servidor!');

    // Pulo AFK
    setInterval(() => {
      try {
        bot.setControlState('jump', true);

        setTimeout(() => {
          bot.setControlState('jump', false);
        }, 500);
      } catch (e) {
        console.log('Erro ao pular:', e.message);
      }
    }, 6000);

    // Mensagens no chat
    const mensagens = [
      'Oi!',
      'Estou online 😎',
      'AFK',
      'Bot presente'
    ];

    setInterval(() => {
      try {
        const msg = mensagens[Math.floor(Math.random() * mensagens.length)];
        bot.chat(msg);
        console.log('💬 Mensagem enviada:', msg);
      } catch (e) {
        console.log('Erro ao enviar mensagem:', e.message);
      }
    }, 30000);
  });

  bot.on('kicked', (reason) => {
    console.log('🚫 Expulso do servidor:', reason);
  });

  bot.on('end', (reason) => {
    console.log('⚠️ Bot desconectado.');
    console.log('Motivo:', reason);

    console.log('🔄 Reconectando em 10 segundos...');

    setTimeout(() => {
      criarBot();
    }, 10000);
  });

  bot.on('error', (err) => {
    console.log('❌ Erro do bot:');
    console.log(err);
  });
}

criarBot();
