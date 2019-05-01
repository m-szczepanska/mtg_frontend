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

      console.log(`http://localhost:8000/events/players/${player_id}/current_tournaments/`)
      axios
        .get(
            `http://localhost:8000/events/players/${player_id}/current_tournaments/`,
            {
                headers: {
                    'Authorization': String(localStorage.getItem("player_id")) + ':' + localStorage.getItem("token"),

            }}
    ).then(response => {(this.info = response.data)}
    ).then(response => {if (!Array.isArray(this.info)) {this.info = [this.info]}}
    ).then(response => {var reply_click = function() {
                window.location.href =`file:///Users/marsza/workspace/mtg_frontend/html:js/current_round_details.html?tour_id=${this.id}`}
            var buttons = document.querySelectorAll(".btn")
            for (i = 0; i < buttons.length; i++) {
                buttons[i].onclick = reply_click}
            }
        ).catch(error => {console.log(error)})
  }
})


// for (i = 0, len = response.length; i <= len; i++) {
// const tour_id = document.getElementById("tour_id").innerHTML;
// document.getElementById("myButton").addEventListener("click", function(e) {
//     window.location.href =`file:///Users/marsza/workspace/mtg_frontend/html:js/tour_details.html?tour_id=${tour_id}`})
// console.log('tutaj tez');
// }};


// for (i = 0; i < buttons.length; i++) {
//     function reply_click(clicked_id)
//     {
//         alert(clicked_id);
//     }
//     console.log('buttonsy', buttons[i]);
//     buttons[i].onclick = function() {
//         console.log()
