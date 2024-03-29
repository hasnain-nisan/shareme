import React from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {IoMdAdd, IoMdSearch} from 'react-icons/io'

const Navbar = ({searchTerm, setSearchTerm, user}) => {
    
    const navigate = useNavigate()

    if(!user) return null

    return (
        <div className="flex gap-2 md:gap-5 w-full mt-5 pb-7">
            <div className="flex justify-start items-center w-full px-2 rounded-md bg-white border-none outline-none focus-within:shadow-md">
                <IoMdSearch fontSize={21} className="ml-1"/>
                <input 
                    type="text"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)} 
                    onFocus={() => navigate('/search')}
                    className="p-2 w-full bg-white ouline-none"
                />
            </div>
            <div className="flex gap-3">
                <Link to={`/user-profile/${user._id}`} className="hidden md:block">
                    <img src={user.image} alt="user" className="w-14 h-12 rounded-lg"/>
                </Link>
                <Link to={`/create-pin`} className="bg-black text-white rounded-lg w-14 h-12 flex items-center justify-center">
                    <IoMdAdd className="text-3xl font-bolder"/>
                </Link>
            </div>
        </div>
    )
}

export default Navbar
