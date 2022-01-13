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

    
    const fetchPinDetails = () => {
        let query = pinDetailsQuery(pinId)
        if(query) {
            client.fetch(query)
            .then((data) => {
                setPinDetails(data[0])
                console.log(data[0])
                if(data[0]){
                    query = pinDetailsMorePinQuery(data[0])
                    client.fetch(query)
                        .then((res) => setPins[res])
                }
            })
        }
    }
        
    useEffect(() => {
        fetchPinDetails()
    }, [pinId])
        
    if(!pinDetails) return <Spinner message="Loading pin ..." className="animate-pulse"/>
    return (
        <div 
            className="flex xl:flex-row flex-col m-auto bg-white"
            style={{ maxWidth: '1500px', borderRadius: '32px'}}
        >
            <div className="flex justify-center items-center md:items-start flex-initial">
                <img 
                    className="rounded-t-2xl xl:rounded-2xl"
                    src={urlFor(pinDetails?.image?.asset?._ref).url()} 
                    alt="user-post" 
                />
            </div>
            <div className="w-full p-5 flex-1 xl:min-w-620">
                <div className="flex items-center justify-between">
                    <div className="flex gap-2 items-center">
                        <a 
                            href={`${pinDetails?.image?.asset?._ref}?dl=`}
                            download
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white w-9 h-9 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-xl outline-none"
                        >
                            <MdDownloadForOffline/>
                        </a>
                    </div>
                    <a 
                        href={pinDetails?.destination}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm bg-white flex items-center gap-2 text-blact font-bold p-2 pl-4 pr-4 rounded-full opacity-70 hover:opacity-100 hover:shadow-xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* <BsFillArrowUpRightCircleFill/> */}
                        {pinDetails?.destination}
                    </a>
                </div>
                <div>
                    <h1 className="text-4xl font-bold break-words mt-3">
                        {pinDetails.title}
                    </h1>
                    <p className="mt-3">{pinDetails.about}</p>
                    <Link
                        to={`/user-profile/${pinDetails.postedBy?._id}`}
                        className="flex gap-2 mt-5 items-center hover:shadow-xl rounded-lg"
                    >
                        <img 
                            src={pinDetails.postedBy?.image} 
                            alt="user-profile" 
                            className="w-8 h-8 rounded-full object-cover"
                        />
                        <p className="font-semibold capitalize ">
                            {pinDetails.postedBy?.userName}
                        </p>
                    </Link>
                    
                </div>
            </div>
        </div>
    )
}

export default PinDetails
