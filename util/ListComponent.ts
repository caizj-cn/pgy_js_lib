/*
 * @Copyright: Copyright (c) 2019
 * @Author: caizhijun
 * @Version: 1.0
 * @Date: 2019-08-15 14:29:42
 */
// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class ListComponent extends cc.Component {
    @property(cc.Prefab)
    prefabUnit: cc.Prefab = null;

    @property
    UnitComName: string = '';

    private mData: Array<any> = [];
    private mUnitHeight: number = 0;
    private mMaxCount: number = 0;
    private mCells: Array<any> = [];
    private mIdx: number = 0;
    private mOnBounceBottomCallback: any = null;
    private mOnUnitClickCallback: any = null;
    private mInited: boolean = false;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    // update (dt) {}

    reloadData(data: Array<any>){
        this.mData = data;
    }

    reloadUI(){
        if(!this.mInited){
            this.initScrollView();
            this.addPrefab();
            this.mInited = true;
        }

        this.reload();
    }

    setOnBounceBottomCallback(callback: any){
        this.mOnBounceBottomCallback = callback;
    }

    setUnitClickCallback(callback: any){
        this.mOnUnitClickCallback = callback;
    }

    initScrollView(){
        if(this.prefabUnit == null){
            return;
        }

        let scrollView = this.node.getComponent(cc.ScrollView);
        if(scrollView == null){
            return;
        }
        
        scrollView.inertia = false;

        this.mUnitHeight = this.prefabUnit.data.height;
        this.mMaxCount = Math.floor(scrollView.node.height / this.mUnitHeight) + 2;

        if(this.mData.length > this.mMaxCount){
            scrollView.content.height = this.mMaxCount * this.mUnitHeight;
        }else{
            scrollView.content.height = this.mData.length * this.mUnitHeight;
        }

        scrollView.node.on("scrolling", this.onScrolling, this);
        scrollView.node.on("bounce-bottom", this.onBounceBottom, this);
        scrollView.scrollToTop(0);
    }

    addPrefab(){
        let scrollView = this.node.getComponent(cc.ScrollView);
        if(scrollView == null){
            return;
        }

        this.mCells = [];
        scrollView.content.removeAllChildren();
        for(let i = 0; i < this.mMaxCount; i++){
            let node = cc.instantiate(this.prefabUnit);            
            scrollView.content.addChild(node);
            node.x = node.width * (node.anchorX - 0.5);
            node.y = -node.height * (1 - node.anchorY) - node.height * i;
            this.mCells.push(node);

            let js = node.getComponent(this.UnitComName);
            if(js != null && js.registClickCallback != null){
                js.registClickCallback((idx, node) => {
                    this.onUnitClick(idx, node)
                });
            }
        }
    }

    onUnitClick(idx:number, node: cc.Node){
        if(this.mOnUnitClickCallback != null){
            this.mOnUnitClickCallback(idx, node);
        }
    }

    onScrolling(event){
        let offset = event.getScrollOffset();

        if(offset.y <= 0 && this.mIdx > 0){
            // 上移一格
            offset.y += this.mUnitHeight;
            event.scrollToOffset(offset);

            // 更新数据
            this.mIdx--;
            this.reload();
        }
        else if(offset.y >= event.getMaxScrollOffset().y && (this.mIdx < this.mData.length - this.mMaxCount)){
            // 下移一格
            offset.y -= this.mUnitHeight;
            event.scrollToOffset(offset);

            // 更新数据            
            this.mIdx++;
            this.reload();

            if(this.mIdx == this.mData.length - this.mMaxCount - 1){
                this.onBounceBottom(null);
            }
        }
    }

    onBounceBottom(event){
        if(this.mOnBounceBottomCallback != null){
            this.mOnBounceBottomCallback();
        }
    }

    reload(){
        for(let i = 0; i < this.mCells.length; i++){
            this.mCells[i].active = (i < this.mData.length);
            this.reloadCell(this.mIdx + i, this.mCells[i]);
        }
    }

    reloadCell(idx, scrollViewCell){
        if(idx < 0 || idx >= this.mData.length){
            return;
        }

        if(scrollViewCell == null || this.UnitComName == ''){
            return;
        }

        let UnitCom = scrollViewCell.getComponent(this.UnitComName);
        if(UnitCom != null && UnitCom.reloadUI != null){
            UnitCom.reloadUI(this.mData[idx]);
            scrollViewCell.attr({_idx_: idx});
        }
    }
}
