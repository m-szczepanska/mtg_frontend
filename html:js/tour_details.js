function find_past_rounds(response, vue_instance) {
    past_rounds_list = response.past_rounds;
    var past_rounds_nums = []

    for (var i=0; i < past_rounds_list.length; i++) {
      if (!past_rounds_nums.includes(past_rounds_list[i].round)) {
          past_rounds_nums.push(past_rounds_list[i].round)};
    };
    console.log(past_rounds_nums)


    vue_instance.past_rounds_list = past_rounds_list;
    vue_instance.past_rounds_nums = past_rounds_nums;
};


new Vue({
  el: '#app',
  data () {
    return {
      info: null,
      past_rounds_nums: null,
      past_rounds_list: null
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
    ).then(response => {(this.info = response.data), console.log(response)}
).then(response => {(find_past_rounds(this.info, this)), console.log(this.past_rounds_nums)}
    ).catch(error => {console.log(error)})
  },
  methods: {
    changeScore: function(e) {
        console.log("Change score, match was already finished")
    }
  }
})



// var aaa = [ { "id": 1, "player_1_id": 1, "player_2_id": 2, "player_1_name": "Fynkel, Jan", "player_2_name": "Gauguin, Paul", "tournament_id": 1, "player_1_score": 2, "player_2_score": 1, "draws": 1, "round": 1, "is_finished": true }, { "id": 4, "player_1_id": 1, "player_2_id": 4, "player_1_name": "Fynkel, Jan", "player_2_name": "man, post", "tournament_id": 1, "player_1_score": 1, "player_2_score": 2, "draws": 0, "round": 1, "is_finished": true }, { "id": 10, "player_1_id": 7, "player_2_id": 6, "player_1_name": "Jester, the", "player_2_name": "Dook, Reid", "tournament_id": 1, "player_1_score": 2, "player_2_score": 0, "draws": 0, "round": 1, "is_finished": true }, { "id": 11, "player_1_id": 7, "player_2_id": 6, "player_1_name": "Jester, the", "player_2_name": "Dook, Reid", "tournament_id": 1, "player_1_score": 2, "player_2_score": 0, "draws": 0, "round": 2, "is_finished": true }, { "id": 15, "player_1_id": 7, "player_2_id": 2, "player_1_name": "Jester, the", "player_2_name": "Gauguin, Paul", "tournament_id": 1, "player_1_score": 0, "player_2_score": 2, "draws": 0, "round": 2, "is_finished": true } ]
// var new_a = []
// console.log(new_a);
//
//
// for (var i=0; i < aaa.length; i++) {
//   if (!new_a.includes(aaa[i].round)) {new_a.push(aaa[i].round)};
// };
// console.log(new_a)
