function find_current_player_match(response, vue_instance) {
    first_name = response.data.first_name
    last_name = response.data.last_name
    email = response.data.email

    vue_instance.first_name = first_name;
    vue_instance.last_name = last_name;
    vue_instance.email = email;
};


const app = new Vue({
  el: '#app',
  data: {
    errored: false,
    correct: false,
    first_name: '',
    last_name: '',
    email: ''
  },
  mounted () {
      player_id = localStorage.getItem("player_id")
      console.log(`http://localhost:8000/events/players/${player_id}/`)
      axios
        .get(
            `http://localhost:8000/events/players/${player_id}/`,  // string formatting, swap 9 for player_id
            {
                headers: {
                    'Authorization': (
                            String(localStorage.getItem("player_id")) + ':' + localStorage.getItem("token")
                    )
            }}
    ).then(response => {(find_current_player_match(response, this)), console.log(this.info)}
    ).catch(error => {console.log(error)})
  },
  methods:{
    checkForm: function (e) {
        player_id = localStorage.getItem("player_id")
        axios.put(
            `http://localhost:8000/events/players/${player_id}/`, {
                first_name: this.first_name,
                last_name: this.last_name,
                email: this.email
            },
            {headers: {
                    'Authorization': String(localStorage.getItem("player_id")) + ':' + localStorage.getItem("token")}
            }
      ).catch(error => {
            console.log(error.response)
      }).then(response => {
          if (this.errored === false) {
          console.log(this.correct)
          this.correct = true}
      }).then(response => {window.location.href ="file:///Users/marsza/workspace/mtg_frontend/html:js/players_settings.html"})
      e.preventDefault();
    }
  }
})
