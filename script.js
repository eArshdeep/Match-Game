Vue.component("card", {
  props: ["card"],

  template: `<div v-on:click='revealCard(card)' class='col card-panel s4 tile valign-wrapper'>
      <p :class="[!card.visible ? 'hide' : '', 'tile-number']"> {{ card.value }} </p>
    </div>
    `,

  methods: {
    revealCard: function(card) {
      if (card.matched === false) {
        app.flipped_cards.push(card);

        if (app.flipped_cards.length === 1 || app.flipped_cards.length === 2) {
          card.visible = true;
        }

        if (app.flipped_cards.length === 2) {
          app.validateMatch();
        }
      }
    }
  }
})

var app = new Vue({

  el: "#app",

  data: {
    deck: [
      { id: 1, value: 2, visible: false, matched: false, color: "red lighten-2" },
      { id: 2, value: 2, visible: false, matched: false, color: "red lighten-2" },
      { id: 3, value: 3, visible: false, matched: false, color: "purple lighten-2" },
      { id: 4, value: 3, visible: false, matched: false, color: "purple lighten-2" },
      { id: 5, value: 4, visible: false, matched: false, color: "blue lighten-2" },
      { id: 6, value: 4, visible: false, matched: false, color: "blue lighten-2" },
      { id: 7, value: 5, visible: false, matched: false, color: "cyan lighten-2" },
      { id: 8, value: 5, visible: false, matched: false, color: "cyan lighten-2" },
      { id: 9, value: 7, visible: false, matched: false, color: "teal lighten-2" },
      { id: 10, value: 7, visible: false, matched: false, color: "teal lighten-2" },
      { id: 11, value: 8, visible: false, matched: false, color: "lime lighten-1" },
      { id: 12, value: 8, visible: false, matched: false, color: "lime lighten-1" }
    ],
    flipped_cards: []
  },

  methods: {

    shuffle: function(array) {
      for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }

      this.deck = [];
      this.deck = array;
    },

    validateMatch: function() {
      if (this.flipped_cards[0].id !== this.flipped_cards[1].id) { // if cards are not the same
        if (this.flipped_cards[0].value === this.flipped_cards[1].value) { // if cards match
          // set match to true
          this.flipped_cards[0].matched = true;
          this.flipped_cards[1].matched = true;
          // set color
          this.flipped_cards[0].color = "blue-grey lighten-2";
          this.flipped_cards[1].color = "blue-grey lighten-2";
          // clear flipped_cards
          app.flipped_cards = [];
          this.checkForGameWin();
        } else {
          // if mismatch...
          // reset ui
          setTimeout(function() {
            app.flipped_cards[0].visible = false;
            app.flipped_cards[1].visible = false;
            app.flipped_cards = [];
          }, 500);
        }
      } else if (this.flipped_cards[0].id === this.flipped_cards[1].id) { // if cards are same, remove the last one from flipped_cards
        this.flipped_cards.splice(-1, 1);
      }
    },

    checkForGameWin() {
      for (i = 0; i < app.deck.length; i++) {
        if (app.deck[i].matched !== true) { // quit if any card is not matched
          return false;
        }
      }
      $('#modal').modal('open'); // show game win modal
    }
  }
})

// shuffle array
app.shuffle(app.deck);
// initialize modal
$(document).ready(function() {
  $('.modal').modal();
});
