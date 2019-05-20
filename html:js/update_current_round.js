
function change_score(response, vue_instance, tour_id, match_id) {
    player_1_score = response.data.player_1_score
    player_2_score = response.data.player_2_score
    draws = response.data.draws
    player_1_name = response.data.player_1_name
    player_2_name = response.data.player_2_name

    vue_instance.player_1_score = player_1_score;
    vue_instance.player_2_score = player_2_score;
    vue_instance.draws = draws;
    vue_instance.match_id = match_id;
    vue_instance.tour_id = tour_id;
    vue_instance.player_1_name = player_1_name;
    vue_instance.player_2_name = player_2_name;
};

new Vue({
  el: '#app',
  data () {
    return {
      player_1_score: null,
      player_2_score: null,
      player_1_name: null,
      player_2_name: null,
      draws: null,
      match_id: null,
      tour_id: null,

    }
  },
  mounted () {
      const urlParams = new URLSearchParams(window.location.search);
      const tour_id = urlParams.get('tour_id');
      const match_id = urlParams.get('match_id');

      console.log(`http://localhost:8000/events/tournaments/${tour_id}/matches/${match_id}`)
      axios
        .get(
            `http://localhost:8000/events/tournaments/${tour_id}/matches/${match_id}`,
            {
                headers: {
                    'Authorization': (
                            String(localStorage.getItem("player_id")) + ':' + localStorage.getItem("token")
                    )
            }}
    ).then(response => {(change_score(response, this, tour_id, match_id))}
    ).catch((error) => {
        // Error
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
        }
        console.log(error.config);
    })
},
  methods: {
    submitScore: function (e) {
        console.log(`http://localhost:8000/events/tournaments/${this.tour_id}/matches/${this.match_id}/`)
        axios.put(
            `http://localhost:8000/events/tournaments/${this.tour_id}/matches/${this.match_id}/`,
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
      ).then(response => {window.location.href =`file:///Users/marsza/workspace/mtg_frontend/html:js/current_round_details.html?tour_id=${this.tour_id}`}
      ).catch((error) => {
          if (error.response) {
              console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.headers);
          } else if (error.request) {
              console.log(error.request);
          } else {
              console.log('Error', error.message);
          }
          console.log(error.config);
      })

    e.preventDefault();}
  }
})
