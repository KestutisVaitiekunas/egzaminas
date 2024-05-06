import { useState } from 'react'
import Dropzone from 'react-dropzone'
import '../../App.css'

const FileInput = ({onFileChange}) => {

    const [files, setFiles] = useState([]);
    const [error, setError] = useState("");

    const handleOnDrop = (acceptedFiles) => {
        const droppedFiles = acceptedFiles.map(file => Object.assign(file, {
            preview: URL.createObjectURL(file)
        }));
        if (files.length < 1) {
            setFiles(prevFiles => [...prevFiles, ...droppedFiles]);
            onFileChange(prevFiles => [...prevFiles, ...droppedFiles]);
        } else {
            setError( " You can only upload a single image");
        }
    };
    const handleDelThumbnail = (file) => {
        setFiles(files.filter(f => f.name !== file.name))
        onFileChange(files.filter(f => f.name !== file.name))
        setError("")
    };

    return (
        <>
            <Dropzone 
                onDrop={handleOnDrop} 
                accept={{'image/jpg': ['.jpg'], 'image/png': ['.png'], 'image/jpeg': ['.jpeg'], 'image/webp': ['.webp']}}
                maxSize={ 500000 }
                name="file"
            >
                {({getRootProps, getInputProps}) => (
                    <section className='border border-dark rounded p-1' >
                        <div {...getRootProps()}>
                            <input className='bg-light border-0' {...getInputProps()} />
                            <p className="text-center mb-1 bg-light dropzone">Drag 'n' drop your photo here, or click to select one</p>
                            <hr className="my-1"></hr>
                        </div>
                        <div className="thumbnail d-flex flex-wrap justify-content-center position-relative">
                            {files && files.map(file => (
                                <div  key={file.name} className='m-1 position-relative'>
                                    <img className='border rounded' src={file.preview} alt="preview" width={"250px"} height={"250px"}/>
                                    <i 
                                        className="bi bi-x-square position-absolute top-0 end-0 text-danger"
                                        onClick={() => handleDelThumbnail(file)}    
                                    ></i>
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </Dropzone>
            {error && <p className="text-danger">{error}</p>}
        </>
    )
}

export default FileInput