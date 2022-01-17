import React, {useState, useEffect} from 'react'
import MasonryLayout from './MasonryLayout'
import {client} from '../client'
import {feedQuery, searchQuery} from '../utils/data'
import Spinner from './Spinner'

const Search = ({searchTerm, setSearchTerm}) => {

    const [pins, setPins] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if(searchTerm){
            setLoading(true)
            const search = searchQuery(searchTerm.toLowerCase())
            client.fetch(search)
                .then((data) => {
                    setPins(data);
            });
            setLoading(false);
        } else {
            client.fetch(feedQuery)
                .then((data => {
                    setPins(data)
                }))
        }
    }, [searchTerm])

    return (
      <div>
        {loading && <Spinner message={`Searching for pins...`} />}
        {pins?.length !== 0 && <MasonryLayout pins={pins} />}
        {pins?.length === 0 && searchTerm !== '' && !loading && 
            <div className="mt-10 text-center text-xl">
                No pins available!
            </div>
        }
      </div>
    );
}

export default Search
