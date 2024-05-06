import Axios from 'axios';
import '../../App.css';
import TextInput from '../inputs/text';
import DescriptionInput from '../inputs/description';
import FileInput from '../inputs/file';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddAssetForm = (props) => {
    const navigate = useNavigate();

    const [usernameValue, setUsernameValue] = useState("");
    const [emailValue, setEmailValue] = useState("");

    const [usernameErrors, setUsernameErrors] = useState([]);
    const [emailErrors, setEmailErrors] = useState([]);

    function handleUsernameValue(value) {setUsernameValue(value)};
    function handleEmailValue(value) {setEmailValue(value)};


    async function handleSubmit(e) {

        setUsernameErrors([]);
        setEmailErrors([]);
        e.preventDefault();
        try {
            const payload = { 
                username: usernameValue, 
                email: emailValue, 
            }
            const response = await Axios.post( 'http://localhost:4000/api/auth/register', payload );
            const data = response.data.data
            // console.log(data)
            if ("token" in data) {
                await localStorage.setItem("Access_token", data.token)
            }
            navigate(`/profile/${ data.user.id }`);
        } catch (error) {
            const errors = error.response.data.data.message
            // console.log(errors)
            errors.hasOwnProperty('username') ? setUsernameErrors(errors.username) : setUsernameErrors([])
            errors.hasOwnProperty('email') ? setEmailErrors(errors.email) : setEmailErrors([]);
        }
    }


    return (
        <div className='login-form border rounded-3 d-flex flex-column aline-items-center mx-auto pt-4 px-5'>
            <TextInput value={handleUsernameValue} validationErrors={usernameErrors} label="Title"/>
            <DescriptionInput value={handleEmailValue} validationErrors={emailErrors} label="Description"/>
            <FileInput />
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