import React, {useState} from 'react'
import {Routes, Route} from 'react-router-dom'
import {Navbar, Feed, CreatePin, PinDetails, Search} from '../components'

const Pins = ({user}) => {

    const [searchTerm, setSearchTerm] = useState('')
    
    return (
        <div className="px-2 md:px-5">
            <div className="bg-gray-50">
                <Navbar seachTerm={searchTerm} setSearchTerm={setSearchTerm} user={user}/>
            </div>
            <div className="h-full">
                <Routes>
                    <Route path="/" element={<Feed />}/>
                    <Route path="/category/:categoryId" element={<Feed />}/>
                    <Route path="/pin-details/:pinId" element={<PinDetails user={user}/>}/>
                    <Route path="/create-pin" element={<CreatePin user={user}/>}/>
                    <Route path="/search" element={<Search  seachTerm={searchTerm} setSearchTerm={setSearchTerm}/>}/>
                </Routes>
            </div>
        </div>
    )
}

export default Pins
