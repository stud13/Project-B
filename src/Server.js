let express = require('express');
let http = require('http');
let path = require('path');
let socketIO = require('socket.io');
let app = express();
let server = http.Server(app);
let io = socketIO(server);

app.set('port', 3000);
app.use('/static', express.static(__dirname + '/static'));


// Маршруты
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'))
});

/*io.on("connection", (socket) => {
    socket.emit("hello", "world")
});*/

/*setInterval(function() {
    io.sockets.emit('message', 'hi!');
}, 1000);*/

let players = {};
io.on('connection', function (socket) {
    socket.on('new player', function () {
        players[socket.id] = {
            x: 300,
            y: 300
        };
    });
    socket.on('movement', function (data) {
        let player = players[socket.id] || {};
        if (data.left) {
            player.x -= 5;
        }
        if (data.up) {
            player.y -= 5;
        }
        if (data.right) {
            player.x += 5;
        }
        if (data.down) {
            player.y += 5;
        }
    });
});

setInterval(function () {
    io.sockets.emit('state', players);
}, 1000 / 60);

// Запуск сервера
server.listen(3000, function () {
    console.log(`Api running on port 3000`);
});
