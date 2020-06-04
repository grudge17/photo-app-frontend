import React, { Suspense } from 'react'
import {API} from '../config'

const ShowImage=({item,url})=>(
    <div className="image-img">
       
        <img src={`${API}/${url}/photo/${item._id}`} 
        
        alt={item.name}
        className="zoom mb-3"
        style={{maxHeight:"100%",maxWidth:"100%"}}
        />
       
    </div>
)

export default ShowImage