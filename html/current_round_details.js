function find_current_player_match(response, vue_instance) {
    standings = response.data.standings
    console.log('caly res', response.data)
    console.log('standings', standings)
    current_round = response.data.current_round;
    console.log('current_round', response.data.current_round);
    player_id = localStorage.getItem("player_id");
    for ( var i=0; i < current_round.length; i++ ) {
        if (
            current_round[i].player_1_id == player_id ||
            current_round[i].player_2_id == player_id
        ) {
            var index = i;
            var match_id = current_round[i].id
            var match_tournament_id = current_round[i].tournament_id
            break;
        };
    };
    console.log('index', index);
    player_match = current_round.splice(index, 1)[0];  // "pop(index)"
    if ( player_match.is_finished == false ) {
        vue_instance.current_player_match = player_match;
    }
    else {
        vue_instance.current_player_match_finished = player_match;
    }
    console.log('player_match', player_match);
    console.log('current round', current_round);
    vue_instance.link_match_id = player_match.id;
    vue_instance.tournament_id = match_tournament_id;
    vue_instance.info = current_round;
    vue_instance.standings = standings;
};


new Vue({
  el: '#app',
  data () {
    return {
      info: null,
      current_player_match: null,
      current_player_match_finished: null,
      player_1_score: null,
      player_2_score: null,
      draws: null,
      link_match_id: null,
      tournament_id: null,
      standings: null,
    }
  },
  mounted () {
      const urlParams = new URLSearchParams(window.location.search);
      const tour_id = urlParams.get('tour_id');

      console.log(`http://testserver:8000/events/tournaments/${tour_id}/`)
      axios
        .get(
            `http://testserver:8000/events/tournaments/${tour_id}/`,  // string formatting, swap 9 for player_id
            {
                headers: {
                    'Authorization': (
                            String(localStorage.getItem("player_id")) + ':' + localStorage.getItem("token")
                    )
            }}
    ).then(response => {(find_current_player_match(response, this))}
    ).catch(error => {console.log(error)})
  },
  methods: {
      changeScore: function (e) {
          window.location.href =`update_current_round.html?tour_id=${this.tournament_id}&match_id=${this.link_match_id}`
          e.preventDefault();
      },
    submitScore: function (e) {
        axios.put(
            `http://testserver:8000/events/tournaments/${this.tournament_id}/matches/${this.link_match_id}/`,
            {
                    player_1_score: this.player_1_score,
                    player_2_score: this.player_2_score,
                    draws: this.draws
            },
            {
                headers: {
                    'Authorization': String(localStorage.getItem("player_id")) + ':' + localStorage.getItem("token"),
            }
          }
      ).then(response => {window.location.href =`current_round_details.html?tour_id=${this.tournament_id}`}
      ).catch(error => {console.log(error)})

    e.preventDefault();}
  }
})
