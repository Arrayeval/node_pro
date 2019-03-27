var http = require("http");
const GetOuterDataFun = {
    getJuejinData () {
        let url = "http://timeline-merger-ms.juejin.im/v1/get_entry_by_rank?src=web&uid=59abbfed6fb9a02484494763&device_id=1553261477587&token=eyJhY2Nlc3NfdG9rZW4iOiJMdlg3NzlGaDJDMWNtZE1yIiwicmVmcmVzaF90b2tlbiI6IlM3ZkE1VUxxSUJKNUdRakYiLCJ0b2tlbl90eXBlIjoibWFjIiwiZXhwaXJlX2luIjoyNTkyMDAwfQ%3D%3D&limit=100&before=2.462251226894&category=5562b415e4b00c57d9b94ac8"
        let body = void 0;
        let options = {
            host: "http://timeline-merger-ms.juejin.im",
            path: "/v1/get_entry_by_rank?src=web&uid=59abbfed6fb9a02484494763&device_id=1553261477587&token=eyJhY2Nlc3NfdG9rZW4iOiJMdlg3NzlGaDJDMWNtZE1yIiwicmVmcmVzaF90b2tlbiI6IlM3ZkE1VUxxSUJKNUdRakYiLCJ0b2tlbl90eXBlIjoibWFjIiwiZXhwaXJlX2luIjoyNTkyMDAwfQ%3D%3D&limit=100&before=2.462251226894&category=5562b415e4b00c57d9b94ac8",
            method: 'GET',
            post: 80,
        }
        return new Promise((resolve, reject) => {
            http.get(url, function (res) {
                res.setEncoding('utf8');  
                res.on("data", (data) => {
                    body+=data;
                }).on("end", () => {
                    resolve(body);
                })
            }).on("error", (e) => {
                reject(e)
            }).end();
        })
        
       
    }
}
module.exports = GetOuterDataFun