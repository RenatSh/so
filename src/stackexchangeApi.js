import axios from 'axios'

export const searchSOByTitlePromise = function (title) {
    let url = "https://api.stackexchange.com/2.2/search?pagesize=100&order=desc&sort=activity&intitle="
        + title
        + "&site=stackoverflow";
    return axios.get(url)
        ;//.then(response => response.json());
    // return difference between start and end
}

export const searchSOByUserPromise = function (userId) {
    let url = "http://api.stackexchange.com/2.2/users/"
        + userId
        + "/questions?order=desc&sort=votes&site=stackoverflow";
    return axios.get(url)
        ;//.then(response => response.json());
    // return difference between start and end
}