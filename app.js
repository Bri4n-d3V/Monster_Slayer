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
    };
  },

  methods: {
    attack() {
      this.monsterHP -= randomNumber(5, 10);
      this.receiveDamage();
      this.round++;
    },

    receiveDamage() {
      this.playerHP -= randomNumber(8, 13);
    },

    specialAttack() {
      this.monsterHP -= randomNumber(10, 20);
      this.receiveDamage();
      this.round++;
    },

    heal() {
      this.playerHP += randomNumber(15, 25);
      if(this.playerHP >= 100) return this.playerHP = 100;
      this.receiveDamage();
      this.round++;
    }
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
      if (value <= 0) {
        this.winner = "Monster";
      }
    },

    monsterHP(value) {
      if (value <= 0) {
        this.winner = "Player";
      }
    },

    winner(value) {
      if (value) {
        alert(value + " wins!");
        this.playerHP = 100;
        this.monsterHP = 100;
        this.round = 1;
        this.winner = null;
      }
    }
  }
}).mount("#game");
