import {API} from '../config'

export const getImages = sortBy => {
    return fetch(`${API}/images?sortBy=${sortBy}&order=desc&limit=30`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};