<pre>

# jslib
1.CryptoJS
let str = '111111';
let CryptoJS = require('CryptoJS');
let md5 = CryptoJS.MD5(str).toString();

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
