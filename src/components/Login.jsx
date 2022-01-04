import React from 'react'
import {SiPhotopea} from 'react-icons/si'
import Video from '../assets/login_video.mp4'
import GoogleLogin from 'react-google-login';

const Login = () => {
    return (
        <div className="flex flex-col justify-start items-center h-screen">
            <div className="relative h-full w-full">
                <video 
                    src={Video}
                    type="video/mp4"
                    loop
                    controls={false}
                    muted
                    autoPlay
                    className="w-full h-full object-cover"
                />
                <div className="absolute flex flex-col justify-center items-center top-0 bottom-0 left-0 right-0 bg-blackOverlay">
                    <div className="p-5 flex items-center">
                        <SiPhotopea className="text-white mr-1 h-10 w-20" />
                        <p className="text-white text-3xl font-bold">Shareme</p>
                    </div>
                    <div className="shadow-2xl">
                        <GoogleLogin
                            clientId=''
                            render={(renderProps) => {
                                <button
                                    type='button'
                                    className="bg-mainColor"
                                >

                                </button>
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
