import React from 'react'
import { urlFor } from '../client'

const Pin = ({pin: {posetBy, image, _id, destination}}) => {
    return (
        <div>
            <img 
                className="rounded-lg w-full shadow-md" 
                src={urlFor(image).width(250).url} 
                alt="user-post"
            />  
        </div>
    )
}

export default Pin