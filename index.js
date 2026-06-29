const WebSocket = require('ws');
const net = require('net');
const http = require('http');


const TARGET_IP = 'dexland.ru'; 
const TARGET_PORT = 25565;
const PORT = process.env.PORT || 10000;

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('webcraftproxy is active on Render!');
});

const wss = new WebSocket.Server({ server });

wss.on('connection', (wsClient) => {
    console.log('[webcraftproxy] Client connected via WebSocket');

    const tcpServer = net.createConnection({ host: TARGET_IP, port: TARGET_PORT }, () => {
        console.log(`[webcraftproxy] Bridged to Minecraft server ${TARGET_IP}:${TARGET_PORT}`);
    });

    wsClient.on('message', (message) => {
        if (tcpServer.writable) tcpServer.write(message);
    });

    tcpServer.on('data', (data) => {
        if (wsClient.readyState === WebSocket.OPEN) wsClient.send(data);
    });

    wsClient.on('close', () => tcpServer.end());
    tcpServer.on('close', () => wsClient.close());

    wsClient.on('error', (err) => console.error('WS Error:', err.message));
    tcpServer.on('error', (err) => console.error('TCP Error:', err.message));
});

server.listen(PORT, () => {
    console.log(`[webcraftproxy] Server listening on port ${PORT}`);
});
