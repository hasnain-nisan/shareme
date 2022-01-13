import React, {useState} from 'react'
import { client, urlFor } from '../client'
import {Link, useNavigate} from 'react-router-dom'
import {v4 as uuidv4} from 'uuid'
import {MdDownloadForOffline} from 'react-icons/md'
import {AiTwotoneDelete} from 'react-icons/ai'
import {BsFillArrowUpRightCircleFill} from 'react-icons/bs'
import {fetchUser} from '../utils/fetchUser' 

const Pin = (props) => {

    const pin = props.item
    const [postHovered, setPostHovered] = useState(false)
    const navigate = useNavigate()

    const user = fetchUser()

    const alreadySaved = !!(pin.save?.filter((item) => item.postedBy?._id === user.googleId))?.length
    // expalanation
    // 1, [2,4,1] ->filter func -> [1].length -> 1 -> !1 -> false -> !false -> true
    // 5, [1,2,3] ->filter func -> [].length -> 0 -> !0 -> true -> !true -> false

    const savePin = (id) => {
        if(!alreadySaved){
            client
                .patch(id)
                .setIfMissing({ save: [] })
                .insert('after', 'save[-1]', [{
                    _key: uuidv4(),
                    userId: user.googleId,
                    postedBy: {
                        _type: 'postedBy',
                        _ref: user.googleId
                    }
                }])
                .commit()
                .then(() => {
                    window.location.reload();
                })
        }
    }

    const deletePin = (id) => {
        client
            .delete(id)
            .then(() => {
                window.location.reload();
            })
    }
    
    
    return (
        <div className="m-2">
            <div
                onMouseEnter={() => setPostHovered(true)}
                onMouseLeave={() => setPostHovered(false)}
                onClick={() => navigate(`pin-details/${pin._id}`)}
                className="relative cursor-zoom-in w-auto hover:shadow-lg rounded-lg overflow:hidden transition-all duration-500 ease-in-out"
            >
                <img 
                    className="rounded-lg w-full shadow-md" 
                    src={urlFor(pin.image?.asset?._ref).width(250).url()} 
                    alt="user-post"
                />
                {postHovered && (
                    <div 
                        className="absolute top-0 w-full h-full flex flex-col justify-between p-1 pr-2 pt-2 pb-2 z-50"
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
                            {alreadySaved ? (
                                <button type="button" className="bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none">
                                    {pin.save?.length} Saved
                                </button>
                            ): (
                                <button 
                                    type="button" 
                                    className="bg-green-500 opacity-70 hover:opacity-100 text-white text-sm font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        savePin(pin._id)
                                    }}
                                >
                                    Save
                                </button>
                            )}
                        </div>
                        <div className="flex justify-between items-center gap-2 w-full">
                            {pin.destination && (
                                <a 
                                    href={pin.destination}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-sm bg-white flex items-center gap-2 text-blact font-bold p-2 pl-4 pr-4 rounded-full opacity-70 hover:opacity-100 hover:shadow-md"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <BsFillArrowUpRightCircleFill/>
                                    {pin.destination.length > 20 ? pin.destination.slice(8, 20) : pin.destination.slice(8)}
                                </a>
                            )}
                            {pin.postedBy?._id === user.googleId && (
                                <button
                                    type="button"
                                    className="bg-white w-9 h-9 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        deletePin(pin._id)
                                    }}
                                >
                                    <AiTwotoneDelete/>
                                </button>
                            )}
                        </div>
                    </div>
                )}  

            </div>
            <Link
                to={`/user-profile/${pin.postedBy?._id}`}
                className="flex gap-2 mt-2 items-center"
            >
                <img 
                    src={pin.postedBy?.image} 
                    alt="user-profile" 
                    className="w-8 h-8 rounded-full object-cover"
                />
                <p className="font-semibold capitalize ">
                    {pin.postedBy?.userName}
                </p>
            </Link>
        </div>
    )
}

export default Pin