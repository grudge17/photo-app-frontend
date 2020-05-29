import React from 'react'
import{BrowserRouter,Switch,Route} from 'react-router-dom'//this will wrap rest of the routes used,switch-switch case
import Signup from './user/Signup'
import Signin from './user/Signin'
import Home from './core/Home'
import PrivateRoute from './auth/PrivateRoute'
import Dashboard from './user/UserDashboard'
import AddPhoto from './user/AddPhoto'


const Routes=()=>{
    return (
    <BrowserRouter>
    
        <Switch>
            <Route path='/signin' exact component={Signin} />
            <Route path ='/signup' exact component={Signup} />
            <Route path ='/' exact component={Home} />
            <PrivateRoute 
        path="/user/dashboard" 
        exact component={Dashboard} 
        />
        <Route 
        path='/upload'
        exact component={AddPhoto} 
        />
            
        </Switch>
    </BrowserRouter>)
    }
    
    export default Routes