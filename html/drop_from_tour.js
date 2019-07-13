
var tour_id = new URLSearchParams(window.location.search).get('tour_id')
var player_id = localStorage.getItem('player_id')

axios.put(`http://testserver:8000/events/tournaments/${tour_id}/players/${player_id}/drop/`,
    {
        headers: {
            'Authorization': String(localStorage.getItem("player_id")) + ':' + localStorage.getItem("token"),
        }
    }
    ).then(function(response){
        console.log('saved successfully')}
    ).then(response => {window.location.href = "current_tours.html"}
    ).catch(error => {console.log(error)});
