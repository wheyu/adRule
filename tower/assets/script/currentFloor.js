import gameData from './gameData'

cc.Class({
    extends: cc.Component,

    properties: {
        prefabContent: cc.Node,

        mapContent: cc.Node,

        nullPrefab: cc.Node,

        floorNameLabel: cc.Label,
        floorLabel: cc.Label,


        mapEditPanel: cc.Node,
    },

    showMapEdit(){
        this.mapEditPanel.active = true
    },

    onLoad(){
        gameData.initData()
        gameData.startEmitEnemyState();
        gameData.fight();
    },

    start() {
        cc.game.on('game/loadFloor', (floor) => {
            this.loadData(floor)
            this.init()
        })
    },

    loadData(floor = -1) {
        let floorInfo = `floor${floor}`
        if (floor === -1) {
            floorInfo = 'game/currentFloor'
        }
        //this.floordata = JSON.parse(cc.sys.localStorage.getItem(floorInfo) || cc.sys.localStorage.getItem('floor3'))
        this.floordata = JSON.parse(cc.sys.localStorage.getItem('floor2'))
        if (!this.floordata) {
            this.floordata = gameData.resetMap()
        }
    },

    onEnable() {
        this.loadData(1)
        this.init()
    },

    init() {
        this.mapContent.removeAllChildren()
        for (let i = 0; i < 144; i++) {
            let nullNode = cc.instantiate(this.nullPrefab)
            this.mapContent.addChild(nullNode)
        }
        this.loadFloor()
    },

    loadFloor() {
        if (this.floordata) {
            this.floorLabel.string = this.floordata.floor
            this.floorNameLabel.string = this.floordata.name
            let map = this.floordata.map
            for (let i = 0; i < map.length; i++) {
                let nodeName = map[i] || "00"
                let addPrefab = this.prefabContent.children.find(x => x.name === nodeName)
                this.addChild(addPrefab, i)
            }
        }
    },

    addChild(childNode, index){
        const parentNode = this.mapContent.children[index]
        if(!parentNode) {
            return
        }
        let addNode = cc.instantiate(childNode)
        addNode.x = addNode.y = 0
        console.log('****** map  ', gameData.getData(addNode.name))
        parentNode.name = addNode.name
        parentNode.addChild(addNode)
    },

    saveFloor() {

    },
});
