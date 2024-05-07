import { useNavigate, useParams } from 'react-router-dom';

const Template = (props) => {
    const navigate = useNavigate();

    const handleLoggin = () => {
        navigate('/login')
     }

    return (
        <div className="App-header container-fluid text-center grid bg-secondary">
            <div className="row">
                <h1 className="col-12 col-md-10">Renginiorama!</h1>
                {!props.loggedIn && <button  
                    className="col-12 col-md-2 btn btn-primary btn-sm rounded-pill mx-auto my-4 w-auto px-4 justify-self"
                    onClick={ handleLoggin}    
                > Login </button>}
            </div>

        </div>
    )
}

export default Template