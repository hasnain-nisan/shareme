import React, {useState, useRef, useEffect} from 'react'
import {Link, Route, Routes} from 'react-router-dom'
import {Sidebar, UserProfile} from '../components'
import {client} from '../client'
import Pins from './Pins'
import { SiPhotopea } from "react-icons/si";
import {BsMenuButtonWideFill} from "react-icons/bs"


const Home = () => {

    const [toggleSidebar, setToggleSidebar] = useState(false)

    return (
        <div className="flex flex-col md:flex-row bg-gray-50 h-screen transition-height duration-75 ease-out">
            <div className="hidden md:flex h-screen flex-initial">
                <Sidebar/>
            </div>
            <div className="flex md:hidden flex-row">
                <BsMenuButtonWideFill fontSize={30} className="cursor-pointer" onCLick={() => setToggleSidebar(true)}/>
            </div>
        </div>
    )
}

export default Home
