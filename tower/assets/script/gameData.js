let allData = null
let enemyActionState = 0
let maps = []
let playerInfo = null
let fightEnemy = null
let fightEnemyInfo = null

let gameData = {
    initData(){
        allData = {
            "00":{
                name:"墙",
                type:"wall",
                lv:0
            },
            "01":{
                name:"路",
                type:"road",
                lv:0
            },
            "02":{
                name:"入口",
                type:"entrance",
                lv:0
            },
            "03":{
                name:"出口",
                type:"exit",
                lv:0
            },
            "10":{
                name:"门",
                type:"door",
                lv:0
            },
            "11":{
                name:"门",
                type:"door",
                lv:1
            },
            "12":{
                name:"门",
                type:"door",
                lv:2
            },
            "13":{
                name:"门",
                type:"door",
                lv:3
            },
            "100":{
                name:"小骷髅",
                type:"enemy",
                HP: 100,
                ATK: 5, 
                DEF: 5,
                lv:0
            },
            "101":{
                name:"骷髅兵",
                type:"enemy",
                HP: 100,
                ATK: 12, 
                DEF: 5,
                lv:0
            },
            "102":{
                name:"骷髅战士",
                type:"enemy",
                HP: 100,
                ATK: 10, 
                DEF: 10,
                lv:0
            },
            "103":{
                name:"骷髅队长",
                type:"enemy",
                HP: 100,
                ATK: 12, 
                DEF: 15,
                lv:0
            },
            "104":{
                name:"小蝙蝠",
                type:"enemy",
                HP: 100,
                ATK: 15, 
                DEF: 5,
                lv:0
            },
            "900":{
                name:"英雄",
                type:"hero",
                HP: 100,
                ATK: 10, 
                DEF: 10,
                lv:0
            },
        }
        playerInfo = JSON.parse(cc.sys.localStorage.getItem('hero'))
        if(!playerInfo) {
            playerInfo = {
                name:'谁啊',
                lv:1,
                HP:100,
                allHP:100,
                DEF:10,
                ATK:10,
                handEquip:[]
            }
            cc.sys.localStorage.setItem('hero', JSON.stringify(playerInfo))
        }
    },
    currentMapNode: null,
    resetMap(){
        let floor1 = {
            name:'第一层',
            floor: 1,
            map:
            ["00","00","00","00","00","00","00","00","00","00","00","00",
            "00","01","01","01","01","01","01","01","01","01","01","00",
            "00","00","00","00","01","01","01","00","00","00","00","00",
            "00","01","01","00","00","01","00","00","01","01","01","00",
            "00","01","01","01","01","01","01","01","01","01","01","00",
            "00","00","00","00","00","00","00","00","00","00","00","00",
            "00","00","00","00","00","00","00","00","00","00","00","00",
            "00","00","00","00","00","00","00","00","00","00","00","00",
            "00","00","00","00","00","00","00","00","00","00","00","00",
            "00","00","00","00","00","00","00","00","00","00","00","00",
            "00","00","00","00","00","00","00","00","00","00","00","00",
            "00","00","00","00","00","00","00","00","00","00","00","00",]
        }
        cc.sys.localStorage.setItem('floor1', JSON.stringify(floor1))
        return floor1
    },
    getData(index = '00'){
        if(!index || !allData[index]) {
            return Object.assign({},allData)
        }
        return Object.assign({},allData[index])
    },
    startEmitEnemyState(){
        setInterval(function(){
            cc.game.emit('enemy/state',enemyActionState)
            // console.log('********** emit ',enemyActionState)
            enemyActionState = (enemyActionState + 1) % 2 
        },500)
    },
    getPlayerInfo(){
        if(!playerInfo) {
            let temp = JSON.parse(cc.sys.localStorage.getItem('hero'))
            if(!temp) {
                temp = {
                    name:'谁啊',
                    lv:1,
                    HP:100,
                    allHP:100,
                    DEF:10,
                    ATK:10,
                    handEquip:[]
                }
            }
            playerInfo = temp
        }
        return playerInfo
    },
    setFightEnemy(enemyNode){
        if(fightEnemy) {
            return
        }
        fightEnemy = enemyNode
        fightEnemyInfo = gameData.getData(enemyNode.name)
        if(!fightEnemyInfo) {
            fightEnemy = null
        }
    },
    fight(enemy){
        setInterval(function(){
            if(fightEnemyInfo) {
                let enemyATK = fightEnemyInfo.ATK
                let enemyDEF = fightEnemyInfo.DEF
                let heroATK = playerInfo.ATK
                let heroDEF = playerInfo.DEF
                fightEnemyInfo.HP -= (heroATK - enemyDEF) > 0 ? heroATK - enemyDEF : 0
                playerInfo.HP -= (enemyATK - heroDEF) > 0 ? enemyATK - heroDEF : 0
                if(playerInfo.HP <= 0) {
                    cc.game.emit('game/fight', {result:'fail', playerInfo, fightEnemyInfo})
                    fightEnemyInfo = null
                    fightEnemy = null
                    return
                }
                if(fightEnemyInfo.HP <= 0) {
                    cc.game.emit('game/fight', {result:'success', playerInfo, fightEnemyInfo})
                    fightEnemyInfo = null
                    fightEnemy = null
                    return
                }
                cc.game.emit('game/fight', {result:'wait', playerInfo, fightEnemyInfo})
            }
        },500)
    },
}

module.exports = gameData

