import '../../App.css';
import EmailInput from '../inputs/email';
import PasswordInput from '../inputs/password';
import UsernameInput from '../inputs/username';
import { useState } from 'react';

const RegisterForm = (props) => {

    const [usernameValue, setUsernameValue] = useState("");
    const [emailValue, setEmailValue] = useState("");
    const [passwordValue, setPasswordValue] = useState("");
    const [passConfirmValue, setPassConfirmValue] = useState("");

    function handleUsernameValue(value) {setUsernameValue(value)};
    function handleEmailValue(value) {setEmailValue(value)};
    function handlePasswordValue(value) {setPasswordValue(value)};
    function handlePassConfirmValue(value) {setPassConfirmValue(value)};


    function handleSubmit(e) {
        e.preventDefault();
        console.log(usernameValue, emailValue, passwordValue, passConfirmValue)
    }

    return (
        <div className='login-form border rounded-3 d-flex flex-column aline-items-center mx-auto pt-4 px-5'>
            <UsernameInput value={handleUsernameValue} />
            <EmailInput value={handleEmailValue}/>
            <PasswordInput label="Password" value={handlePasswordValue} id="passwordInput"/>
            <PasswordInput label="Password confirmation" value={handlePassConfirmValue} id="passConfirmInput"/>
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