// new Vue({
//   el: '#app',
//   data () {
//     email: "",
//     password: ""
//     return {
//       info: null
//     }
//   },
//   mounted () {
//       axios
//         .post('localhost:8000/events/login/', {
//             email: "",
//             password: ""
//           })
//         .then(response => (this.info = response))
//         .catch(error => {console.log(error)})
//   }
// })
// import { set_headers } from '/export.js';

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
      window.location.href = "history.html"
    } else {
      console.log("bad browser no storage")
    }
};

function set_headers() {
    // headers['Authorization'] = storage.token; <- pseudocode
    var player_id = localStorage.getItem("player_id");
    var token = localStorage.getItem("token");
    // axios.defaults.headers.common['player_id'] = player_id;
    // axios.defaults.headers.common['Authorization'] = token;
    axios.defaults.headers.common = {
        'Authorization': token,
        "player_id": player_id
    };
};


Vue.component('test-item', {
  template: `
    <form class="" method="post" @submit.prevent="postNow">
    <input type="text" name="email" value="email" v-model="email">
    <input type="password" name="password" value="password" v-model="password">
    <button type="submit" name="button">Submit</button>
    </form>`,
  data: function() {
  	return {
    	 email: '',
         password: '',
       show: false
    }
  },
  methods: {
  	postNow: function() {
      console.log(this.email, this.password);
      axios.post(
          'http://localhost:8000/events/login/',
          {email: this.email, password: this.password},
          {headers: {
            'Content-type': 'application/x-www-form-urlencoded',
          }
        }
    ).then(
        response => store_token_helper_and_redirect(response)
    ).catch(
        error => {console.log(error)}
    );
    }
  }
});

new Vue({
	el: '#app'
});
