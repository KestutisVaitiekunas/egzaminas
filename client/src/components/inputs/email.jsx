

const EmailInput = (props) => {
    
    function handleValueChange(e) {
        props.value(e.target.value)
    }

    return (
        <div className="form-floating w-100 mx-auto d-flex border border-top-0 border-end-0 border-start-0 rounded-0 mb-1">
            <input 
                type="email" 
                className="form-control form-control-sm border-0 px-0 pb-0 fs-5" 
                id="emailInput"
                onChange={handleValueChange}
                placeholder="Enter your email"
                > 
            </input>
            <label className="px-0" htmlFor="emailInput"><i className="bi bi-envelope"></i> Email address</label>
        </div>
    )
}

export default EmailInput