import React, {useState, useEffect} from 'react'
import { RiLogoutCircleFill } from "react-icons/ri";
import {useParams, useNavigate} from 'react-router-dom'
import {GoogleLogout} from 'react-google-login'

import {client} from '../client'
import {userCreatedPinsQuery, userQuery, userSavedPinsQuery} from '../utils/data'
import MasonryLayout from './MasonryLayout'
import Spinner from './Spinner'

const randomImage = 'https://source.unsplash.com/random/1600*900/?paint'

const activeBtnStyles = "bg-red-500 text-white font-bold px-2 py-1 rounded-full w-20 outline-none"
const notActiveBtnStyles = "bg-primary mr-4 text-black font-bold px-2 py-1 rounded-full w-20 outline-none";

const UserProfile = () => {

    const [user, setUser] = useState(null)
    const [pins, setPins] = useState(null)
    const [text, setText] = useState('Created')
    const [activeBtn, setActiveBtn] = useState('created')
    const navigate = useNavigate()
    const {userId} = useParams()

    useEffect(() => {
        const query = userQuery(userId)
        client.fetch(query)
            .then((data) => {
                setUser(data[0])
            })
    }, [userId])

    useEffect(() => {
        if(text === 'Created'){
            const createdPinsQuery = userCreatedPinsQuery(userId)
            client.fetch(createdPinsQuery)
                .then((data) => {
                    setPins(data)
                })
        } else {
            const savedPinsQuery = userSavedPinsQuery(userId);
            client.fetch(savedPinsQuery)
                .then((data) => {
                    setPins(data);
                });
        }
    }, [text, userId])

    const logout = () => {
        localStorage.clear()
        navigate('/login')
    }

    if(!user){
        return <Spinner message={"Loading profile..."}/>
    }

    return (
      <div className="relative pb-2 h-full justify-center items-center">
        <div className="flex flex-col pb-5">
          <div className="relative flex flex-col mb-7">
            <div className="flex flex-col justify-center items-center">
              <img
                src={randomImage}
                alt="banner"
                className="w-full h-370 2xl:h-510 shadow-lg object-cover rounded-xl"
              />
              <img
                src={user?.image}
                alt="user"
                className="rounded-full w-40 h-40 -mt-20 shadow-xl object-cover p-1 bg-white"
              />
              <h1 className="font-bold text-3xl text-center mt-3">
                {user?.userName}
              </h1>
              <div className="absolute top-0 z-1 right-0 p-2">
                {userId === user?._id && (
                  <GoogleLogout
                    clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}
                    render={(renderProps) => (
                      <button
                        className="bg-white justify-center items-center p-2 rounded-lg cursor-pointer outline-none ml-2 shadow-md"
                        onClick={renderProps.onClick}
                        disabled={renderProps.disabled}
                      >
                        <RiLogoutCircleFill className="font-bolder text-red-500 text-xl rounded" />
                      </button>
                    )}
                    onLogoutSuccess={logout}
                    cookiePolicy="single_host_origin"
                  />
                )}
              </div>
            </div>
            <div className="text-center mb-7 mt-3">
              <button
                type="button"
                onClick={(e) => {
                  setText(e.target.textContent);
                  setActiveBtn("created");
                }}
                className={`${
                  activeBtn === "created" ? activeBtnStyles : notActiveBtnStyles
                }`}
              >
                Created
              </button>
              <button
                type="button"
                onClick={(e) => {
                  setText(e.target.textContent);
                  setActiveBtn("saved");
                }}
                className={`${
                  activeBtn === "saved" ? activeBtnStyles : notActiveBtnStyles
                }`}
              >
                Saved
              </button>
              {pins?.length ? (
                <div className="px-2">
                    <MasonryLayout pins={pins}/>
                </div>
               ) : (
                <div className="flex justify-center font-bold items-center w-full text-xl mt-2">
                    No pins available!!!
                </div>
               )}
            </div>
          </div>
        </div>
      </div>
    );
}

export default UserProfile
