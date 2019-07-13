const app = new Vue({
  el: '#app',
  data: {
    errored: false,
    correct: false,
    tour_name: null,
    date_beginning: '2000-01-01T23:59',
    date_ending: '2000-01-02T00:00'
  },
  methods:{
    checkForm: function (e) {
        axios.post(
            'http://testserver:8000/events/tournaments/',
            {
                name: this.tour_name,
                date_beginning: this.date_beginning,
                date_ending: this.date_ending
            },
            {  headers: {
              'Authorization': String(localStorage.getItem("player_id")) + ':' + localStorage.getItem("token")
            }
          }
      ).catch(error => {if (!(error.response.data['error'])) {
          this.errored = error.response.data['non_field_errors']
      } else {this.errored = error.response.data['error']}
      console.log(this.error.response.data)
      }).then(response => {
          if (this.errored === false) {
          console.log(this.correct)
          this.correct = true}
      })
      e.preventDefault();
    }
  }
})
