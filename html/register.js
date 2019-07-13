const app = new Vue({
  el: '#app',
  data: {
    errored: false,
    correct: false,
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    password_repeat: ''
  },
  methods:{
    checkForm: function (e) {
        console.log(this.email, this.password);
        var query_token = window.location.search
        var token = query_token.slice(7)
        console.log(`http://testserver:8000/events/register/${token}/`)
        axios.post(
            `http://testserver:8000/events/register/${token}/`, {
                first_name: this.first_name,
                last_name: this.last_name,
                email: this.email,
                password: this.password,
                password_repeat: this.password_repeat
            },
            {
              headers: {
                  'Content-type': 'application/x-www-form-urlencoded',
            }
          }
      ).catch(error => {
        console.log(error.response.data['non_field_errors'][0])
        this.errored = error.response.data['non_field_errors'][0]
      }).then(response => {
          if (this.errored === false) {
          console.log(this.correct)
          this.correct = true}
      })
      e.preventDefault();
    }
  }
})
