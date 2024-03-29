import React, {useEffect, useState} from 'react'
import {NavLink, Link} from 'react-router-dom'
import { SiPhotopea } from "react-icons/si";
import {GoHome} from 'react-icons/go'
import { client } from '../client';
import { categoryQuery } from '../utils/data';
import {multiDimensionalUnique} from '../utils/unique'

const isNotActiveStyle = 'flex items-center px-5 gap-3 text-gray-500 hover:text-black transition-all duration-200 ease-in-out capitalize'
const isActiveStyle = 'flex items-center px-5 gap-3 font-extrabold border-r-2 border-black transition-all duration-200 ease-in-out capitalize'



const Sidebar = ({user, closeToggle}) => {

    const handleCloseSidebar = () => {
        if(closeToggle) closeToggle(false)
    }

    const [categories, setCategories] = useState(null)

    useEffect(() => {
        const query = categoryQuery
        client.fetch(query)
            .then((data) => {
                let uniq = multiDimensionalUnique(data)
                setCategories(uniq)
            })
    }, [])

    return (
      <div className="flex flex-col justify-between bg-white h-full overflow-y-scroll min-w-210 hide-scrollbar">
        <div className="flex flex-col">
          <Link
            to="/"
            className="flex px-5 gap-2 my-5 pt-1 w-190 items-center"
            onClick={handleCloseSidebar}
          >
            <div className="flex items-center">
              <SiPhotopea className="text-purple-600 w-6 h-6 mr-2" />
              <p className="text-purple-600 text-xl font-bold">Shareme</p>
            </div>
          </Link>
          <div className="flex flex-col gap-5">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? isActiveStyle : isNotActiveStyle
              }
              onClick={handleCloseSidebar}
            >
              <GoHome />
              Home
            </NavLink>

            <h3 className="mt-2 px-5 text-base 2xl:text-xl">
              Discover Categories
            </h3>
            {categories?.slice(0, categories.length - 1).map((category) => (
              <NavLink
                to={`/category/${category.category}`}
                className={({ isActive }) =>
                  isActive ? isActiveStyle : isNotActiveStyle
                }
                onClick={handleCloseSidebar}
                key={category.category}
              >
                <img
                  src={`https://source.unsplash.com/random/1600*900/?${category.category}`}
                  alt="category"
                  className="w-8 h-8 rounded-full shadow-sm object-cover"
                />
                {category.category}
              </NavLink>
            ))}
          </div>
        </div>
        {user && (
          <Link
            to={`/user-profile/${user._id}`}
            className="flex my-5 mb-3 gap-2 p-2 items-center bg-white rounded-lg shadow-lg mx-3"
            onClick={handleCloseSidebar}
          >
            <img
              src={user?.image}
              alt=""
              srcset=""
              className="rounded-full h-10"
            />
            <p>{user.userName}</p>
          </Link>
        )}
      </div>
    );
}

export default Sidebar