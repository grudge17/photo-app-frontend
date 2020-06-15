import React,{useEffect,useState} from 'react'
 import Layout from '../core/Layout'

 class UploadProgressBar extends React.Component{
     constructor(props){
         super(props)
         this.state = {
             percentage:0
         }
         this.nextStep = this.nextStep.bind(this)
     }

     nextStep(){
         if(this.state.percentage ===100)return
         this.setState(prev=> ({percentage:prev.percentage + 20}))
     }


     render(){
         return(
             <div>
                 <ProgressBar percentage={this.state.percentage}/>
             </div>
         )
     }
 }