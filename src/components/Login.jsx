import React from 'react'
import video from '../assets/video.mp4'
import { SiPhotopea } from "react-icons/si";
import { ImGoogle3 } from "react-icons/im";
import GoogleLogin from "react-google-login";

const Login = () => {

    const responseGoogle = (response) => {
      console.log(response);
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
              <SiPhotopea className="text-white w-20 h-14" />
              <p className="text-white text-3xl font-bold">Shareme</p>
            </div>

            <div className="shadow-2xl">
              <GoogleLogin
                clientId=""
                render={(renderProps) => (
                  <button
                    className="bg-mainColor flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none ml-2"
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                  >
                    <ImGoogle3 className="mr-4 font-bold text-gray-700" />
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
