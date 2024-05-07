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

    const [categories, setCategories] = useState([]);
    const [selectedValue, setSelectedValue] = useState("");

    const [titleValue, setTitleValue] = useState("");
    const [descriptionValue, setDescriptionValue] = useState("");
    const [locationValue, setLocationValue] = useState("");

    const [files, setFiles] = useState([]);

    const [titleErrors, setTitleErrors] = useState([]);
    const [descriptionErrors, setDescriptionErrors] = useState([]);
    const [locationErrors, setLocationErrors] = useState([]);

    function handleTitleValue(value) {setTitleValue(value)};
    function handleDescriptionValue(value) {setDescriptionValue(value)};
    function handleLocationValue(value) {setLocationValue(value)};


    async function handleSubmit(e) {

        setTitleErrors([]);
        setDescriptionErrors([]);
        setLocationErrors([]);
        e.preventDefault();

        const formData = new FormData();
        formData.append('category_id', selectedValue);
        formData.append('id', params.id);
        formData.append('title', titleValue);
        formData.append('description', descriptionValue);
        formData.append('file', files[0]);
        try {
            const response = await Axios.post( 'http://localhost:4000/api/event', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            } );
        } catch ( error ) {
            const errors = error.response.data
            errors.hasOwnProperty('title') && setTitleErrors(errors.title)
            errors.hasOwnProperty('location') && setTitleErrors(errors.title)
            errors.hasOwnProperty('description') && setTitleErrors(errors.title)
        }
    }

    useEffect (() => {
        const getCategories = async () => {
            try {
                const response = await Axios.get( 'http://localhost:4000/api/event/categories' );
                setCategories(response.data.data)
            } catch ( error ) {
                console.log(error)
            }
        }
        getCategories()
    },[])

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };
    return (
        <div className='login-form border rounded-3 d-flex flex-column aline-items-center mx-auto pt-4 px-5'>
            <TextInput value={handleTitleValue} validationErrors={titleErrors} label="Title"/>
            <TextInput value={handleLocationValue} validationErrors={locationErrors} label="Location"/>
            <select className="form-select" aria-label="Default select example" value={selectedValue} onChange={handleChange}>
                {categories.map( (category, index) => <option key={index} value={category._id}>{category.name}</option>)}
            </select>
            {/* <Calendar /> */}
            <DescriptionInput value={handleDescriptionValue} validationErrors={descriptionErrors} label="Description"/>
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