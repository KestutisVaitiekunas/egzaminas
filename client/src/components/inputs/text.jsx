import "../../App.css"

const TextInput = (props) => {
    function handleValueChange(event) {
        props.value(event.target.value);
    }
    return (
        <div className="d-flex flex-column ">
            <div className="form-floating w-100 mx-auto d-flex border border-top-0 border-end-0 border-start-0 rounded-0 mb-1">
                <input 
                    type="text" 
                    className="form-control form-control-sm border-0 px-0 pb-0 fs-5" 
                    id="textInput"
                    onChange={handleValueChange}
                    placeholder="Enter some text"
                    >                       
                </input>
                <label className="px-0" htmlFor="textInput" >{props.label}</label>
            </div>
            {props.validationErrors  && props.validationErrors.map(
                (error, index) => <p key={index} className="form-error  text-danger mb-0">{error}</p>
            )}
        </div>
    )
}

export default TextInput