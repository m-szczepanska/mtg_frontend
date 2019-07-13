Vue.component('v-select', VueSelect.VueSelect);

const app = new Vue({
  el: '#app',
  data: {
    errored: false,
    correct: false,
    players: null,
    tournaments: null,
    tournament: null,
    player_ids: null
  },
  mounted () {
      player_id = localStorage.getItem("player_id")
      console.log(`http://testserver:8000/events/players/${player_id}/`)
      axios.all([
        axios.get('http://testserver:8000/events/players/',
            {headers:
              {'Authorization': (
                String(localStorage.getItem("player_id")) + ':' + localStorage.getItem("token"))}
            }),
        axios.get('http://testserver:8000/events/tournaments/')]
      ).then(axios.spread(
          (playersRes, toursRes) => {(this.players = playersRes.data), (this.tournaments = toursRes.data), (console.log(this.players, this.tournaments))}
      )).catch(error => {console.log(error)})
  },
  methods:{
    selectForm: function (e) {
        tournament = this.tournament
        axios.post(
            `http://testserver:8000/events/tournaments/${tournament}/add_players/`,
            { player_ids: this.player_ids }
      ).catch(error => {
            console.log(error.response)
      }).then(response => {
          if (this.errored === false) {
          console.log(this.correct)
          this.correct = true}
      })
      e.preventDefault();
    }
  }
})
