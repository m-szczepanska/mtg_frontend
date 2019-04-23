
function store_token_helper_and_redirect(response) {
    localStorage.removeItem('token')
    localStorage.removeItem('player_id')
    console.log(response);;
    set_headers();
    console.log(response.headers);
    window.location.href = "login.html"
};

function set_headers() {
    axios.defaults.headers.common = {
        'Authorization': '',
        "player_id": ''
    };
};

new Vue({
  el: '#app',
  data: {errored: false},
  mounted () {
      axios.get('http://localhost:8000/events/logout/',
      {
          headers: {
          'Authorization': String(localStorage.getItem("player_id")) + ':' + localStorage.getItem("token")}
      }
    ).then(response => {store_token_helper_and_redirect(response)}
    ).catch(error => {console.log(error)})
  }
})

// const app = new Vue({
//   el: '#app',
//   data: {
//     errored: false
//   },
//   methods:{
//     checkForm: function (e) {
//         console.log(this.email, this.password);
//         axios.post(
//             'http://localhost:8000/events/login/',
//             {email: this.email, password: this.password},
//             {headers: {
//               'Content-type': 'application/x-www-form-urlencoded',
//             }
//           }
//       ).then(
//           response => {store_token_helper_and_redirect(response)
//           console.log('jest tu')}
//       ).catch(error => {
//         console.log(error.response.data['non_field_errors'][0])
//         this.errored = error.response.data['non_field_errors'][0]
//       })
//       e.preventDefault();
//     }
//   }
// })
