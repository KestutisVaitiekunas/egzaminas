import '../../App.css'
import EmailInput from '../inputs/email'
import PasswordInput from '../inputs/password'

const LoginForm = (props) => {

    return (
        <div className='login-form border rounded-3 d-flex flex-column aline-items-center mx-auto pt-4 px-5'>
            <EmailInput />
            <PasswordInput />
            <button type="submit" className="btn btn-primary btn-sm rounded-pill mx-auto my-4 w-auto px-4">Sign in</button>
            <p className="mx-auto mt-3">Don't have an account? <a href="/register">Sign up</a></p>
        </div>
    )
}

export default LoginForm