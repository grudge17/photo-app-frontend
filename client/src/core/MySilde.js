import React, { useState, useEffect } from 'react'

  import useGlobal from "../store";

const MySlide=({image})=>{
    const inputStyle={
        display: 'none'
    }
      const activeInputStyle={
        display: 'block'
      }

      const [globalState, globalActions] = useGlobal();
      const [slideStyle, setSlideStyle] = useState(inputStyle)

      
      

     const getStyle=()=>{
         if(globalState.itemId===image._id){
             return activeInputStyle
         }
         else{
             return inputStyle
         }
     }

return(
    <div>
        <div class="mySlides" 
        style={{ display: globalState.itemId === image._id? 'block': 'none'}}>
        <div class="text">{image.createdBy}</div>
            <img 
                src={`http://localhost:8000/image/photo/${image._id}?renditionType=720p`}
                alt='no image'
                className="mb-3"
                style={{width:"100%"}}
            />
        </div>
  </div>
   
)
}

export default MySlide