document.getElementById('logout_link').onclick = function remove_token() {
    localStorage.removeItem('token')
    localStorage.removeItem('player_id')
    set_headers();
    window.location.href = "login.html"
};

function set_headers() {
    axios.defaults.headers.common = {
        'Authorization': '',
        "player_id": ''
    };
};
