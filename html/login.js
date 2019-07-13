
function store_token_helper_and_redirect(response) {
    console.log(response);
    if (typeof(Storage) !== "undefined") {
      var player_id_value = response.data.player_id
      var token_value = response.data.uuid
      console.log(response.data.player_id)
      localStorage.setItem("token", token_value);
      localStorage.setItem("player_id", player_id_value);
      set_headers();
      console.log(response.headers);
      window.location.href = "current_tours.html"
    } else {
      console.log("bad browser no storage")
    }
};

function set_headers() {
    // headers['Authorization'] = storage.token; <- pseudocode
    var player_id = localStorage.getItem("player_id");
    var token = localStorage.getItem("token");
    axios.defaults.headers.common = {
        'Authorization': token,
        "player_id": player_id
    };
};

const app = new Vue({
  el: '#app',
  data: {
    errored: false,
    email: '',
    password: ''
  },
  methods:{
    checkForm: function (e) {
        axios.post(
            'http://testserver:8000/events/login/',
            {email: this.email, password: this.password},
            {headers: {
              'Content-type': 'application/x-www-form-urlencoded',
            }
          }
      ).then(
          response => {store_token_helper_and_redirect(response)}
      ).catch(error => {
        console.log(error.response.data['non_field_errors'][0])
        this.errored = error.response.data['non_field_errors'][0]
      })
      e.preventDefault();
    }
  }
})
