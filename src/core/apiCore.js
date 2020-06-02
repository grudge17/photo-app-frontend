import {API} from '../config'
import Axios from 'axios';

export const getImages =( sortBy,limit)=> {
    return fetch(`${API}/images?sortBy=${sortBy}&order=desc&limit=${limit}`, {
        method: "GET"
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};