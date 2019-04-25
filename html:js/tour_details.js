// function find_current_player_match(response, vue_instance) {
//     current_round = response.data.current_round;
//     console.log(response.data.current_round);
//     player_id = localStorage.getItem("player_id");
//     // TODO: Check if player match is not yet finished
//     for ( var i=0; i < current_round.length; i++ ) {
//         if (
//             current_round[i].player_1_id == player_id ||
//             current_round[i].player_2_id == player_id
//         ) {
//             var index = i;;
//             var match_id = current_round[i].id
//             var match_tournament_id = current_round[i].tournament_id
//             break;
//         };
//     };
//     console.log(current_round);
//     player_match = current_round.splice(index, 1)[0];  // "pop(index)"
//     if ( player_match.is_finished == false ) {
//         vue_instance.current_player_match = player_match;
//
//     }
//     else {
//         vue_instance.current_player_match_finished = player_match;
//     }
//     vue_instance.link_match_id = player_match.id;
//     vue_instance.tournament_id = match_tournament_id;
//     // console.log("index", index);
//     // console.log("match", player_match);
//     // console.log("round", current_round);
//     vue_instance.info = current_round;
// };


new Vue({
  el: '#app',
  data () {
    return {
      info: null,
      // current_player_match: null,
      // current_player_match_finished: null,
      // player_1_score: null,
      // player_2_score: null,
      // draws: null,
      // link_match_id: null,
      // tournament_id: null,
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
                    'Authorization': (
                            String(localStorage.getItem("player_id")) + ':' + localStorage.getItem("token")
                    )
            }}
    // ).then(response => {(find_current_player_match(response, this)), console.log(this.info)}
).then(response => {(this.info = response.data), console.log(response)}
    ).catch(error => {console.log(error)})
  },
  methods: {
    changeScore: function(e) {
        console.log("Change score, match was already finished")
    },
    // submitScore: function (e) {
    //     axios.put(
    //         `http://localhost:8000/events/tournaments/${this.tournament_id}/matches/${this.link_match_id}/`,
    //         {
    //                 player_1_score: this.player_1_score,
    //                 player_2_score: this.player_2_score,
    //                 draws: this.draws
    //         },
    //         {
    //             headers: {
    //                 'Authorization': String(localStorage.getItem("player_id")) + ':' + localStorage.getItem("token"),
    //         }
    //       }
    //   ).then(response => {window.location.href =`file:///Users/marsza/workspace/mtg_frontend/html:js/tour_details.html?tour_id=${tournament_id}`}
    //   ).catch(error => {console.log(error)})
    //
    // e.preventDefault();}
  }
})

//
// Vue.component('test-item', {
// 	template: `
//   <form class="" method="post" @submit.prevent="postNow">
//  <input type="text" name="" value="" v-model="name">
//  <button type="submit" name="button">Submit</button>
//  </form>`,
//   data: function() {
//   	return {
//     	 name: '',
//        show: true
//     }
//   },
//   methods: {
//   	postNow: function() {
//     	console.log(this.name);
//       axios.post('/echo/json/', this.name, {headers: {
//       'Content-type': 'application/x-www-form-urlencoded',
//     }}).then(r => console.log('r: ', JSON.stringify(r, null, 2)));
//     }
//   }
// });
//
// new Vue({
// 	el: '#app'
// });
