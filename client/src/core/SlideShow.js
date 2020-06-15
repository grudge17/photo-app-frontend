import React, { useState, useEffect } from 'react'
import {API} from '../config'
import Layout from './Layout'
import { Link } from 'react-router-dom'
import MySlide from './MySilde'

  import useGlobal from "../store";

const SlideShow=({imageList})=>{

      const [globalState, globalActions] = useGlobal();
      const [index, setIndex]=useState(0)        
        
        const plusSlides=()=> {
            setIndex(index+1)
            globalActions.handleItemId(imageList[index]._id)
       
        }
        const minusSlides=()=> {
            setIndex(index-1)
            globalActions.handleItemId(imageList[index]._id)
         
        }
       
const loadSlides =()=> {   
    var key=0; 
      imageList.map(function(item) {
          key++
        return <MySlide key={key} image={item} />
      })  
};

    
return(
   
    <div className="slideshow-container">
       {imageList.map((item)=> (       
         <MySlide key={item._id} image={item}/>
       ))}  
    
    <a className="prev" href="javascript:void(0);" onClick={minusSlides}>&#10094;</a>
    
    <a className="next"  href="javascript:void(0);" onClick={plusSlides}>&#10095;</a>

    
    </div>
   
)
}

export default SlideShow