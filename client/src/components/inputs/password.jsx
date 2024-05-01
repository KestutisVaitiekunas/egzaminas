import { useState } from 'react'
import "../../App.css"

const PasswordInput = (props) => {

    const [type, setType] = useState("password")

    function handleClick() {
        setType(type === "password" ? "text" : "password")
    }

    return (
        <div className="form-floating w-100 mx-auto d-flex border border-top-0 border-end-0 border-start-0 rounded-0 mb-1">
                <input 
                    type={type} 
                    className="form-control form-control-sm border-0 px-0 pb-0 fs-5" 
                    id="floatingInput" 
                    placeholder="name@example.com">                       
                </input>
                <label className="ps-0" for="floatingInput"><i className="bi bi-key"></i> {props.label}</label>
                {type === "password" && <i className="bi bi-eye mt-4" onClick={handleClick}></i>}
                {type === "text" && <i className="bi bi-eye-slash mt-4" onClick={handleClick}></i>}
        </div>
    )
}

export default PasswordInput