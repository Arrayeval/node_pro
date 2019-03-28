var http = require("http");
const GetOuterDataFun = {
    // 获取掘金列表数据
    getJuejinData (paramObj) {
        //let url = "http://timeline-merger-ms.juejin.im/v1/get_entry_by_rank?src=web&uid=59abbfed6fb9a02484494763&device_id=1553261477587&token=eyJhY2Nlc3NfdG9rZW4iOiJMdlg3NzlGaDJDMWNtZE1yIiwicmVmcmVzaF90b2tlbiI6IlM3ZkE1VUxxSUJKNUdRakYiLCJ0b2tlbl90eXBlIjoibWFjIiwiZXhwaXJlX2luIjoyNTkyMDAwfQ%3D%3D&limit=100&before=2.462251226894&category=5562b415e4b00c57d9b94ac8"
        //let url = `http://timeline-merger-ms.juejin.im/v1/get_entry_by_rank?src=web&before=595950110943&limit=20&category=all`
        let data = '';
        let paramsStr = ''
        if (paramObj) {
            paramsStr = '?'
            Object.keys(paramObj).forEach((item, index) => {
                paramsStr +=  `${item}=${paramObj[item]}&`
            })
            paramsStr = paramsStr.substr(0, paramsStr.length-1)
        }
        let baseurl = "http://timeline-merger-ms.juejin.im/v1/get_entry_by_rank" + paramsStr
        return new Promise((resolve, reject) => {
            http.get(baseurl, function (res) {
                res.setEncoding('utf8');  
                res.on("data", (chunk) => {
                    data += chunk;
                }).on("end", () => {
                    resolve(JSON.parse(data));
                })
            }).on("error", (e) => {
                reject(e)
            }).end();
        })
    },

    getStockInfo () {

    }
}
module.exports = GetOuterDataFun
// 1）为啥https不能进行访问 https/http的区别
