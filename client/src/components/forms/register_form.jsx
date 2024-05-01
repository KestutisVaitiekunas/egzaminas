import '../../App.css'
import EmailInput from '../inputs/email'
import PasswordInput from '../inputs/password'
import UsernameInput from '../inputs/username'

const RegisterForm = (props) => {

    return (
        <div className='login-form border rounded-3 d-flex flex-column aline-items-center mx-auto pt-4 px-5'>
            <UsernameInput />
            <EmailInput />
            <PasswordInput label="Password"/>
            <PasswordInput label="Password confirmation"/>
            <button type="submit" className="btn btn-primary btn-sm rounded-pill mx-auto my-4 w-auto px-4">Sign in</button>
            <p className="mx-auto mt-3">Have an account? <a href="/login">Sign in</a></p>
        </div>
    )
}

export default RegisterForm