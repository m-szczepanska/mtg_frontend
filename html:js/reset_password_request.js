const app = new Vue({
  el: '#app',
  data: {
    errored: false,
    correct: false,
    email: '',
    errors: {
      non_field_errors: ''
    }
  },
  methods:{
    checkForm: function (e) {
        console.log(this.email);
        axios.post(
            'http://localhost:8000/events/password_reset_request/',
            {email: this.email},
            {headers: {
              'Content-type': 'application/x-www-form-urlencoded',
            }
          }
      ).catch(error => {
        this.errored = error.response.data['non_field_errors'][0]
    }).then(response => {
        console.log(response)
        if (this.errored === false) {
        console.log(this.correct)
        this.correct = true}
    })
    e.preventDefault();
    }
  }
})
// -> return JsonResponse(serializer.errors, status=400)
// (Pdb) serializer.data
// {'email': 'marsza11jm@gmail.com'}
// (Pdb) serializer.errors
// {'non_field_errors': [ErrorDetail(string='Email already exists in the database .', code='invalid')]}
