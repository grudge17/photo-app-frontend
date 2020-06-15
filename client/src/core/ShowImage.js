import React, { useState, useEffect } from 'react'
import {API} from '../config'
import Layout from './Layout'
import { Link } from 'react-router-dom'
import {
    Button,
    Dialog,
    DialogContent,
    DialogActions,
    TextField
  } from '@material-ui/core'
  import useGlobal from "../store";

const ShowImage=({item,url})=>{

      const [globalState, globalActions] = useGlobal();
      const handleOpenDialog=()=>{
        globalActions.handleOpen();
        globalActions.handleItemId(item._id)
        }
     

return(
    <div>
    <div className="image-img">
       
         <img 
         src={`${API}/${url}/photo/${item._id}?renditionType=240p`}
         onClick={handleOpenDialog}
            
        alt={item.name}
        className="zoom mb-3"
        style={{maxHeight:"100%",maxWidth:"100%"}}
        />
    </div>
  </div>
   
)
}

export default ShowImage