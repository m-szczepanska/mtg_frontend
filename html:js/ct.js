import set_headers from './post.js';


new Vue({
  el: '#app',
  data () {
    return {
      info: null
    }
  },
  filters: {
    data_formated: function (value) {
      if (!value) return ''
      value = value.toString()
      var reg1 = /t/gi;
      var reg2 = /:00Z/gi;
      first_part = value.replace(reg1, ' ')
      second_part = first_part.replace(reg2, ' ')
      return second_part
  }},
  mounted () {
      axios
        .get('http://localhost:8000/events/players/9/current_tournaments/')
        .then(response => (this.info = response.data))
        .catch(error => {console.log(error)})
        // add header with authorization token here
  }
})
