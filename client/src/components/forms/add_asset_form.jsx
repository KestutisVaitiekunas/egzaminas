import Axios from 'axios';
import '../../App.css';
import TextInput from '../inputs/text';
import DescriptionInput from '../inputs/description';
import FileInput from '../inputs/file';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const AddAssetForm = (props) => {
    const navigate = useNavigate();
    const params  = useParams();

    const [titleValue, setTitleValue] = useState("");
    // const [emailValue, setEmailValue] = useState("");

    const [files, setFiles] = useState([]);

    const [titleErrors, setTitleErrors] = useState([]);
    // const [emailErrors, setEmailErrors] = useState([]);

    function handleTitleValue(value) {setTitleValue(value)};
    // function handleEmailValue(value) {setEmailValue(value)};


    async function handleSubmit(e) {

        setTitleErrors([]);
        // setEmailErrors([]);
        e.preventDefault();

        console.log(files);
        const formData = new FormData();
        formData.append('id', params.id);
        formData.append('title', titleValue);
        // formData.append('description', descriptionValue);
        formData.append('file', files[0]);
        for (let entry of formData.entries()) {
            console.log(entry);
          }
        try {
            const response = await Axios.post( 'http://localhost:4000/api/asset', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            } );
            console.log(response.data);
        } catch ( error ) {
            const errors = error.response.data
            console.log(errors)
            errors.hasOwnProperty('title') && setTitleErrors(errors.title)
            // errors.hasOwnProperty('email') ? setEmailErrors(errors.email) : setEmailErrors([]);
        }
        // try {
        //     // const payload = { 
        //     //     username: usernameValue, 
        //     //     email: emailValue, 
        //     // }


        //     const response = await Axios.post( 'http://localhost:4000/api/auth/register', payload );
        //     const data = response.data.data
        //     // console.log(data)
        //     if ("token" in data) {
        //         await localStorage.setItem("Access_token", data.token)
        //     }
        //     navigate(`/profile/${ data.user.id }`);
        // } catch (error) {
        //     const errors = error.response.data.data.message
        //     // console.log(errors)
        //     // errors.hasOwnProperty('username') ? setUsernameErrors(errors.username) : setUsernameErrors([])
        //     // errors.hasOwnProperty('email') ? setEmailErrors(errors.email) : setEmailErrors([]);
        // }
    }


    return (
        <div className='login-form border rounded-3 d-flex flex-column aline-items-center mx-auto pt-4 px-5'>
            <TextInput value={handleTitleValue} validationErrors={titleErrors} label="Title"/>
            {/* <DescriptionInput value={handleEmailValue} validationErrors={emailErrors} label="Description"/> */}
            <FileInput  onFileChange={(files) => setFiles(files)}/>
            <button 
                type="submit" 
                className="btn btn-primary btn-sm rounded-pill mx-auto my-4 w-auto px-4"
                onClick={ handleSubmit }>
                    Submit
            </button>
        </div>
    )
}

export default AddAssetForm