
cc.Class({
    extends: cc.Component,

    properties: {
        actionPic:[cc.Node],
        
    },

    start () {
        this.allPic = this.actionPic.length
        this.currentIndex = 0
    },

    onEnable(){
        cc.game.on('enemy/state', (state) => {
            this.currentIndex = state
            this.showActionPic()
        })
    },

    onDisable(){
    },

    showActionPic(){
        for(let i = 0; i < this.allPic; i++){
            this.actionPic[i].active = i === this.currentIndex
        }
        if(this.currentIndex >= this.allPic){
            this.currentIndex = 0
        }
    },

    update (dt) {
    },
});
