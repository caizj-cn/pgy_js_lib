cc.Class({
    extends: cc.Component,

    properties: {
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.checkDefault();
    },

    start () {

    },

    checkDefault(){
        if(this._defaultSpf == null){
            this._defaultSpf = this.getComponent(cc.Sprite).spriteFrame;
        }
    },

    /**
     * @description: 获取Url图
     * @param {string} url 路径
     * @param {string} type 图片类型，如:png
     * @return: 
     */
    loadUrl(url, type = null){
        this.checkDefault();
        
        if(url == null || url == ''){
            cc.error('invalid url', url);
            this.getComponent(cc.Sprite).spriteFrame = this._defaultSpf;
            return;
        }

        cc.loader.load(typeof type == 'string'? {url: url, type: type}: url, (err, texture) => {
            if(err != null){
                cc.error(url, err);
                return;
            }

            // 根据默认大小显示
            this.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(texture);
            let size = this._defaultSpf.getOriginalSize();
            this.node.width = size.width;
            this.node.height = size.height;
        });
    },

    // update (dt) {},
});
