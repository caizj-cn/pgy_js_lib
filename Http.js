// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    test(){
        // get
        let url1 = '';
        this.get(url1, function(msg, sender){
            cc.log('[***GET***]' + msg);
        }, this);

        // post
        let url2 = '';
        let param = 'name=user&pass=1111';

        this.post(url2, param, function(msg, sender){
            cc.log('[***POST***]' + msg);
        }, this);
    },

    /*
     * url:请求地址
     * param:请求参数
     * callback:请求结束后回调
     * sender:请求者
     */
    post(url, param, callback, sender){
        return this._doRequest('POST', url, param, callback, sender);
    },

    /*
     * url:请求地址
     * callback:请求结束后回调
     * sender:请求者
     */
    get(url, callback, sender){
        return this._doRequest('GET', url, null, callback, sender);
    },

    _doRequest(method, url, param, callback, sender){
        let xhr = cc.loader.getXMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && (xhr.status >= 200 && xhr.status < 400)) {
                let response = xhr.responseText;
                if(callback != null){
                    callback(response, sender);
                }
            }
        };

        xhr.open(method, url, true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;");

        if(method == 'POST' && param != null){
            xhr.send(param);
        }
        else{
            xhr.send();
        }

        return xhr;
    },

    // update (dt) {},
});
