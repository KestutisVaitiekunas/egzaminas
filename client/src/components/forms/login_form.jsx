import '../../App.css';
import EmailInput from '../inputs/email';
import PasswordInput from '../inputs/password';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';

const RegisterForm = (props) => {
    const navigate = useNavigate();

    const [emailValue, setEmailValue] = useState("");
    const [passwordValue, setPasswordValue] = useState("");

    const [emailErrors, setEmailErrors] = useState([]);
    const [passwordErrors, setPasswordErrors] = useState([]);

    function handleEmailValue(value) {setEmailValue(value)};
    function handlePasswordValue(value) {setPasswordValue(value)};

    async function handleSubmit(e) {
        setEmailErrors([]);
        setPasswordErrors([]);

        e.preventDefault();
        try {
            const payload = { 
                email: emailValue, 
                password: passwordValue, 
            }
            const response = await Axios.post( 'http://localhost:4000/api/auth/login', payload );
            const data = response.data.data
            if ("token" in data) {
                await localStorage.setItem("Access_token", data.token)
            }
            navigate(`/profile/${data.user.id}`);
        } catch (error) {
            const errors = error.response.data.data.message
            errors.hasOwnProperty('email') && setEmailErrors(errors.email);
            errors.hasOwnProperty('password') && setPasswordErrors(errors.password);
        }
    }
    return (
        <div className='login-form border rounded-3 d-flex flex-column aline-items-center mx-auto pt-4 px-5'>
            <EmailInput value={handleEmailValue} validationErrors={emailErrors}/>
            <PasswordInput label="Password" value={handlePasswordValue} validationErrors={passwordErrors}/>
            <button 
                type="submit" 
                className="btn btn-primary btn-sm rounded-pill mx-auto my-4 w-auto px-4"
                onClick={ handleSubmit }>
                    Sign in
            </button>
            <p className="mx-auto mt-3">Don't have an account? <a href="/register">Sign up</a></p>
        </div>
    )
}

export default RegisterForm