import React from 'react'
import Loader from 'react-loader-spinner'

const Spinner = ({message}) => {
    return (
        <div className="flex flex-col justify-center items-center w-full h-full">
            <Loader
                type="Circles"
                color="#00BFFF"
                height={100}
                weidth={200}
                className="m-5 mt-10"
            />
            <p className="text-lg text-gray-500 text-center px-2">{message}</p>
        </div>
    )
}

export default Spinner