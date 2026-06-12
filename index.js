const mineflayer = require('mineflayer');

function criarBot() {
  const bot = mineflayer.createBot({
    host: 'myworldgbgat.aternos.me', // ← substitua aqui
    port: 62351,
    username: 'BotAFK123' // Nome do bot
  });

  bot.on('spawn', () => {
    console.log('✅ Bot conectado ao servidor!');

    // Pular a cada 6 segundos
    setInterval(() => {
      bot.setControlState('jump', true);
      setTimeout(() => bot.setControlState('jump', false), 500);
    }, 6000);

    // Enviar mensagens automáticas no chat
    const mensagens = ['Oi!', 'Estou online 😎', 'AFK', 'Bot presente'];
    setInterval(() => {
      const msg = mensagens[Math.floor(Math.random() * mensagens.length)];
      bot.chat(msg);
    }, 30000); // a cada 30 segundos
  });

  bot.on('end', (reason) => {
    console.log('⚠️ Bot desconectado. Motivo:', reason);
    console.log('🔁 Tentando reconectar em 5 segundos...');
    setTimeout(criarBot, 5000);
  });

  bot.on('error', (err) => {
    console.log('❌ Erro:', err);
  });
}

criarBot();

