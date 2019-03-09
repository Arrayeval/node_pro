// 参考链接：https://www.cnblogs.com/fps2tao/p/7875618.html
var WebSocketServer = require('ws').Server;
wss = new WebSocketServer({
    port: 8080
})

let stocks = {
    'alibaba': 357.22,
    'tencent': 453.2,
    'wangyi': 215.2,
    'baidu': 200.2,
    'toutiao': 200
}

function randomInterval (min, max) {
    return Math.floor(Math.random() * (max-min+1)+min);
}
var stockUpdater =[];
var randomStockUpdater = function () {
    for(var symbol in stocks) {
        if (stocks.hasOwnProperty(symbol)) {
            var randomizedChange = randomInterval(-200, 200)
            var floatChange = randomizedChange / 5;
            stocks[symbol] += floatChange;
        }   
    }
    var randomMSTime = randomInterval(500, 2500)
    stockUpdater = setTimeout(() => {
        randomStockUpdater()
    }, randomMSTime)
}
randomStockUpdater()

// 链接之后
let clientStocks = [];
wss.on('connection', (ws) => {
    // ws.on('message', function (message) {
    //     console.log(message)
    // })
    let sendStockUpdates = function (ws) {
        if (ws.readyState === 1) {
            let stocksObj = {};
            for (let i=0; i<clientStocks.length; i++) {
                let symbol = clientStocks[i];
                stocksObj[symbol] = stocks[symbol]
            }
            if (stocksObj.length !== 0) {
                ws.send(JSON.stringify(stocksObj)) // 需要将对象转成字符串，webSocket只支持文本和二进制数据
            }
        }
    }

    var clientStockUpdater = setInterval(function () {
        sendStockUpdates(ws)
    }, 1000)

    ws.on('message', function (message) {
        console.log(message);
        let stockRequest = JSON.parse(message) // 接受请求发送来的数据
        clientStocks = stockRequest['stocks']
        sendStockUpdates(ws)
    })
})