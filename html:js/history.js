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
  }

},
  mounted () {
      player_id = localStorage.getItem("player_id")
      console.log(`http://localhost:8000/events/players/${player_id}/player_history/`)
      axios
        .get(
            `http://localhost:8000/events/players/${player_id}/player_history/`,  // string formatting, swap 9 for player_id
            {
                headers: {
                    'Authorization': String(localStorage.getItem("player_id")) + ':' + localStorage.getItem("token"),

            }}
        )
        .then(response => {(this.info = response.data), console.log(response)}
    ).catch(error => {console.log(error)})
  }
})
