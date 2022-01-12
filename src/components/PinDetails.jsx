import React, {useState, useEffect} from 'react'
import {MdDownloadForOffline} from 'react-icons/md'
import {Link, useParams} from 'react-router-dom'
import {v4 as uuid} from 'uuid'

import {client, urlFor} from '../client'
import MasonryLayout from './MasonryLayout'
import {pinDetailsMorePinQuery, pinDetailsQuery} from '../utils/data'
import Spinner from './Spinner'

const PinDetails = ({user}) => {

    const [pins, setPins] = useState(null)
    const [pinDetails, setPinDetails] = useState(null)
    const [comment, setComment] = useState("")
    const [addingComment, setAddingComment] = useState(false)
    const {pinId} = useParams()

    if(!pinDetails) return <Spinner message="Loading pin ..." className="animate-pulse"/>

    const fetchPinDetails = () => {
        const query = pinDetailsQuery(pinId)
        if(query) {
            client.fetch(query)
                .then((data) => {
                    setPinDetails(data)
                    console.log(data)
                })
        }
    }

    fetchPinDetails()

    return (
        <div>
            {user?.userName}
        </div>
    )
}

export default PinDetails
