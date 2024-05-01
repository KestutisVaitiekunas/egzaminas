

const UsernameInput = (props) => {

    return (
        <div className="form-floating w-100 mx-auto d-flex border border-top-0 border-end-0 border-start-0 rounded-0 mb-1">
            <input 
                type="text" 
                className="form-control form-control-sm border-0 px-0 pb-0 fs-5" 
                id="floatingInput" 
                placeholder="name@example.com">                       
            </input>
            <label className="px-0" for="floatingInput"><i class="bi bi-person"></i> Username</label>
        </div>
    )
}

export default UsernameInput