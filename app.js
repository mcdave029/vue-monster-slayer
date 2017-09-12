new Vue({
  el: '#app',
  data: {
    playerHealth: 100,
    monsterHealth: 100,
    gameIsRunning: false,
    turns: []
  },
  methods: {
    startGame: function() {
      this.gameIsRunning = true;
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.turns = [];
    },
    attack: function() {
      if (this.playerAttacks(3,10)) { return; }
      this.monsterAttacks();
    },
    specialAttack: function() {
      if (this.playerAttacks(10,20)) { return; }
      this.monsterAttacks();
    },
    heal: function() {
      this.playerHealth += (this.playerHealth <= 90 ? 10 : 100-this.playerHealth);
      this.logTurns(true, 'Player heals for 10');
      this.monsterAttacks();
    },
    giveUp: function() {
      this.gameIsRunning = false;
    },
    logTurns: function(isPlayer, text) {
      this.turns.unshift({
        isPlayer: isPlayer,
        text: text
      })
    },
    playerAttacks: function(min, max) {
      var damage = this.calculateDamage(min,max);
      this.monsterHealth -= damage;
      this.logTurns(true, 'Player hits monster for ' + damage);
      return this.checkWin();
    },
    monsterAttacks: function() {
      var damage = this.calculateDamage(5,12);
      this.playerHealth -= damage;
      this.logTurns(false, 'Monster hits player for ' + damage);
      this.checkWin();
    },
    calculateDamage: function(min, max) {
      return Math.max(Math.floor(Math.random() * max) + 1, min)
    },
    checkWin: function() {
      var strPrompt;
      if (this.monsterHealth <= 0) {
        strPrompt = 'You won! New Game?'
      } else if (this.playerHealth <= 0) {
        strPrompt = 'You lost! New Game?'
      }

      if (!strPrompt) { return false }

      confirm(strPrompt) ? this.startGame() : this.gameIsRunning = false;

      return true;
    }
  }
})
