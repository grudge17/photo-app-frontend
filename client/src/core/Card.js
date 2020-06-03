import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import ShowImage from './ShowImage';
import moment from 'moment';
import {API} from '../config'
 

const Card = ({
  image,

}) => {
  
  return (
    <div className="card ">
      <div className="card-header card-header-1 ">{image.title}</div>
      <div className="card-body">
        {/* {shouldRedirect(redirect)} */}
        <ShowImage  item={image} url="image" />
        <p className="card-p  mt-2">{image.description.substring(0, 100)} </p>
        <p className="card-p black-10">#{image.tags}</p>
        <p className="black-8">Added on {moment(image.createdAt).fromNow()}</p>
        
      </div>
    </div>

   
  );
};
 
export default Card;


