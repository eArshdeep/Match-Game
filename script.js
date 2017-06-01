Vue.component("card", {
  props: ["value"],

  template:
    `<div v-on:click='revealCard(value)' class='col card-panel s4 tile valign-wrapper'>
      <p :class="[!value.visible ? 'hide' : '', 'tile-number']"> {{ value.value }} </p>
    </div>
    `,

    methods: {
      revealCard: function(value){
        // set visible to true
        value.visible = true;
        app.selected_pair.push(value);
      }
    }
})

var app = new Vue({

  el: "#app",

  data: {
    value_set: [
      { id : 1, value: 2, visible: false, matched: false, color: "red lighten-2"},
      { id : 2, value: 2, visible: false, matched: false, color: "red lighten-2"},
      { id : 3, value: 3, visible: false, matched: false, color: "purple lighten-2"},
      { id : 4, value: 3, visible: false, matched: false, color: "purple lighten-2"},
      { id : 5, value: 4, visible: false, matched: false, color: "blue lighten-2"},
      { id : 6, value: 4, visible: false, matched: false, color: "blue lighten-2"},
      { id : 7, value: 5, visible: false, matched: false, color: "cyan lighten-2"},
      { id : 8, value: 5, visible: false, matched: false, color: "cyan lighten-2"},
      { id : 9, value: 7, visible: false, matched: false, color: "teal lighten-2"},
      { id : 10, value: 7, visible: false, matched: false, color: "teal lighten-2"},
      { id : 11, value: 8, visible: false, matched: false, color: "lime lighten-1"},
      { id : 12, value: 8, visible: false, matched: false, color: "lime lighten-1"}
    ],
    selected_pair: []
  },

  methods: {
    shuffle: function(array){
      for (var i = array.length - 1; i > 0; i--) {
              var j = Math.floor(Math.random() * (i + 1));
              var temp = array[i];
              array[i] = array[j];
              array[j] = temp;
          }

          this.value_set = [];
          this.value_set = array;
    },

    validateMatch: function(){
      if(this.selected_pair[0].value === this.selected_pair[1].value){
        // alert for match
        alert("match");
      } else {
        // reset ui
        setTimeout(function(){
          app.selected_pair[0].visible = false;
          app.selected_pair[1].visible = false;
          app.selected_pair = [];
        }, 1000);
      }
    }
  },

  watch: {
    selected_pair(){
      if(this.selected_pair.length === 2) {
        app.validateMatch();
      }
    }
  }
})

app.shuffle(app.value_set);
