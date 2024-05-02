import { useEffect } from "react";
import "../../App.css"

const UsernameInput = (props) => {

    // useEffect(() => {
    //     console.log(props.validationErrors);
    // })

    function handleValueChange(event) {
        props.value(event.target.value);
    }
    return (
        <div className="d-flex flex-column ">
            <div className="form-floating w-100 mx-auto d-flex border border-top-0 border-end-0 border-start-0 rounded-0 mb-1">
                <input 
                    type="text" 
                    className="form-control form-control-sm border-0 px-0 pb-0 fs-5" 
                    id="usernameInput"
                    onChange={handleValueChange}
                    placeholder="Enter your username"
                    >                       
                </input>
                <label className="px-0" htmlFor="usernameInput" ><i className="bi bi-person"></i> Username</label>
            </div>
            {props.validationErrors  && props.validationErrors.map(
                (error) => <p className="form-error  text-danger mb-0">{error}</p>
            )}
        </div>
    )
}

export default UsernameInput