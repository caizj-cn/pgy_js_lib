//CryptoJS
let CryptoJS = require('CryptoJS');
// MD5
let md5 = CryptoJS.MD5("welcome").toString();

// AES方式一
// 加密
let str = CryptoJS.AES.encrypt(data, key, 256).toString();
// 解密
let str = CryptoJS.AES.decrypt(data, key, 256);        
str = str.toString(CryptoJS.enc.Utf8).toString();

// AES方式二(与java通讯，java需设置padding:CryptoJS.pad.NoPadding
// 加密
var key  = CryptoJS.enc.Utf8.parse(this.key);
var iv   = CryptoJS.enc.Utf8.parse(this.iv);
var str = CryptoJS.AES.encrypt(
            data,
            key, 
            {iv : iv, mode : CryptoJS.mode.CBC, padding: CryptoJS.pad.ZeroPadding}
        ).toString();

// 解密
var key  = CryptoJS.enc.Utf8.parse(this.key);
var iv   = CryptoJS.enc.Utf8.parse(this.iv);
var str = CryptoJS.AES.decrypt(
            encrypted_data,
            key, 
            {iv : iv, mode : CryptoJS.mode.CBC, padding: CryptoJS.pad.ZeroPadding}
        ).toString(CryptoJS.enc.Utf8);
        

// TextDecoder
let value = new TextDecoder("gbk").decode(new Uint8Array(stream.slice(start, end)));

// Http
let Http = require('Http');
let sender = new Http();
sender.get(url, function(msg,sender){
  console.log(msg);
}, this);
sender.post(url, param, function(msg, sender){
  console.log(msg);
}, this);