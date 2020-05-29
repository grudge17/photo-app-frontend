import React,{useState} from 'react'//for state object as ith grabs value from form
import {Redirect} from 'react-router-dom'
import Layout from '../core/Layout'
import {signin,aunthenticate,isAuthenticated} from '../auth/index'
const Signin=()=> {
    const [values,setValues]=useState({
        email:"",
        password:"",
        error:"",
        loading:false,
        redirectToReferrer:false
    })

    const{email,password,error,loading,redirectToReferrer}=values
    const{user}=isAuthenticated()

const handleChange=name=>event=>{//one fuction returning another function
setValues({...values,error:false,[name]:event.target.value})
}

const clickSubmit=(event)=>{
    event.preventDefault()//this fuction restricts page from reloading to grab values
    setValues({...values,error:false,loading:true})
    signin({email,password})
    .then(data=>{
        if(data.error){
            setValues({...values,error:data.error,loading:false})
        }else{
            aunthenticate(data,()=>{
                setValues({
                    ...values,
                    redirectToReferrer:true
                })
            })
        }
               
    })
}
    const signUpForm=()=>(
        <form>
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input 
                onChange={handleChange('email')} 
                type="email" 
                className="form-control"
                values={email}
                />
            </div>
            <div className="form-group">
                <label className="text-muted">Password</label>
                <input 
                onChange={handleChange('password')} 
                type="password" 
                className="form-control"
                values={password}
                />
            </div>
            <button onClick={clickSubmit} className="btn btn-primary">Submit</button>
        </form>
    )

const showError=()=>(
    <div className="alert alert-danger" style={{display:error?'':'none'}}>
        {error}
    </div>
)

const showLoading=()=>(
    loading && (
        <div className="alert alert-info">
            <h2>Loading...</h2>
        </div>
    )
)

const redirectUser=()=>{
    if(redirectToReferrer){
      if(user){
        return <Redirect to="/user/dashboard" />
      }
}
if(isAuthenticated()){
    return <Redirect to='/' />
}
}

    return(
    <Layout 
    title="Signin" 
    description="Signin to Node React E-commerce App"
    className="container col-md-8 offset-md-2"
    >
        {showLoading()}
        {showError()}
        {signUpForm()}
        {redirectUser()}

    </Layout>
    )
}

export default Signin;