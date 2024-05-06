import "../../App.css"

const DescriptionInput = (props) => {
    function handleValueChange(event) {
        props.value(event.target.value);
    }
    return (
        <div className="d-flex flex-column ">
            <div className="form-floating w-100 mx-auto d-flex border border-top-0 border-end-0 border-start-0 rounded-0 mb-1">
                <textarea 
                    className="form-control form-control-sm border-0 px-0 pb-0 fs-5" 
                    id="descriptionInput"
                    onChange={handleValueChange}
                    placeholder="Leave a comment here"
                    // rows="5"
                    style={{ height: "100px" }}
                    >                       
                </textarea>
                <label className="px-0" htmlFor="descriptionInput" >{props.label}</label>
            </div>
            {props.validationErrors  && props.validationErrors.map(
                (error, index) => <p key={index} className="form-error  text-danger mb-0">{error}</p>
            )}
        </div>
    )
}

export default DescriptionInput