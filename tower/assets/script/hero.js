
cc.Class({
    extends: cc.Component,

    properties: {
        mapNode: cc.Node,
        mapsContent: cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        let manager = cc.director.getCollisionManager();
        manager.enabled = true;
        manager.enabledDebugDraw = true
    },

    start () {
        this.previewPos = this.node.getPosition()
        console.log('***** this.previewPos ',this.previewPos)
        // this.mapNode.on(cc.Node.EventType.TOUCH_MOVE,(e) => {
        //     let t_v2 = this.mapNode.convertToNodeSpace(e.getLocation())
        //     this.node.x = t_v2.x - 360
        //     this.node.y = t_v2.y - 360
        // })
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, (e) => {
            console.log('*******e.keyCode ',e.keyCode)
            switch(e.keyCode) {
                case cc.macro.KEY.a:
                    // this.node.x -= 10;
                    this.previewPos.x -= 72
                    break;
                case cc.macro.KEY.d:
                    // this.node.x += 10;
                    this.previewPos.x += 72
                    break;
                case cc.macro.KEY.w:
                    // this.node.y += 10;
                    this.previewPos.y += 72
                    break;
                case cc.macro.KEY.s:
                    // this.node.y -= 10;
                    this.previewPos.y -= 72
                    break;
            }
            this.tryMove()
            console.log('******node ',this.node.x,this.node.y)
        })
        cc.sys.localStorage.setItem('hero',JSON.stringify({
            "name":"mz",
            "hp":50,
            "mp":60
        }))
        let map1 = {floor:1, name:'第一层', map:['00']}
    },

    tryMove(){
        if(this.mapsContent.children.some(node => {
            let w = node.width + this.node.width
            let h = node.height + this.node.height
            let disX = Math.abs(node.x - this.previewPos.x)
            let disY = Math.abs(node.y - this.previewPos.y)
            if(node.name !== '1' && disX < w / 2 && disY < h / 2){
                return true
            }
            return  false
        })){
            this.previewPos = this.node.getPosition()
            return false
        }
        this.node.setPosition(this.previewPos)
    },

    onCollisionEnter: function(other, self) {
        console.log('*****  t  ')
    }

    // update (dt) {},
});
