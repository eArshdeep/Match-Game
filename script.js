Vue.component("card", {
  props: ["value"],

  template:
    `<div v-on:click='revealCard(value)' class='col card-panel s4 tile valign-wrapper'>
      <p :class="[!value.visible ? 'hide' : '', 'tile-number']"> {{ value.value }} </p>
    </div>
    `,

    methods: {
      revealCard: function(value){
        if(value.matched === false){
          app.selected_pair.push(value);

          if(app.selected_pair.length===1 || app.selected_pair.length===2){
            value.visible = true;
          }
          if(app.selected_pair.length === 2){
            app.validateMatch();
          }
        }
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
      if(this.selected_pair[0].id !== this.selected_pair[1].id){
        if(this.selected_pair[0].value === this.selected_pair[1].value){
          this.selected_pair[0].matched = true;
          this.selected_pair[1].matched = true;
          // set color
          this.selected_pair[0].color = "blue-grey lighten-2";
          this.selected_pair[1].color = "blue-grey lighten-2";
          // clear selected_pair
          app.selected_pair = [];
          this.checkForGameWin();
        } else {
          // if mismatch...
          // reset ui
          setTimeout(function(){
          app.selected_pair[0].visible = false;
          app.selected_pair[1].visible = false;
          app.selected_pair = [];
          }, 500);
        }
      } else if (this.selected_pair[0].id === this.selected_pair[1].id){
        this.selected_pair.splice(-1,1);
      }
    },

    checkForGameWin(){
      for(i=0; i<app.value_set.length; i++){
        if(app.value_set[i].matched !== true){
          return false;
        }
      }
      $('#modal1').modal('open');
    },

    clearVisible: function(){
      for(i=0; i<app.value_set.length; i++){
        if(app.value_set[i].matched !== false || (app.value_set[i].id === app.selected_pair[0].id || app.value_set[i].id === app.selected_pair[1].id)){

        } else {
          app.value_set[i].visible = false;
        }
      }
    }
  }
})

app.shuffle(app.value_set);

// only steps left are to clean up code, test on mobile and push repo

$(document).ready(function(){
    $('.modal').modal();
  });
