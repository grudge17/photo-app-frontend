import {API} from '../config'
import Axios from 'axios';

export const getImages =( sortBy,offset)=> {
    return fetch(`${API}/images?sortBy=${sortBy}&order=desc&offset=${offset}`, {
        method: "GET"
    })
        .then(response => {
              return response.json();
        })
        .catch(err => console.log(err));
};