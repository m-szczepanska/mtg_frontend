const app = new Vue({
  el: '#app',
  data: {
    errored: false,
    correct: false,
    first_name: '',
    last_name: '',
    email: ''
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
      })
      e.preventDefault();
    }
  }
})
