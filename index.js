const mineflayer = require('mineflayer');
const http = require('http');

const WEB_PORT = process.env.PORT || 10000;

http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Bot Minecraft Online');
}).listen(WEB_PORT, () => {
  console.log(`🌐 HTTP online na porta ${WEB_PORT}`);
});

let bot = null;
let afkInterval = null;

function iniciarBot() {
  console.log('\n==============================');
  console.log('🚀 Iniciando bot...');
  console.log('HOST:', process.env.HOST);
  console.log('PORT_MC:', process.env.PORT_MC);
  console.log('BOT_NAME:', process.env.BOT_NAME);
  console.log('==============================\n');

  try {
    bot = mineflayer.createBot({
      host: process.env.HOST,
      port: Number(process.env.PORT_MC),
      username: process.env.BOT_NAME,
      version: false
    });

    bot._client.on('connect', () => {
      console.log('🟢 Socket conectado');
    });

    bot._client.on('error', (err) => {
      console.log('❌ Erro de socket:', err.message);
    });

    bot.on('login', () => {
      console.log('🔑 Login realizado');
    });

    bot.on('spawn', () => {
      console.log('✅ Bot entrou no servidor');

      if (afkInterval) clearInterval(afkInterval);

      afkInterval = setInterval(() => {
        if (!bot || !bot.entity) return;

        try {
          const yaw = Math.random() * Math.PI * 2;
          const pitch = (Math.random() - 0.5) * 0.4;

          bot.look(yaw, pitch, true);

          bot.setControlState('jump', true);

          setTimeout(() => {
            if (bot) {
              bot.setControlState('jump', false);
            }
          }, 500);

          console.log('🤖 Movimento AFK executado');
        } catch (err) {
          console.log('⚠️ Erro no movimento:', err.message);
        }
      }, 15000);
    });

    bot.on('chat', (username, message) => {
      if (username === bot.username) return;

      console.log(`[CHAT] ${username}: ${message}`);
    });

    bot.on('kicked', (reason) => {
      console.log('🚫 Kickado pelo servidor:');
      console.log(reason);
    });

    bot.on('error', (err) => {
      console.log('❌ Erro Mineflayer:');
      console.log(err.message || err);
    });

    bot.on('end', () => {
      console.log('⚠️ Conexão encerrada');

      if (afkInterval) {
        clearInterval(afkInterval);
        afkInterval = null;
      }

      console.log('🔄 Tentando reconectar em 15 segundos...');

      setTimeout(() => {
        iniciarBot();
      }, 15000);
    });

    setTimeout(() => {
      console.log('⏱️ Verificação: bot iniciado há 30 segundos');
    }, 30000);

  } catch (err) {
    console.log('💥 Falha ao criar bot:', err);

    setTimeout(() => {
      iniciarBot();
    }, 15000);
  }
}

iniciarBot();
