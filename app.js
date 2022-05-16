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
    };
  },

  methods: {
    attack() {
      this.monsterHP -= randomNumber(5, 10);
      this.receiveDamage();
      this.round++;
      console.log("round", this.round);
    },

    receiveDamage() {
      this.playerHP -= randomNumber(8, 13);
    },

    specialAttack() {
      this.monsterHP -= randomNumber(10, 20);
      this.receiveDamage();
      this.round++;
      console.log("round", this.round);
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
}).mount("#game");
