import Axios from 'axios';
import '../../App.css';
import TextInput from '../inputs/text';
import DescriptionInput from '../inputs/description';
import FileInput from '../inputs/file';
import { useState , useEffect} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Calendar from 'react-calendar'

const AddEventForm = (props) => {
    const navigate = useNavigate();
    const params  = useParams();

    const [titleValue, setTitleValue] = useState("");
    // const [emailValue, setEmailValue] = useState("");

    const [files, setFiles] = useState([]);

    const [titleErrors, setTitleErrors] = useState([]);
    // const [emailErrors, setEmailErrors] = useState([]);

    function handleTitleValue(value) {setTitleValue(value)};
    // function handleEmailValue(value) {setEmailValue(value)};


    async function handleSubmit(e) {

        setTitleErrors([]);
        // setEmailErrors([]);
        e.preventDefault();

        console.log(files);
        const formData = new FormData();
        formData.append('id', params.id);
        formData.append('title', titleValue);
        // formData.append('description', descriptionValue);
        formData.append('file', files[0]);
        for (let entry of formData.entries()) {
            console.log(entry);
          }
        try {
            const response = await Axios.post( 'http://localhost:4000/api/asset', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            } );
            console.log(response.data);
        } catch ( error ) {
            const errors = error.response.data
            console.log(errors)
            errors.hasOwnProperty('title') && setTitleErrors(errors.title)
            // errors.hasOwnProperty('email') ? setEmailErrors(errors.email) : setEmailErrors([]);
        }
    }

    useEffect (() => {
        try {
            const response = Axios.get( 'http://localhost:4000/api/event/categories' );
            console.log(response);
        } catch ( error ) {
            console.log(error)
        }
    },[])
    return (
        <div className='login-form border rounded-3 d-flex flex-column aline-items-center mx-auto pt-4 px-5'>
            <TextInput value={handleTitleValue} validationErrors={titleErrors} label="Title"/>
            <TextInput value={handleTitleValue} validationErrors={titleErrors} label="Location"/>
            <select className="form-select" aria-label="Default select example">

                <option selected>Open this select menu</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
            </select>
            {/* <Calendar /> */}
            {/* <DescriptionInput value={handleEmailValue} validationErrors={emailErrors} label="Description"/> */}
            <FileInput  onFileChange={(files) => setFiles(files)}/>
            <button 
                type="submit" 
                className="btn btn-primary btn-sm rounded-pill mx-auto my-4 w-auto px-4"
                onClick={ handleSubmit }>
                    Submit
            </button>
        </div>
    )
}

export default AddEventForm