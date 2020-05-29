import React,{useState,useEffect} from 'react'//for state object as ith grabs value from form
import Layout from './Layout'
import {getImages} from './apiCore'
import Card from './Card'
import "../styles.css"
import ShowImage from './ShowImage';

const Home=()=>{
    const {user, token}=useState([])
    const [imagesByLimit,setimagesByLimit]=useState([])
    const [imagesByDate,setimagesByDate]=useState([])
    const [error,setError]=useState(false)
    const loadImagesByDate=()=>{
        getImages('createdAt').then(data=>{
            if(data.error){
                setError(data.error)
            }else{
                setimagesByLimit(data)
            }
        })
      }
      const loadImagesByLimit=()=>{
        getImages('limit').then(data=>{
            if(data.error){
                setError(data.error)
            }else{
                setimagesByDate(data)
            }
        })
      }

      useEffect(()=>{
        loadImagesByDate()
        loadImagesByLimit()
    },[])




    return( //fvfvfvfvfv
    <Layout title="Home Page" description="Node React Photo App" className="container-fluid">
        
        <div className='row'>
        {imagesByLimit.map((image,i)=>(
            <div key={i}  className="col-4 mb-3" >
        <Card  image={image} />
        </div>
        ))}
        </div>

        
       
</Layout>
 


)}

export default Home;