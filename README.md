<pre>

# jslib
1.CryptoJS
let CryptoJS = require('CryptoJS');
// MD5
let md5 = CryptoJS.MD5("welcome").toString();
// AES加密
let str = CryptoJS.AES.encrypt(data, key, 256).toString();
// AES解密
let str = CryptoJS.AES.decrypt(data, key, 256);        
str = str.toString(CryptoJS.enc.Utf8).toString();

2.TextDecoder
let value = new TextDecoder("gbk").decode(new Uint8Array(stream.slice(start, end)));

3.Http
let Http = require('Http');
let sender = new Http();
sender.get(url, function(msg,sender){
  console.log(msg);
}, this);
sender.post(url, param, function(msg, sender){
  console.log(msg);
}, this);

</pre>
