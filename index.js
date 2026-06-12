const bot = mineflayer.createBot({
  host: process.env.HOST,
  port: Number(process.env.PORT_MC),
  username: process.env.BOT_NAME,
  auth: 'offline',
  version: '1.21.1'
});

console.log('Script iniciado');

http.createServer((req, res) => {
  res.writeHead(200);
  res.end('OK');
}).listen(process.env.PORT || 10000, () => {
  console.log('HTTP iniciado');
});

function startBot() {
  console.log('Iniciando bot...');

  console.log('HOST =', process.env.HOST);
  console.log('PORT_MC =', process.env.PORT_MC);
  console.log('BOT_NAME =', process.env.BOT_NAME);

  try {
    console.log('Antes do createBot');

    const bot = mineflayer.createBot({
      host: process.env.HOST,
      port: Number(process.env.PORT_MC),
      username: process.env.BOT_NAME,
      auth: 'offline',
      version: false
    });

    console.log('Depois do createBot');

    bot.on('login', () => {
      console.log('Login realizado');
    });

    bot.on('spawn', () => {
      console.log('Bot entrou no servidor');
    });

    bot.on('error', (err) => {
      console.log('Erro:', err);
    });

    bot.on('kicked', (reason) => {
      console.log('Kickado:', reason);
    });

    bot.on('end', () => {
      console.log('Desconectado');

      setTimeout(startBot, 15000);
    });

  } catch (err) {
    console.log('Erro fatal:', err);
  }
}

startBot();
