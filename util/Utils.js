import CryptoJS from 'CryptoJS';
import Log from 'Log';

const Utils = {
    MD5(data = ''){
        return CryptoJS.MD5(data).toString();
    },

    AESEncrypt(data = '', key, iv){
        let cryptokey = CryptoJS.enc.Utf8.parse(key);
        let cryptoiv  = CryptoJS.enc.Utf8.parse(iv);
        return CryptoJS.AES.encrypt(data, cryptokey, {iv: cryptoiv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.ZeroPadding}).toString();
    },

    AESDecrypt(data = '', key, iv){
        let cryptokey  = CryptoJS.enc.Utf8.parse(key);
        let cryptoiv   = CryptoJS.enc.Utf8.parse(iv);
        return CryptoJS.AES.decrypt(data, cryptokey, {iv: cryptoiv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.ZeroPadding}).toString(CryptoJS.enc.Utf8);
    },

    /**
     * 获取随机整数
     *
     * @param {number} min - 最小整数
     * @param {number} max - 最大整数
     * @returns [min, max]之间随机整数
     */
    getRandomNum(min, max){
        return Math.floor(Math.random()*(max - min + 1) + min);
    },

    /**
     * 获取制定长度的数字，不足的0补齐
     *
     * @param {number} num  数字
     * @param {number} length 保留位数
     * @returns 长度为length的数字
     */
    PrefixInteger(num, length) {  
        return (Array(length).join('0') + num).slice(-length);
    },

    /**
     * 时间戳转换成显示格式
     *
     * @param {number} timestamp
     * @returns YYYY/MM/DD
     */
    timestamp2YMD(timestamp){    
        let date = new Date(timestamp);

        let year = this.PrefixInteger(date.getFullYear(), 4);
        let month = this.PrefixInteger((date.getMonth() + 1), 2);
        let day = this.PrefixInteger(date.getDate(), 2);

        return `${year}/${month}/${day}`;
    },

    /**
     * 获取当前时间戳（秒）
     *
     * @returns
     */
    getCurrentTime() {
        return parseInt(new Date().getTime() / 1000);
    },

    /**
     * 获取当前时间戳（毫秒）
     *
     * @returns
     */
    getCurrentMT() {
        return new Date().getTime();
    },

    /**
     * 时间戳转换成显示格式
     *
     * @param {number} timestamp
     * @returns YYYY-MM-DD hh:mm:ss
     */
    timestamp2YMDHMS(timestamp){    
        let date = new Date(timestamp);
        let year = this.PrefixInteger(date.getFullYear(), 4);
        let month = this.PrefixInteger((date.getMonth() + 1), 2);
        let day = this.PrefixInteger(date.getDate(), 2);
        let hour = this.PrefixInteger(date.getHours(), 2);
        let minute = this.PrefixInteger(date.getMinutes(), 2);
        let second = this.PrefixInteger(date.getSeconds(), 2);

        return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
    },

    /**
     * 秒转换成时分秒显示
     *
     * @param {number} time
     * @returns dd hh:mm:ss
     */
    second2HMS(time){
        let day = this.PrefixInteger(Math.floor(time / (3600 * 24)), 2);
        time = time % (3600 * 24);
        
        let hour = this.PrefixInteger(Math.floor(time / 3600), 2);
        time = time % 3600;
        
        let minute = this.PrefixInteger(Math.floor(time / 60),2);
        time = time % 60;
        
        let second = this.PrefixInteger(time, 2);

        return `${day}天 ${hour}时 ${minute}分 ${second}秒`;
    },

    /**
     * 按照Key值得字母顺序组装参数 如：{b:2, a:1} =>a=1&b=2
     *
     * @param {object} 参数
     * @returns
     */
    object2SortQuery(obj = {}){
        let keys = Object.keys(obj).sort();

        let str = '';
        for(let i = 0; i < keys.length; i++){
            str = str + keys[i] + "=" + obj[keys[i]];
            if(i != keys.length - 1){
                str += '&';
            }
        }

        return str;
    },

    /**
     * a=1&b=2 ==> {a:1, b:2}
     *
     * @param {string} query - 入口参数
     * @returns
     */
    
    queryToObject(query = ''){
        let obj = {};
        if(query == ''){
            return obj;
        }
        let querys = query.split('&');
        for(let i = 0; i < querys.length; i++){
            let str = querys[i].split('=');
            obj[str[0]] = str[1];
        }
        return obj;
    },

    /**
     *  获取入口参数
     *
     * @returns
     */
    getQuery() {
        var query = window.location.search.substring(1);
        return (query != null)? query: '';
    },

    /**
     * 根据预制名称添加节点
     *
     * @param {string} name 节点名称
     * @param {string} prefab 预制
     * @param {number} zIndex 层级
     * @param {function(cc.Node)} callback 添加完回调
     */
    addPrefab(name = '', prefab = '', zIndex = 100, callback){
        if(name == ''){
            return false;
        }

        if(prefab == ''){
            return false;
        }

        if(cc.director.getScene().getChildByName(name) != null){
            Log.error(`${name} exist!`);
            return false;
        }

        cc.loader.loadRes(prefab, function (err, _prefab) {
            var node = cc.instantiate(_prefab);
            if(node == null){
                Log.error(err);
                return;
            }
            node.x = cc.winSize.width / 2;
            node.y = cc.winSize.height / 2;
            cc.director.getScene().addChild(node, zIndex, name);

            if(callback != null && typeof callback == "function"){
                callback(node);
            }
        });
    },

    /**
     * 根据名称移除节点
     *
     * @param {string} name 节点名称
     */
    removeChildByName(name = ''){
        let child = cc.director.getScene().getChildByName(name);
        if(child != null){
            child.removeFromParent();
            return true;
        }

        return false;
    },
};

export default Utils;
