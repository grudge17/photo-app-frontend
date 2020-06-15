import {API} from "../config"

export const signup=user=>{
    
    return fetch(`${API}/signup`,{
        method:"POST",
        headers:{
             Accept:'application/json',
             "Content-Type":'application/json'
        },
        body:JSON.stringify(user)
    })
    .then(response=>{
        return response.json();
    })
    .catch(err=>{
        console.log(err)
    })
}
export const signin=user=>{
    
    return fetch(`${API}/signin`,{
        method:"POST",
        headers:{
             Accept:'application/json',
             "Content-Type":'application/json'
        },
        body:JSON.stringify(user)
    })
    .then(response=>{
        return response.json();
    })
    .catch(err=>{
        console.log(err)
    })
}

export const aunthenticate=(data,next)=>{
    if(typeof window !== 'undefined'){
        localStorage.setItem('jwt',JSON.stringify(data))
        next()
    }
}

export const signout=(next)=>{
    if(typeof window !== 'undefined'){
        localStorage.removeItem('jwt')
        next()
        return fetch(`${API}/signout`,{
            method:'GET',
        })
        .then(response=>{
            console.log('signout',response)
        })
        .catch(err=>console.log(err))
    }
}

export const isAuthenticated=()=>{
    if(typeof window =='undefined'){
        return false
    }
    if(localStorage.getItem('jwt')){
        return JSON.parse(localStorage.getItem('jwt'))
    }else{
        return false
    }

}

// export const addPic=(userId,token,image)=>{
//     return fetch(`${API}/image/upload/${userId}`,{
//         method:'POST',
//         headers:{
//             Accept:'application/json',
//             Authorization:`Bearer ${token}`
//         },
//         body:image
//     })
//     .then(response=>{
//         return response.json()
//     })
//     .catch(err=>{
//         console.log(err)
//     })
// }

export const addPic=(userId,token,image)=>{
    const formData = new FormData();
    formData.append("file", image);
    
    return fetch(`${API}/image/upload/${userId}`,{
        method:'POST',
        headers:{
            Accept:'application/json',
            Authorization:`Bearer ${token}`
        },
        body:formData
    })
    .then(response=>{
        return response.json()
    })
    .catch(err=>{
        console.log(err)
    })
}