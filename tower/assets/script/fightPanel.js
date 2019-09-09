
cc.Class({
    extends: cc.Component,

    properties: {
        heroName: cc.Label,
        heroHP: cc.Label,
        // heroAllHP: cc.Label,
        heroATK: cc.Label,
        heroDEF: cc.Label,
        
        
        enemyName: cc.Label,
        enemyHP: cc.Label,
        enemyATK: cc.Label,
        enemyDEF: cc.Label,

        content: cc.Node,
    },

    start () {
        cc.game.on('game/fight', (d) => {
            if(d.playerInfo) {
                this.heroName.string = d.playerInfo.name
                this.heroHP.string = d.playerInfo.HP
                this.heroATK.string = d.playerInfo.ATK
                this.heroDEF.string = d.playerInfo.DEF
            }
            if(d.fightEnemyInfo) {
                this.enemyName.string = d.fightEnemyInfo.name
                this.enemyHP.string = d.fightEnemyInfo.HP
                this.enemyATK.string = d.fightEnemyInfo.ATK
                this.enemyDEF.string = d.fightEnemyInfo.DEF
            }
            if(d.result === 'success') {
                this.scheduleOnce(() => {
                    this.content.active = false
                },1)
                return
            }
            this.content.active = true
        })
    },
});
