import {API} from '../config'

export const getImages =( sortBy,limit)=> {
    return fetch(`${API}/images?sortBy=${sortBy}&order=desc&limit=${limit}`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};