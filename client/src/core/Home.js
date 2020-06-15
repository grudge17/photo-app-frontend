import React,{useState,useEffect,Suspense} from 'react'//for state object as ith grabs value from form
import Layout from './Layout'
import {getImages} from './apiCore'
import "../styles.css";
import SlideShow from './SlideShow'   
import {API} from '../config';
import {
    Button,
    Dialog,
    DialogContent,
    DialogActions
  } from "@material-ui/core"
  import useGlobal from "../store";
const Card = React.lazy(()=> import('./Card'))

const Home=()=>{
    const [imagesByLimit,setImagesByLimit]=useState([])
    const [imagesByDate,setImagesByDate]=useState([])
    const [error,setError]=useState(false)
    
    const [open, handleOpen] = useGlobal(
        state => state.open,
        actions => actions.handleOpen
      );
      const [globalState, globalActions] = useGlobal();

    useEffect(()=>{
        console.log(open)
    },[open]) 
    
    const [isFetching, setIsFetching] = useState(false);
    const[page, setPage]=useState(0);

    useEffect(()=>{
        fetchData();
        window.addEventListener('scroll', handleScroll);},[]);
    

    const handleScroll = () =>{
        if(Math.ceil(window.innerHeight + document.documentElement.scrollTop) < document.documentElement.offsetHeight
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

      const fetchData = async ()=>{
         
            //setPage(page+30);
            var imageList = await loadImagesByLimit(page)
            setPage(page+30)
          //  const data= await result.json()
            var list=imagesByLimit.concat(imageList)
                setImagesByLimit(list)
           
         
      }
      useEffect(()=>{
          if(!isFetching)return;
          fetchMoreListItems();
    
      }, [[isFetching]])

      const fetchMoreListItems=()=>{
          fetchData();
          setIsFetching(false)
      }
      const loadImagesByLimit= async(offset)=>{
       var data = await getImages('createdAt',offset)
       return data
      }

    return( //fvfvfvfvfv
        
    <Layout title="Home Page" description="Node React Photo App" className="container-fluid">
        
        <div className="row">
        {imagesByLimit.map((item) =>(
            <div className="column mr-4 ml-2">
             <Suspense fallback={<img src="%PUBLIC_URL%/favicon.ico"  alt='Avatar'style={{width:'50%'}}/>}>
            <Card image={item} />
            </Suspense>
            </div>
        ))}
        {isFetching && <h1>Fetching for more list items</h1>}
      </div>  
      <div>
      <Dialog fullWidth={true}
maxWidth = {'md'} open={globalState.open} aria-labelledby="form-dialog-title">
    <DialogContent>
    
    <SlideShow imageList={imagesByLimit}/>
    </DialogContent>
    <DialogActions>
      <Button  onClick={() => 
      {
        globalActions.handleOpen();
            }} color="primary">
        Close
      </Button>
    </DialogActions>
  </Dialog> 
  </div>
       
</Layout>
 
    )

        }
        

export default Home