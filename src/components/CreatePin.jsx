import React, {useState} from 'react'
import { AiOutlineCloudUpload } from 'react-icons/ai'
import {MdDelete} from 'react-icons/md'
import {useNavigate} from 'react-router-dom'
import {client} from '../client'
import Spinner from './Spinner'
import {categories} from '../utils/data'

const CreatePin = () => {

    const [title, setTitle] = useState('')
    const [about, setAbout] = useState('')
    const [destination, setDestination] = useState('')
    const [loading, setLoading] = useState(false)
    const [fields, setFields] = useState(null)
    const [category, setCategory] = useState(null)
    const [imageAsset, setImageAsset] = useState(null)
    const [wrongImageType, setWrongImageType] = useState(false)

    const navigate = useNavigate()

    return (
        <div>
            Create pin
        </div>
    )
}

export default CreatePin
