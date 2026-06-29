const { EaglerProxy } = require('eaglerproxy');

const proxy = new EaglerProxy({
    port: process.env.PORT || 8080,
    target_host: '://wynncraft.com', // Замените на IP вашего любимого сервера
    target_port: 25565,
    motd: 'WebCraft Browser Proxy!'
});

console.log(`Proxy has been started on port ${process.env.PORT || 8080}`);
