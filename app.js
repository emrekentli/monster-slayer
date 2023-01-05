function getRandomValue(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
const app = Vue.createApp({
    data() {
        return {
            playerHealth: 100,
            monsterHealth: 100,
            currentRound: 0,
            specialAttackCounter: 3,
            healCounter: 2,
            winner: null,
            logMessages:[]
        };
    },
    computed: {
        monsterBarStyles() {
            if (this.monsterHealth < 0)
                return { width: '0%' };
            return { width: this.monsterHealth + '%' };
        },
        playerBarStyles() {
            if (this.playerHealth <= 0)
            return { width: '0%' };
            return { width: this.playerHealth + '%' };
        },
        mayUseSpecialAttack() {
            return this.specialAttackCounter < 3;
        },
        mayUseHeal() {
            return this.healCounter < 2;
        }
    },
    watch: {
        playerHealth(value) {
            if (value <= 0 && this.monsterHealth <= 0) {
                this.winner = 'draw';
            }
            else if (value <= 0) {
                this.winner = "monster";
            }
        },
        monsterHealth(value) {
            if (value <= 0 && this.playerHealth <= 0) {
                this.winner = 'draw';
            }
            else if (value <= 0) {
                this.winner = "player";
            }
        }
    },
    methods:
    {
        surrender(){
            this.playerHealth=0;
        },
        startGame(){
           this.playerHealth= 100;
          this.monsterHealth= 100;
          this.currentRound= 0;
          this.specialAttackCounter= 3;
          this.healCounter= 2;
          this.winner= null;
          this.logMessages = [];
        },
        attackMonster() {
            const attackValue = getRandomValue(5, 12);
            this.monsterHealth -= attackValue;
            this.addLogMessages('player','attack',attackValue);
            this.attackPlayer();
        },
        attackPlayer() {
            const attackValue = getRandomValue(8, 15);
            this.playerHealth -= attackValue;
            this.addLogMessages('monster','attack',attackValue);
            this.currentRound++;
            this.specialAttackCounter++;
            this.healCounter++;
        },
        specialAttackMonster() {
            const attackValue = getRandomValue(10, 25);
            this.monsterHealth -= attackValue;
            this.addLogMessages('player','attack',attackValue);
            this.attackPlayer();
            this.specialAttackCounter = 0;
        },
        healPlayer() {
            this.attackPlayer();
            const healValue = getRandomValue(8, 20);
            if (this.playerHealth + healValue > 100) {
                this.playerHealth = 100;
            }
            else {
                this.playerHealth += healValue;
            }
            this.addLogMessages('player','heal',healValue);
            this.healCounter = 0;
        },
        addLogMessages(who,what,value){
            this.logMessages.unshift({
                actionBy:who,
                actionType:what,
                actionValue:value
            });
        }

    }
});
app.mount("#game");