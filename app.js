function randomNumber(min, max) {
  // function by mozilla
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

Vue.createApp({
  data() {
    return {
      playerHP: 100,
      monsterHP: 100,
      round: 1,
      winner: null,
      playerScore: 0,
      monsterScore: 0,
      battleLog: [],
    };
  },

  methods: {
    attack() {
      const action = randomNumber(5, 13);
      this.monsterHP -= action;
      this.addLog('Player', 'attack', action);
      this.receiveDamage();
    },
    
    receiveDamage() {
      const action = randomNumber(8, 13);
      this.playerHP -= action;
      this.addLog('Monster', 'attack', action);
      this.round++;
    },

    specialAttack() {
      const action = randomNumber(10, 20);
      this.monsterHP -= action;
      this.addLog('Player', 'specialAttack', action);
      this.receiveDamage();
    },

    heal() {
      const action = randomNumber(8, 13);
      this.playerHP += action;

      if (this.playerHP >= 100) {
        this.playerHP = 100;
      }

      this.addLog('Player', 'heal', action);
      this.receiveDamage();
    },

    surrender() {
      this.addLog('Player', 'surrender', null);
      this.winner = "Monster";
      this.monsterScore++;
    },

    addLog(who, what, value) {
      this.battleLog.unshift({
        who,
        what,
        value,
      });
    },

    startGame() {
      this.playerHP = 100;
      this.monsterHP = 100;
      this.round = 1;
      this.winner = null;
    },
  },

  computed: {
    playerHPstyle() {
      if (this.playerHP <= 0) {
        return { width: 0 + "%" };
      }

      return {
        width: this.playerHP + "%",
      };
    },

    monsterHPstyle() {
      if (this.monsterHP <= 0) {
        return { width: 0 + "%" };
      }

      return {
        width: this.monsterHP + "%",
      };
    },
  },

  watch: {
    playerHP(value) {
      if (value <= 0 && this.monsterHP <= 0) {
        this.winner = 'draw';
      }
      
      else if (value <= 0) {
        this.winner = "Monster";
        this.monsterScore++;
      }
    },

    monsterHP(value) {
      if (value <= 0 && this.playerHP <= 0) {
        this.winner = 'draw';
      }

      else if (value <= 0) {
        this.winner = "Player";
        this.playerScore++;
      }
    },

    winner(value) {
      if (value === 'draw') {
        alert(`It's a draw!`);
        console.log('a');
        return this.startGame();
      }
      else if (value === 'Player' || value === 'Monster') {
        alert(value + " wins!");
        console.log('b');
        return this.startGame();
      }
    },
  },
}).mount("#game");
