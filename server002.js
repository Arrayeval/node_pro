// 聊天室
var WebSocketServer = require('ws').Server;
var WebSocket = require('ws');
ws = new WebSocketServer({
    port: 8081
})
var uuid = require('uuid');
let clients = [];
// 服务器发消息消息
function wsSend(type, client_uuid, nickname, message) {
    for(var i=0; i< clients.length; i++) {
        var clientSocket = clients[i].ws;
        if(clientSocket.readyState === WebSocket.OPEN) {
            clientSocket.send(JSON.stringify({
                "type": type,
                "id": client_uuid,
                "nickname": nickname,
                "message": message
            }))
        }
    }
}
let clientIndex = 1;

// 服务器处理链接
ws.on('connection', function (ws) {
    var client_uuid = uuid.v4();
    var nickname = "AnonymousUser" + clientIndex;
    clientIndex += 1;
    clients.push({
        "id": client_uuid,
        "ws": ws,
        "nickname": nickname
    });
    console.log("client", client_uuid);
    let connect_message = nickname + 'has connected';
    wsSend("notification", client_uuid, nickname, connect_message);
    ws.on('message', function(message){
        if (message.indexOf('/nick') === 0) {
            var nickname_array = message.split(' ');
            if(nickname_array.length >= 2) {
                let old_nickname = nickname
                nickname = nickname_array[1];
                var nickname_message = "Client" + old_nickname + "changed to" + nickname;
                wsSend('nick_update', client_uuid, nickname, nickname_message)
            }
        } else {
            wsSend('message', client_uuid, nickname, message)
        }
    })

    // 处理关闭的链接
    let closeSocket = function (customMessage) {
        for (let i=0; i<clients.length;i++) {
            if (clients[i].id === client_uuid) {
                let disConnect_messages;
                if (customMessage) {
                    disConnect_messages = customMessage;
                } else {
                    disConnect_messages = nickname + 'has disconnected';
                }
                wsSend('notification', client_uuid, nickname, disConnect_messages)
                clients.splice(i, 1);
            }
        } 
    }

    ws.on('close', function () {
        closeSocket();
    })
    process.on("SININT", function () {
        console.log("close server");
        closeSocket("server has disconnected")
        process.exit();
    })
})

