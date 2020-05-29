import React,{useEffect,useState} from 'react'
import Layout from '../core/Layout'
import {isAuthenticated} from '../auth'
import{Link} from 'react-router-dom'
import {addPic} from '../auth/index'

const AddPhoto=()=>{
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
                    <input onChange={handleChange('photo')} type="file" name="photo" accept="image/*" />
                </label>
            </div>

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

    return (
        <Layout title="Add Images" description={`G'day ${user.name}, ready to add images?`}>
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {showLoading()}
                    {showSuccess()}
                    {showError()}
                    {newPostForm()}
                </div>
            </div>
        </Layout>
    );
};

export default AddPhoto;