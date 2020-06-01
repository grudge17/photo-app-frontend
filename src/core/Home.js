import React,{useState,useEffect,Suspense} from 'react'//for state object as ith grabs value from form
import Layout from './Layout'
import {Link} from 'react-router-dom'
import {getImages} from './apiCore'
import "../styles.css"
import ShowImage from './ShowImage';
import {API} from '../config'
const Card = React.lazy(()=> import('./Card'))

const Home=()=>{
    const {user, token}=useState([])
    const [imagesByLimit,setImagesByLimit]=useState([])
    const [imagesByDate,setImagesByDate]=useState([])
    const [error,setError]=useState(false)
    const { isOpen,setIsOpen } = useState(false)

    const [isFetching, setIsFetching] = useState(false);
    const[page, setPage]=useState(30);

    useEffect(()=>{
        fetchData();
        window.addEventListener('scroll', handleScroll);},[]);
    

    const handleScroll = () =>{
        if(Math.ceil(window.innerHeight + document.documentElement.scrollTop) !== document.documentElement.offsetHeight
        || isFetching) 
            return;
        setIsFetching(true)
    }


    const loadImagesByDate=()=>{
        getImages('createdAt').then(data=>{
            if(data.error){
                setError(data.error)
            }else{
                setImagesByLimit(data)
            }
        })
      }

      const fetchData =()=>{
          
            setPage(page+30);
            loadImagesByLimit(page)
          //  const data= await result.json()
           
         
      }
      useEffect(()=>{
          if(!isFetching)return;
          fetchMoreListItems();
      }, [isFetching])

      const fetchMoreListItems=()=>{
          fetchData();
          setIsFetching(false)
      }
      const loadImagesByLimit=(limit)=>{
        getImages('createdAt',limit).then(data=>{
            if(data.error){
                setError(data.error)
            }else{
                setImagesByLimit(data)
            }
        })
      }

    //   useEffect(()=>{
    //     loadImagesByDate()
    //     loadImagesByLimit()
    // },[])


    
        
     

    return( //fvfvfvfvfv
    <Layout title="Home Page" description="Node React Photo App" className="container-fluid">
        {/* <button class="button button2"> <Link to='/upload'><font color="white"> Upload</font> </Link> </button> */}
        
   {/* <div>

        {imagesByLimit.map((image,i)=>(
              
        <a class="example-image-link mr-4" href={`${API}/image/photo/${image._id}`}  
        data-lightbox="roadtrip" >
            <img class="example-image" src={`${API}/image/photo/${image._id}`}  alt=""/></a>
        ))}
        </div>  */}

        
        <div className="row">
        {imagesByLimit.map((item) =>(
            <div className="column mr-4 ml-2">
             <Suspense fallback={<img src='C:\Users\hp\Desktop\ecomm images\react\react.jpg' alt='Avatar'style={{width:'50%'}}/>}>
            <Card image={item}/>
            </Suspense>
            </div>
        ))}
        {isFetching && <h1>Fetching for more list items</h1>}
      </div>  
       
</Layout>
 
    )

        }
        

export default Home