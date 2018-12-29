import Log from 'Log';

const Http = {
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
    post(options){
        Log.log('[###HTTP POST###]', options);
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
    get(options){
        Log.log('[###HTTP GET###]', options);
        return this._doRequest('GET', options);
    },

    /**
     * 执行请求
     *
     * @param {string} method 请求方式, POST/GET
     * @param {object} options 参数
     * @returns
     */
    _doRequest(method = 'GET', options = {}){
        
        let xhr = cc.loader.getXMLHttpRequest();
        xhr.timeout = (options.timeout != null)? options.timeout: 10000;
        
        // 返回
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
                Log.log(xhr.responseText, options);
                if(options.onResp != null && typeof options.onResp == 'function'){
                    options.onResp(xhr.responseText);
                }
            }
        };

        // 超时
        xhr.ontimeout = function(){
            Log.log('http timeout!');
            if(options.timeout != null && typeof options.timeout == 'function'){
                options.onTimeout();
            }
        };

        // 异常
        xhr.onerror = function(){
            Log.log('http error!');
            if(options.onError != null && typeof options.onError == 'function'){
                options.onError();
            }
        };

        
        xhr.open(method, options.url, true);

        if(options.header != null && typeof(options.header) == 'object'){
            for(let key in options.header){
                xhr.setRequestHeader(key, options.header[key]);
            }
        }

        if(method == 'POST' && options.body != null && typeof(options.body) == 'string'){
            xhr.send(options.body);
        }
        else{
            xhr.send();
        }

        return xhr;
    },
};

export default Http;
