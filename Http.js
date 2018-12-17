var Log = require("Log");

var Http = {
    /**
     * post请求
     *
     * @options {object} 
     * {
     *   url:(string)地址,
     *   timeout:(number)超时时间,
     *   header:(object)参数,
     *   body:(string)参数,
     *   onResp:(function)响应回调,
     *   onTimeout:(function)超时回调,
     *   onError:(function)错误回调
     * }
     * @returns
     */
    post: function(options){
        Log.log("[###HTTP POST###]", options);
        return this._doRequest('POST', options);
    },

    /**
     * get请求
     *
     * @options {object} 
     * {
     *   url:(string)地址,
     *   timeout:(number)超时时间,
     *   header:(object)参数,
     *   onResp:(function)响应回调,
     *   onTimeout:(function)超时回调,
     *   onError:(function)错误回调
     * }
     * @returns
     */
    get: function(options){
        Log.log("[###HTTP GET###]", options);
        return this._doRequest('GET', options);
    },

    /**
     * 执行请求
     *
     * @param {string} method 请求方式, POST/GET
     * @param {object} options 参数
     * @returns
     */
    _doRequest: function(method, options){
        // 合法性检查
        if(method == null || typeof method != "string"){
            return  false;
        }

        if(!(method == "POST" || method == "GET")){
            return false;
        }

        let xhr = cc.loader.getXMLHttpRequest();
        if(options.timeout != null && typeof options.timeout == "number"){
            xhr.timeout = options.timeout;
        }
        else{
            xhr.timeout = 10000;
        }
        
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
                Log.log("http status " + xhr.status);
                if(options.onResp != null && typeof options.onResp == "function"){
                    options.onResp(xhr.responseText);
                }
            }
        };

        xhr.ontimeout = function(){
            Log.log("http timeout!");
            if(options.timeout != null && typeof options.timeout == "function"){
                options.onTimeout();
            }
        };

        xhr.onerror = function(){
            Log.log("http error!");
            if(options.onError != null && typeof options.onError == "function"){
                options.onError();
            }
        };

        
        xhr.open(method, options.url, true);

        if(options.header != null && typeof(options.header) == "object"){
            for(let key in options.header){
                xhr.setRequestHeader(key, options.header[key]);
            }
        }

        if(method == 'POST' && options.body != null && typeof(options.body) == "string"){
            xhr.send(options.body);
        }
        else{
            xhr.send();
        }

        return xhr;
    },
};

module.exports = Http;
