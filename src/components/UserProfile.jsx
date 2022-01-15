import React, {useState, useEffect} from 'react'
import {AiOutlineLogout} from 'react-icons/ai'
import {useParams, useNavigate} from 'react-router-dom'
import {GoogleLogout} from 'react-google-login'

import {client} from '../client'
import {userCreatedPinsQuery, userQuery, userSavedPinsQuery} from '../utils/data'
import MasonryLayout from './MasonryLayout'
import Spinner from './Spinner'


const UserProfile = () => {

    const [user, setUser] = useState(null)
    const [pins, setPins] = useState(null)
    const [text, setText] = useState('Created')
    const [activeBtn, setActiveBtn] = useState('created')
    const navigate = useNavigate()
    const {userId} = useParams

    if(!user){
        return <Spinner message={"Loading profile..."}/>
    }

    return (
        <div>
            User Profile
        </div>
    )
}

export default UserProfile
