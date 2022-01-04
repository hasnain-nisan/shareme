import React from 'react'
import video from '../assets/video.mp4'
import {SiPhotopea} from 'react-icons/si'

const Login = () => {
    return (
      <div className="flex flex-col justify-start items-center h-screen">
        <div className="relative h-full w-full">
          <video
            src={video}
            type="video/mp4"
            loop
            controls={false}
            muted
            autoPlay
            className="w-full h-full object-cover"
          />
          <div className="absolute flex flex-col items-center justify-center top-0 bottom-0 left-0 right-0 bg-blackOverlay">
            <div className="p-5 flex items-center">
              <SiPhotopea className="text-white w-20 h-14"/>
              <p className="text-white text-3xl font-bold">Shareme</p>
            </div>
          </div>
        </div>
      </div>
    );
}

export default Login
