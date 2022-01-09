import React from 'react'
import { urlFor } from '../client'

const Pin = (props) => {

    const pin = props.item

    return (
        <div>
            <img 
                className="rounded-lg w-full shadow-md" 
                src={urlFor(pin.image.asset._ref).width(250).url()} 
                alt="user-post"
            />  
        </div>
    )
}

export default Pin