var http = require('http');
var crypto = require('crypto');

var interval = 1000;

var androidAppKey = "";
var androidAppSecret = "";

var iOSAppKey = "";
var iOSAppSecret = "";

var Method = "POST";
var Url = "http://msg.umeng.com/api/send";

// 定时逻辑
function push_logic(){
    var msg = getPushMsg();

    if(msg != null && msg.title != null && msg.content != null){
        umeng_push(msg.title, msg.content);
    }
    // if(isPushTime()){
    //     umeng_push();
    // }
}

// 获取推送信息
function getPushMsg(){
    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var date = now.getDate();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();

    var str = year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
    console.log(str);
    var msg = null;

    if(hour == 10 && minute == 0){
        msg = {};
        msg.title = "标题";
        msg.content = "内容";
    }

    if(hour == 16 && minute == 0){
        msg = {};
        msg.title = "标题";
        msg.content = "内容!";
    }

    if(hour == 20 && minute == 0){
        msg = {};
        msg.title = "标题";
        msg.content = "内容!";
    }

    if(hour == 20 && minute == 25){
        msg = {};
        msg.title = "标题";
        msg.content = "内容!";
    }

    return msg;
}

// 获取推送信息
function isPushTime(){
    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var date = now.getDate();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();

    var str = year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
    console.log(str);

    if(hour == 10 && minute == 0){
        return true;
    }

    if(hour == 14 && minute == 0){
        return true;
    }

    if(hour == 20 && minute == 0){
        return true;
    }

    if(hour == 20 && minute == 20){
        return true;
    }

    return false;
}

// 友盟推送
function umeng_push(title, content){
    var aBody = generate_android_body("描述", title, content);
    var iBody = generate_iOS_body("描述", title, content);
    console.log("###############################################################################################");
    console.log("[android body]" + aBody);
    console.log("[iOS body]" + iBody);
    console.log("###############################################################################################");
    var aSign = generate_sign(aBody, androidAppSecret);
    var iSign = generate_sign(iBody, iOSAppSecret);
    console.log("[android sign]" + aSign);
    console.log("[iOS sign]" + iSign);

    post_umeng(aSign, aBody);
    post_umeng(iSign, iBody);
}

// 获取内容-android
function generate_android_body(description, title, text){
    var body = {};

    body.description = description;
    body.production_mode = true;
    body.appkey = androidAppKey;

    body.payload = {};
    body.payload.body = {};

    body.payload.body.title = title;
    body.payload.body.ticker = "";
    body.payload.body.text = text;

    body.payload.body.after_open = "go_app";
    body.payload.body.play_vibrate = false;
    body.payload.body.play_lights = false;
    body.payload.body.play_sound = true;
    body.payload.display_type = "notification";

    body.type = "broadcast";
    body.timestamp = new Date().getTime();

    return JSON.stringify(body);
}

// 获取内容-iOS
function generate_iOS_body(description, title, text){
    var body = {};

    body.description = description;
    body.production_mode = true;
    body.appkey = iOSAppKey;

    body.payload = {};
    body.payload.aps = {};

    body.payload.aps.alert = {};
    body.payload.aps.alert.title = title;
    body.payload.aps.alert.subtitle = "";
    body.payload.aps.alert.body = text;

    body.payload.sound = "default";

    body.type = "broadcast";
    body.timestamp = new Date().getTime();

    return JSON.stringify(body);
}

// 获取签名 MD5($http_method$url$post-body$app_master_secret)
function generate_sign(body, AppSecret){
    var md5 = crypto.createHash('md5');
    return md5.update(Method + Url + body + AppSecret).digest('hex').toLowerCase();
}

// 执行post请求
function post_umeng(mysign, body){
    var contents = body;
    var umeng_path = "/api/send?sign=" + mysign;
    
    var options = {
        host:'msg.umeng.com',
        path: umeng_path,
        method:'POST',
        json: true,
        headers:{
            'Content-Type':'application/json'
        }
    }

     req = http.request(options, function(res){
        res.setEncoding('utf8');
        res.on('data',function(data){
            console.log("data:",data);
        });
    });

    req.write(contents);
    
    req.end();
}

console.log("系统启动！！！");

setInterval(push_logic, 60000);