import Log from 'Log';

cc.Class({
    extends: cc.Component,

    properties: {
        spriteImage: cc.Sprite,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },


    /**
     * 去url上拉取图片（服务端需要做跨域处理）
     *
     * @param {*} url
     * @returns
     */
    loadUrl(url){
        if(!url.endsWith('.jpg') && !url.endsWith('.png')){
            Log.error('url error', url);
            return;
        }

        cc.loader.load(url, (err, texture) => {
            if(err != null){
                Log.error(url, err);
                return;
            }

            let width = this.spriteImage.node.width;
            let height = this.spriteImage.node.height;

            this.spriteImage.spriteFrame = new cc.SpriteFrame(texture);
            this.spriteImage.node.width = width;
            this.spriteImage.node.height = height;
        });
    },

    // update (dt) {},
});
