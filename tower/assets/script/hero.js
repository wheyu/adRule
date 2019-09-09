import gameData from './gameData'

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
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, (e) => {
            console.log('*******e.keyCode ',e.keyCode)
            switch(e.keyCode) {
                case cc.macro.KEY.a:
                    this.previewPos.x -= 60
                    break;
                case cc.macro.KEY.d:
                    this.previewPos.x += 60
                    break;
                case cc.macro.KEY.w:
                    this.previewPos.y += 60
                    break;
                case cc.macro.KEY.s:
                    this.previewPos.y -= 60
                    break;
            }
            this.tryMove()
            console.log('******node ',this.node.x,this.node.y)
        })
        cc.game.on('game/fight', (d) => {
            console.log('********  ',d.result)
            console.log('********  ',d.playerInfo && (d.playerInfo.name+'_'+d.playerInfo.HP))
            console.log('********  ',d.fightEnemyInfo && (d.fightEnemyInfo.name+'_'+d.fightEnemyInfo.HP))
        })
    },

    tryMove(){
        if(this.mapsContent.children.some(node => {
            if(Math.abs(this.previewPos.x) >= 390 || Math.abs(this.previewPos.y) >= 390) {
                return true
            }
            let w = node.width + this.node.width
            let h = node.height + this.node.height
            let disX = Math.abs(node.x - this.previewPos.x)
            let disY = Math.abs(node.y - this.previewPos.y)
            if(disX < w / 2 && disY < h / 2 && parseInt(node.name) >= 100){
                console.log('***** meet ', gameData.getData(node.name))
                gameData.setFightEnemy(node)
            }
            if(node.name !== '01' && disX < w / 2 && disY < h / 2){
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
