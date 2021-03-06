import React,{Fragment} from 'react'
import {Link,withRouter} from 'react-router-dom'
import {signout,isAuthenticated} from '../auth/index'

const isActive=(history,path)=>{ //history is where we have been,the one to highlight and path is the actaul path we will provide
    if(history.location.pathname === path){
        return {color:'#ff9900'}
    }
    else{
        return {color : '#ffffff'}
    }
}              



const Menu=({history})=>( //ul-unordered list
    <div>
        <ul className="nav nav-tabs bg-primary"> 
            <li className="nav-item">
                <Link 
                className="nav-link" 
                style={isActive(history,'/')} 
                to="/">
                    Home
                </Link>
            </li>
            <li className="nav-item">
                <Link 
                className="nav-link" 
                style={isActive(history,'/dashboard')} 
                to="/user/dashboard">
                    Dashboard
                </Link>
            </li>

            

            {!isAuthenticated() && (
            <Fragment>
                 <li className="nav-item">
              <Link 
              className="nav-link" 
              style={isActive(history,'/signin')} 
              to="/signin">
                  Signin
              </Link>
          </li>
          <li className="nav-item">
              <Link 
              className="nav-link" 
              style={isActive(history,'/signup')} 
              to="/signup">
                  Signup
              </Link>
          </li>
            </Fragment>
          )}
          {isAuthenticated() && (
              <li className="nav-item">
              <span 
              className="nav-link" 
              style={{cursor:'pointer',color:'#ffffff'}} 
              onClick={()=>signout(()=>{
                  history.push('/')
              })}>
                  Signout
              </span>
          </li>
          )}
      </ul>
  </div> 
)

export default withRouter(Menu);
