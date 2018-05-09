<pre>

# jslib
1.CryptoJS</br>
let str = '111111';</br>
let CryptoJS = require('CryptoJS');</br>
let md5 = CryptoJS.MD5(str).toString();</br></br>

2.Http</br>
let Http = require('Http');</br>
let sender = new Http();
sender.get(url, function(msg,sender){
  console.log(msg);
}, this);
sender.post(url, param, function(msg, sender){
  console.log(msg);
}, this);

</pre>
