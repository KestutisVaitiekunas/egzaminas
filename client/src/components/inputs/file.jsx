import { useState } from 'react'
import Dropzone from 'react-dropzone'
import '../../App.css'

const FileInput = () => {

    const [files, setFiles] = useState([]);
    const [error, setError] = useState("");
    console.log(files);

    const onDrop = (acceptedFiles) => {
        const droppedFiles = acceptedFiles.map(file => Object.assign(file, {
            preview: URL.createObjectURL(file)
        }));
        if (files.length < 6) {
            setFiles(prevFiles => [...prevFiles, ...droppedFiles]);
        } else {
            setError( " You can only upload a maximum of 5 files");
        }
    };
    const handleDelThumbnail = (file) => {
        setFiles(files.filter(f => f.name !== file.name))
        console.log(files);
        setError("")
    };

    return (
        <>
            <Dropzone 
                onDrop={onDrop} 
                accept={{'image/jpg': ['.jpg'], 'image/png': ['.png'], 'image/jpeg': ['.jpeg']}}
                maxSize={ 500000 }
                name="file"
            >
                {({getRootProps, getInputProps}) => (
                    <section className='border border-dark rounded p-1' >
                        <div {...getRootProps()}>
                            <input className='bg-light border-0' {...getInputProps()} />
                            <p className="text-center mb-1 bg-light dropzone">Drag 'n' drop some files here, or click to select files</p>
                            <hr className="my-1"></hr>
                        </div>
                        <div className="thumbnail d-flex flex-wrap position-relative">
                            {files && files.map(file => (
                                <div  key={file.name} className='m-1 position-relative'>
                                    <img className='border rounded' src={file.preview} alt="preview" width={"80px"} height={"80px"}/>
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