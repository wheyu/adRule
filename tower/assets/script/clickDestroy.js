cc.Class({
    extends: cc.Component,

    properties: {
    },
    start () {
        this.node.on(cc.Node.EventType.TOUCH_START, (e) => {
            this.node.removeFromParent()
            this.onDestroy()
        })
    },
});
