import gameData from './gameData'

cc.Class({
    extends: cc.Component,

    properties: {
        prefabContent: cc.Node,

        mapContent: cc.Node,

        floorEditBox: cc.EditBox,
        floorNameEditBox: cc.EditBox,

        nullPrefab: cc.Node,
    },

    init(){
        for(let i = 0; i < 144; i ++) {
            let nullNode = cc.instantiate(this.nullPrefab)
            nullNode.addComponent('changeChild')
            this.mapContent.addChild(nullNode)
        }
        // gameData.startEmitEnemyState()
    },

    start () {
        // gameData.resetMap()
        this.init()
        this.prefabContent.children.forEach(prefab => {
            prefab.on(cc.Node.EventType.TOUCH_START,(e)=>{
                // this.addChild(e.target)
                gameData.currentMapNode = e.target
            })
        })
    },

    loadFloorMaps(){
        this.mapContent.removeAllChildren()
        let loadFloor = this.floorEditBox.string ? `floor${this.floorEditBox.string}` : 'floor1'
        let floor1Data = JSON.parse(cc.sys.localStorage.getItem(loadFloor))
        this.floorEditBox.string = floor1Data.floor
        this.floorNameEditBox.string = floor1Data.name
        let map = floor1Data.map
        for(let i = 0; i < map.length; i++){
            let nodeName = map[i] || "00"
            let addPrefab = this.prefabContent.children.find(x => x.name === nodeName)
            this.addChild(addPrefab, 'changeChild')
        }
    },

    addChild(node, addComponentName = ''){
        let parent = cc.instantiate(this.nullPrefab)
        if(addComponentName) {
            parent.addComponent(addComponentName)
        }
        let addNode = cc.instantiate(node)
        addNode.x = addNode.y = 0
        parent.addChild(addNode)
        this.mapContent.addChild(parent)
    },

    saveFloorMaps(){
        if(!this.floorEditBox.string) {
            return
        }
        if(!this.floorNameEditBox.string) {
            return
        }
        if(this.mapContent.children.some(x => !x.children[0])) {
            return
        }
        let map = []
        this.mapContent.children.forEach(node => {
            map.push(node.children[0].name)
        })

        let floor = parseInt(this.floorEditBox.string)
        let floorInfo = {
            name: this.floorNameEditBox.string,
            floor,
            map
        }

        cc.sys.localStorage.setItem(`floor${floor}`,JSON.stringify(floorInfo))
    },

    //撤销
    revoke(){
        let contentChildrens = this.mapContent.children
        let destroyNode = contentChildrens[contentChildrens.length - 1]
        if(!destroyNode) {
            return
        }
        destroyNode.destroy()
        destroyNode.removeFromParent()
    },

    close(){
        this.node.active = false
    },
});
