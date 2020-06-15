import React,{useEffect,useState} from 'react'
import Layout from '../core/Layout'
import {isAuthenticated} from '../auth'
import{Link} from 'react-router-dom'
import {addPic} from '../auth/index'
import Dropzone from "react-dropzone";
//import UploadProgressBar from './UploadProgressBar'
import "../styles.css"

const AddPhoto2=()=>{
    const [values, setValues] = useState({
        title: '',
        description: '',
        photo: '',
        tags:'',
        uploadedBy:'',
        loading: false,
        error: '',
        createdImage: '',
        //redirectToProfile: false,
        formData: ''
    });
    const {
        title,
        description,
        photo,
        tags,
        uploadedBy,
        loading,
        error,
        createdImage,
        //redirectToProfile: false,
        formData
    }=values;




    const { user, token } = isAuthenticated();

    useEffect(() => {  // this is used to grab the details from the browser
        setValues({...values,formData:new FormData()})
    },[] )


    const handleChange = name => event => {
        const value = name === 'photo' ? event.target.files[0] : event.target.value;
        formData.set(name, value);
        setValues({ ...values, [name]: value });
    };



    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: '', loading: true });

        addPic(user._id, token, formData).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({
                    ...values,
                    title: '',
                    description: '',
                    photo: '',
                    tags: '',
                    loading: false,
                    createdImage: data.name
                });
            }
        });
    };
    
      

    const newPostForm = () => (

        <form className="mb-3" onSubmit={clickSubmit}>
           
            <h4>Post Photo</h4>
            <div className="form-group">
                <label className="btn btn-secondary">
                    <input onChange={handleChange('photo')} type="file" name="photo" accept="image/*" multiple />
                </label>
            </div>
           

            <div className="column"></div> 
            <div className="form-group">
                <label className="text-muted">Title</label>
                <input onChange={handleChange('title')} type="text" className="form-control" value={title} />
            </div>

            <div className="form-group">
                <label className="text-muted">Description</label>
                <textarea onChange={handleChange('description')} className="form-control" value={description} />
            </div>
            <div className="form-group">
                <label className="text-muted">Tags</label>
                <input onChange={handleChange('tags')} type="text" className="form-control" value={tags} />
            </div>
            {/* <div className="form-group">
                <label className="text-muted">Uploaded By</label>
                <input type="hidden" className="form-control" value= {user._id} />
            </div> */}

           

            <button className="btn btn-outline-primary">Add Image</button>
           
        </form>
        
    );


   


    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );

    const showSuccess = () => (
        <div className="alert alert-info" style={{ display: createdImage ? '' : 'none' }}>
            <h2>{`${createdImage}`} is added!</h2>
        </div>
    );

    const showLoading = () =>
        loading && (
            <div className="alert alert-success">
                <h2>Loading...</h2>
            </div>
        );

        ////////////////////////////////////////////////////////////////////////////

        const handleFiles = (files) => {
            files = [...files]
            initializeProgress(files.length)
         //   files.forEach(uploadFile)
            files.forEach(previewFile)
          }

          const  previewFile=(file)=> {
                let reader = new FileReader()
                reader.readAsDataURL(file)
                reader.onloadend = function() {
                    let img = document.createElement('img')
                    img.src = reader.result
                    document.getElementById('gallery').appendChild(img)
                }
}
        
          const initializeProgress = (numFiles)=> {
            progressBar.value = 0
            uploadProgress = []
          
            for(let i = numFiles; i > 0; i--) {
              uploadProgress.push(0)
            }
          }
          function updateProgress(fileNumber, percent) {
            uploadProgress[fileNumber] = percent
            let total = uploadProgress.reduce((tot, curr) => tot + curr, 0) / uploadProgress.length
            console.debug('update', fileNumber, percent, total)
            progressBar.value = total
          }
          const uploadFile = (file, i)=> {
            var url = 'http://localhost:8000/upload/'
            var xhr = new XMLHttpRequest()
            var formData = new FormData()
            xhr.open('POST', url, true)
            xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest')
          
            // Update progress (can be used to show progress indicator)
            xhr.upload.addEventListener("progress", function(e) {
              updateProgress(i, (e.loaded * 100.0 / e.total) || 100)
            })

          
            xhr.addEventListener('readystatechange', function(e) {
              if (xhr.readyState === 4 && xhr.status === 200) {
                updateProgress(i, 100) // <- Add this
              }
              else if (xhr.readyState === 4 && xhr.status !== 200) {
                // Error. Inform the user
              }
            })
          
            formData.append('upload_preset', 'ujpu6gyk')
            formData.append('file', file)
            xhr.send(formData)
          }

          let uploadProgress = []
          let progressBar = document.createElement('progress-bar')

   const dragDrop = () => (

    <div id="drop-area">
    <form class="my-form">
      <p>Upload multiple files with the file dialog or by dragging and dropping images onto the dashed region</p>
      <input type="file" id="fileElem" multiple accept="image/*" onChange={handleFiles('files')}/>
      <label class="button" for="fileElem">Select some files</label>
     
    </form>
    <progress id="progress-bar" max={100} value={0}> </progress>
    <div id="gallery" />
  </div>
);

            
    return (
        <Layout title="Add Images" description={`G'day ${user.name}, ready to add images?`}>
            <div className="row">
                <div className="col-md-8 offset-md-2">
                   {dragDrop()}
                </div>
            </div>
        </Layout>
    )
}
    

export default AddPhoto2;










