export const endpoint = "https://accounts.spotify.com/authorize"

const redirect = process.env.SPOTIFY_REDIRECT;

const cli_id = process.env.CLIENT_ID;

const sec_id = process.env.SECRET_ID;

const scope = [
    "user-read-recently-played",
    "user-read-playback-state",
    "playlist-read-private",
    "playlist-modify-private",
    "playlist-modify-public",
    "user-top-read"
]

export const loginURI = `${endpoint}
?client_id=${cli_id}
&redirect_uri=${redirect}
&scope=${scope.join("%20")}
&response_type=token
&show_dialog=true`


// export const getToken = () => {
//     return window.location.hash.substring(1).split('&').reduce((initial, item) => {
//         let parts = item.split("=");
//         initial[parts[0]] = decodeURIcomponent(parts[1])

//         return initial
//     }, {});
// }

