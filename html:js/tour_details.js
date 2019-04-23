function find_current_player_match(response, vue_instance) {
    current_round = response.data.current_round;
    console.log(current_round);
    player_id = localStorage.getItem("player_id");
    // TODO: Check if player match is not yet finished
    for ( var i=0; i < current_round.length; i++ ) {
        if (
            current_round[i].player_1_id == player_id ||
            current_round[i].player_2_id == player_id
        ) {
            var index = i;
            break;
        };
    };

    player_match = current_round.splice(index, 1)[0];  // "pop(index)"
    if ( player_match.is_finished == false ) {
        vue_instance.current_player_match = player_match;
    }
    else {
        vue_instance.current_player_match_finished = player_match;
    }
    // console.log("index", index);
    // console.log("match", player_match);
    // console.log("round", current_round);
    vue_instance.info = current_round;
};


new Vue({
  el: '#app',
  data () {
    return {
      info: null,
      current_player_match: null,
      current_player_match_finished: null
    }
  },
  mounted () {
      const urlParams = new URLSearchParams(window.location.search);
      const tour_id = urlParams.get('tour_id');

      console.log(`http://localhost:8000/events/tournaments/${tour_id}/`)
      axios
        .get(
            `http://localhost:8000/events/tournaments/${tour_id}/`,  // string formatting, swap 9 for player_id
            {
                headers: {
                    'Authorization': String(localStorage.getItem("player_id")) + ':' + localStorage.getItem("token"),

            }}
    ).then(response => {find_current_player_match(response, this)}
    ).catch(error => {console.log(error)})
  },
  methods: {
    submitScore: function (e) {
        console.log("Submit score, we just finished the match!")
    },
    changeScore: function(e) {
        console.log("Change score, match was already finished")
    }
  }

})
