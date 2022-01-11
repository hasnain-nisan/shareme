import React, {useState} from 'react'
import { AiOutlineCloudUpload } from 'react-icons/ai'
import {MdDelete} from 'react-icons/md'
import {useNavigate} from 'react-router-dom'
import {client} from '../client'
import Spinner from './Spinner'
import {categories} from '../utils/data'

const CreatePin = () => {

    const [title, setTitle] = useState('')
    const [about, setAbout] = useState('')
    const [destination, setDestination] = useState('')
    const [loading, setLoading] = useState(false)
    const [fields, setFields] = useState(null)
    const [category, setCategory] = useState(null)
    const [imageAsset, setImageAsset] = useState(null)
    const [wrongImageType, setWrongImageType] = useState(false)

    const navigate = useNavigate()

    const uploadImage = (e) => {
        const selectedFile = e.target.files[0];
        // uploading asset to sanity
        if (selectedFile.type === 'image/png' || selectedFile.type === 'image/svg' || selectedFile.type === 'image/jpeg' || selectedFile.type === 'image/gif' || selectedFile.type === 'image/tiff') {
          setWrongImageType(false);
          setLoading(true);
          client.assets
            .upload('image', selectedFile, { contentType: selectedFile.type, filename: selectedFile.name })
            .then((document) => {
              setImageAsset(document);
              setLoading(false);
            })
            .catch((error) => {
              console.log('Upload failed:', error.message);
            });
        } else {
          setLoading(false);
          setWrongImageType(true);
        }
      };

    return (
        <div className="flex flex-col justify-center items-center mt-5 lg:h-4/5">
            {fields && (
                <p className="text-red-500 mb-5 text-xl transition-all duration-150 ease-in">
                    Please fill in all the fields.
                </p>
            )}
            <div className="flex flex-col lg:flex-row justify-center items-center bg-white lg:p-5 p-3 lg:w-4/5 w-full rounded-lg">
                <div className="bg-secondaryColor p-3 flex flex-0.7 w-full rounded-lg">
                    <div className="flex justify-center items-center flex-col border-2 border-dotted border-gray-300 p-3 w-full h-420">
                        {loading && <Spinner/>}
                        {wrongImageType && <p>Wrong image type</p>}
                        {!imageAsset ? (
                            <label>
                                <div className="flex flex-col items-center justify-center w-full">
                                    <div className="flex flex-col items-center justify-center">
                                        <p className="font-bold text-2xl">
                                            <AiOutlineCloudUpload fontSize={40}/>
                                        </p>
                                        <p className="text-xl">Click to upload</p>
                                    </div>
                                    <p className="mt-32 text-gray-400">
                                        Use high quality JPG, SVG, PNG, GIF less than 20mb
                                    </p>
                                </div>
                                <input 
                                    type="file" 
                                    name="upload-image"
                                    onChange={uploadImage}
                                    className="w-0 h-0"
                                />
                            </label>
                        ): (
                            <div className="relative h-full">
                                <img src={imageAsset?.url} alt="uploaded"  className="h-full w-full"/>
                                <button
                                    type="button"
                                    className="absolute bottom-3 right-3 p-3 rounded-full bg-white text-xl cursor-pointer outline-none hover:shadow-md transition-all duration-500 ease-in-out"
                                    onClick={() => setImageAsset(null)}
                                >
                                    <MdDelete/>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreatePin
