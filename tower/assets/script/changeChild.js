import gameData from './gameData'

cc.Class({
    extends: cc.Component,

    properties: {
    },
    start () {//gameData.currentMapNode
        this.node.on(cc.Node.EventType.TOUCH_START, (e) => {
            // this.node.children[0].removeFromParent()
            if(gameData.currentMapNode) {
                this.node.removeAllChildren()
                let childNode = cc.instantiate(gameData.currentMapNode)
                childNode.x = childNode.y = 0
                this.node.addChild(childNode)
            }
        })
    },
});
