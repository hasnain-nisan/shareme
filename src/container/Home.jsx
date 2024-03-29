import React, {useState, useRef, useEffect, useContext} from 'react'
import {Link, Route, Routes} from 'react-router-dom'
import {CreatePin, Feed, Navbar, PinDetails, Search, Sidebar, UserProfile} from '../components'
import {userQuery} from '../utils/data'
import {client} from '../client'
import { SiPhotopea } from "react-icons/si";
import {GrClose} from "react-icons/gr"
import {TiThMenu} from "react-icons/ti"
import { fetchUser } from '../utils/fetchUser'
import {SearchContext} from '../context/SearchContext'


const Home = () => {

    const searchContext = useContext(SearchContext);
    const [user, setUser] = useState(null)
    const [toggleSidebar, setToggleSidebar] = useState(false)
    const scrollRef = useRef(null)
    const {searchTerm, setSearchTerm} = searchContext
    // const [searchTerm, setSearchTerm] = useState('')

    const userInfo = fetchUser()

    useEffect(() => {
        const query = userQuery(userInfo?.googleId)
        client.fetch(query)
            .then((data) => {
                setUser(data[0])
            })
    }, [])

    useEffect(() => {
        scrollRef.current.scrollTo(0, 0)
    }, [])

    return (
      <div className="flex flex-col md:flex-row bg-gray-50 h-screen transition-height duration-75 ease-out">
        <div className="hidden md:flex h-screen flex-initial">
          <Sidebar user={user} />
        </div>
        <div className="flex md:hidden flex-row">
          <div className="p-3 w-full flex flex-row justify-between items-center shadow-md">
            <TiThMenu
              fontSize={30}
              className="cursor-pointer"
              onClick={() => setToggleSidebar(true)}
            />
            <Link to="/">
              <div className="flex items-center">
                <SiPhotopea className="text-purple-600 w-6 h-6 mr-2" />
                <p className="text-purple-600 text-xl font-bold">Shareme</p>
              </div>
            </Link>
            <Link to={`user-profile/${user?.id}`}>
              <img
                src={user?.image}
                alt=""
                srcset=""
                className="rounded-full h-10"
              />
            </Link>
          </div>

          {toggleSidebar && (
            <div className="fixed w-4/5 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in">
              <div className="absolute flex w-full justify-end items-center p-2">
                <GrClose
                  fontSize={30}
                  className="cursor-pointer"
                  onClick={() => setToggleSidebar(false)}
                />
              </div>
              <Sidebar user={user} closeToggle={setToggleSidebar} />
            </div>
          )}
        </div>

        <div className="px-2 md:px-5 pb-2 flex-1 h-screen overflow-y-scroll" ref={scrollRef}>
          <div className="bg-gray-50">
                <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} user={user}/>
          </div>
          <Routes>
            <Route path="/user-profile/:userId" element={<UserProfile />} />
            <Route path="/" element={<Feed user={user && user} />} />
            <Route path="/category/:categoryId" element={<Feed />}/>
            <Route path="/pin-details/:pinId" element={<PinDetails user={user}/>}/>
            <Route path="/create-pin" element={<CreatePin user={user}/>}/>
            <Route path="/search" element={<Search  searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>}/>
          </Routes>
        </div>
      </div>
    );
}

export default Home
