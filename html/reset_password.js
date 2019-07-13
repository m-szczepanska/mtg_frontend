const app = new Vue({
  el: '#app',
  data: {
    errored: false,
    correct: false,
    password: '',
    password_repeat: ''
  },
  methods:{
    checkForm: function (e) {
        var query_token = window.location.search
        var token = query_token.slice(7)
        console.log(`http://testserver:8000/events/password_reset/${token}/`)
        axios.post(
            `http://testserver:8000/events/password_reset/${token}/`, {
                password: this.password,
                password_repeat: this.password_repeat
            },
            {
              headers: {
                  'Content-type': 'application/x-www-form-urlencoded',
            }
          }
      ).catch(error => {if (!(error.response.data['error'])) {
          this.errored = error.response.data['non_field_errors'][0]
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
