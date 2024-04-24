const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });
let votes = { 'red': 0, 'blue': 0, 'purple': 0, 'green': 0 };
let clientVotes = {};

wss.on('connection', function connection(ws) {
    const clientId = generateClientId();
    ws.send(JSON.stringify({ votes }));

    ws.on('message', function incoming(message) {
        const data = JSON.parse(message);
        const color = data.color;

        if (color && votes.hasOwnProperty(color)) {
            if (!clientVotes[clientId]) {
                clientVotes[clientId] = color;
                votes[color]++;
            } else if (clientVotes[clientId] !== color) {
                votes[clientVotes[clientId]]--;
                votes[color]++;
                clientVotes[clientId] = color;
            }
            sendToAllClients({ votes });
        }
    });

    ws.on('close', function close() {
        if (clientVotes[clientId]) {
            votes[clientVotes[clientId]]--;
            delete clientVotes[clientId];
            sendToAllClients({ votes });
        }
        console.log('disconnected');
    });
});

function sendToAllClients(message) {
    const jsonMessage = JSON.stringify(message);
    wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
            client.send(jsonMessage);
        }
    });
}

function generateClientId() {
    return Math.floor(Math.random() * 100);
}