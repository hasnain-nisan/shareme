import React from 'react'
import video from '../assets/video.mp4'
import { SiPhotopea } from "react-icons/si";
import { ImGoogle2 } from "react-icons/im";
import GoogleLogin from "react-google-login";
import {client} from '../client'
import {useNavigate} from 'react-router-dom'

const Login = () => {
    const navigate = useNavigate()
    const responseGoogle = (response) => {
      localStorage.setItem('user', JSON.stringify(response?.profileObj))
      const {name, googleId, imageUrl} = response?.profileObj
      const doc = {
        _id:googleId,
        _type: 'user',
        userName: name,
        image: imageUrl
      }
      client.createIfNotExists(doc)
        .then(() => {
          navigate('/', {replace: true})
        })
    };

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
              <SiPhotopea className="text-purple-600 w-20 h-14" />
              <p className="text-purple-600 text-3xl font-bold">Shareme</p>
            </div>

            <div className="shadow-2xl">
              <GoogleLogin
                clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}
                render={(renderProps) => (
                  <button
                    className="bg-blue-200 flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none ml-2"
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                  >
                    <ImGoogle2 className="mr-4 font-bold text-gray-700 text-xl rounded" />
                    <p className="drop-shadow-xl text-sm font-bold text-gray-700">
                      Sign in with google
                    </p>
                  </button>
                )}
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy="single_host_origin"
              />
            </div>
          </div>
        </div>
      </div>
    );
}

export default Login
