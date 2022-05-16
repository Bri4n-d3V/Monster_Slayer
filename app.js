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
    };
  },

  methods: {
    attack() {
      this.monsterHP -= randomNumber(5, 10);
      console.log('MonsterHP', this.monsterHP);
      this.receiveDamage();
    },

    receiveDamage() {
      this.playerHP -= randomNumber(8, 13);
      console.log('PlayerHP',this.playerHP);
    },
  },

  computed: {
    playerHPstyle() {
      return {
        width: this.playerHP + '%',
      };
    },

    monsterHPstyle() {
      return {
        width: this.monsterHP + '%',
      };
    }
  }
}).mount("#game");
