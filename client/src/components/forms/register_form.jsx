import Axios from 'axios';
import '../../App.css';
import EmailInput from '../inputs/email';
import PasswordInput from '../inputs/password';
import UsernameInput from '../inputs/username';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterForm = (props) => {
    const navigate = useNavigate();

    const [usernameValue, setUsernameValue] = useState("");
    const [emailValue, setEmailValue] = useState("");
    const [passwordValue, setPasswordValue] = useState("");
    const [passConfirmValue, setPassConfirmValue] = useState("");

    const [usernameErrors, setUsernameErrors] = useState([]);
    const [emailErrors, setEmailErrors] = useState([]);
    const [passwordErrors, setPasswordErrors] = useState([]);
    const [passConfirmErrors, setPassConfirmErrors] = useState([]);

    function handleUsernameValue(value) {setUsernameValue(value)};
    function handleEmailValue(value) {setEmailValue(value)};
    function handlePasswordValue(value) {setPasswordValue(value)};
    function handlePassConfirmValue(value) {setPassConfirmValue(value)};


    async function handleSubmit(e) {

        setUsernameErrors([]);
        setEmailErrors([]);
        setPasswordErrors([]);
        setPassConfirmErrors([]);
        e.preventDefault();
        try {
            const payload = { 
                username: usernameValue, 
                email: emailValue, 
                password: passwordValue, 
                confirm_password: passConfirmValue 
            }
            const response = await Axios.post( 'http://localhost:4000/api/auth/register', payload );
            const data = response.data.data
            // console.log(data)
            if ("token" in data) {
                await localStorage.setItem("Access_token", data.token)
            }
            navigate('/profile');
        } catch (error) {
            const errors = error.response.data.data.message
            // console.log(errors)
            errors.hasOwnProperty('username') ? setUsernameErrors(errors.username) : setUsernameErrors([])
            errors.hasOwnProperty('email') ? setEmailErrors(errors.email) : setEmailErrors([]);
            errors.hasOwnProperty('password') ? setPasswordErrors(errors.password) : setPasswordErrors([]);
            errors.hasOwnProperty('confirm_password') ? setPassConfirmErrors(errors.confirm_password) : setPassConfirmErrors([]);
        }
    }

    return (
        <div className='login-form border rounded-3 d-flex flex-column aline-items-center mx-auto pt-4 px-5'>
            <UsernameInput value={handleUsernameValue} validationErrors={usernameErrors}/>
            <EmailInput value={handleEmailValue} validationErrors={emailErrors}/>
            <PasswordInput 
                label="Password" 
                value={handlePasswordValue} 
                id="passwordInput" 
                validationErrors={passwordErrors}/>
            <PasswordInput 
                label="Password confirmation" 
                value={handlePassConfirmValue} 
                id="passConfirmInput" 
                validationErrors={passConfirmErrors}/>
            <button 
                type="submit" 
                className="btn btn-primary btn-sm rounded-pill mx-auto my-4 w-auto px-4"
                onClick={ handleSubmit }>
                    Sign in
            </button>
            <p className="mx-auto mt-3">Have an account? <a href="/login">Sign in</a></p>
        </div>
    )
}

export default RegisterForm