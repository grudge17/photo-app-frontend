import React,{useEffect,useState,useCallback} from 'react'
import Layout from '../core/Layout'
import {isAuthenticated} from '../auth'
import{Link} from 'react-router-dom'
import {addPic} from '../auth/index'
import Dropzone from 'react-dropzone'
import ProgressBar from 'react-bootstrap/ProgressBar'
import "../styles.css"

const AddPhoto=()=>{

    // const maxSize = 1048576;
    const [fileNames, setFileNames] = useState([]);
    const[uploadPercentage,setUploadPercentage]= useState([]);
    const { user, token } = isAuthenticated();
   
    const handleDrop = acceptedFiles =>{
    setFileNames(acceptedFiles.map(file => file.name));
    acceptedFiles.forEach(element => {
        addPic(user._id, token, element).then(data => {
            if (data.error) {
            //    setValues({ ...values, error: data.error });
            } else {
                // setValues({
                //     ...values,
                //     title: '',
                //     description: '',
                //     photo: '',
                //     tags: '',
                //     loading: false,
                //     createdImage: data.name
                // });
            }
        });
    });
    }


  
  
  return (
    <Layout title="Add Images" description={`G'day ${user.name}, ready to add images?`}>
    <div className="container text-center mt-5">
      <Dropzone
        onDrop={handleDrop}
        accept="image/*"
        minSize={1024}
        maxSize={3072000}
      >
        {({
          getRootProps,
          getInputProps,
          isDragActive,
          isDragAccept,
          isDragReject
        }) => {
          // additional CSS depends on dragging status
          const additionalClass = isDragAccept
            ? "accept"
            : isDragReject
            ? "reject"
            : "";

          return (
            <div
              {...getRootProps({
                className: `dropzone ${additionalClass}`
              })}
            >
              <input {...getInputProps()} />
              <span>{isDragActive ? "📂" : "📁"}</span>
              <p>Drag'n'drop images, or click to select files</p>
            </div>
          );
        }}
      </Dropzone>
      <div>
        <strong>Files:</strong>

        <ul className="list-group mt-2">
  {fileNames.length > 0 && fileNames.map(fileName => (
    <li className="list-group-item list-group-item-success" key={fileName}>
      {fileName}
    </li>
    
  ))}
</ul>

    
      </div>
    </div>
    </Layout>
  );
}
  
export default AddPhoto;










