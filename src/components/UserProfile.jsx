import React, {useState, useEffect} from 'react'
import {AiOutlineLogout} from 'react-icons/ai'
import {useParams, useNavigate} from 'react-router-dom'
import {GoogleLogout} from 'react-google-login'

import {client} from '../client'
import {userCreatedPinsQuery, userQuery, userSavedPinsQuery} from '../utils/data'
import MasonryLayout from './MasonryLayout'
import Spinner from './Spinner'
const randomImage = 'https://source.unsplash.com/random/1600*900/?sport,football,mancity'


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
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserProfile
