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

      console.log(`http://testserver:8000/events/players/${player_id}/current_tournaments/`)
      axios
        .get(
            `http://testserver:8000/events/players/${player_id}/current_tournaments/`,
            {
                headers: {
                    'Authorization': String(localStorage.getItem("player_id")) + ':' + localStorage.getItem("token"),

            }}
    ).then(response => {(this.info = response.data), console.log(this.info[0])}
    ).then(response => {if (!Array.isArray(this.info)) {this.info = [this.info]}}
    ).then(response => {if (this.info.length < 2)
        { var tournament_id = this.info[0].id;
        window.location.href =`current_round_details.html?tour_id=${tournament_id}`}}
    ).then(response => {var reply_click = function() {
                window.location.href =`current_round_details.html?tour_id=${this.id}`}
            var buttons = document.querySelectorAll(".btn-info")
            for (i = 0; i < buttons.length; i++) {
                buttons[i].onclick = reply_click}
            }
  ).catch(error => {console.log(error)})
}
})
