import React, {useState} from 'react'
import { urlFor } from '../client'
import {Link, useNavigate} from 'react-router-dom'
import {v4 as uuidv4} from 'uuid'
import {MdDownloadForOffline} from 'react-icons/md'
import {AiTwotoneDelete} from 'react-icons/ai'
import {BsFillArrowUpRightCircleFill} from 'react-icons/bs'

const Pin = (props) => {

    const pin = props.item
    const [postHovered, setPostHovered] = useState(false)
    const [savingPost, setSavingPost] = useState(false)
    const navigate = useNavigate()

    return (
        <div className="m-2">
            <div
                onMouseEnter={() => setPostHovered(true)}
                onMouseLeave={() => setPostHovered(false)}
                onClick={() => navigate(`/pin-details/${pin._id}`)}
                className="relative cursor-zoom-in w-auto hover:shadow-lg rounded-lg overflow:hidden transition-all duration-500 ease-in-out"
            >
                <img 
                    className="rounded-lg w-full shadow-md" 
                    src={urlFor(pin.image.asset._ref).width(250).url()} 
                    alt="user-post"
                />
                {postHovered && (
                    <div 
                        className="absolute top-0 w-full h-full flex flex-col jistify-between p-1 pr-2 pt-2 pb-2 z-50"
                        style={{height: '100%'}}
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex gap-2">
                                <a 
                                    href={`${pin.image?.asset?._ref}?dl=`}
                                    download
                                    onClick={(e) => e.stopPropagation()}
                                    className="bg-white w-9 h-9 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none"
                                >
                                    <MdDownloadForOffline/>
                                </a>
                            </div>
                        </div>
                    </div>
                )}  

            </div>
        </div>
    )
}

export default Pin