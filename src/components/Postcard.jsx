import React from 'react'
import { Link } from 'react-router-dom'
import databaseServiceObj from '../appwrite/config'


const Postcard = ({ $id, title, featuredImg, postedBy }) => {

    return (
        <Link to={`/post/${$id}`}>
            <div>
                <div className='mb-4'>
                    <img src={databaseServiceObj.previewFile(featuredImg)} alt={title} className='rounded-md m-auto' />
                </div>
                <h2 className='text-lg font-bold'>{title}</h2>
                <h3 className='font-light'>Posted by {postedBy}</h3>
            </div>
        </Link>
    )
}

export default Postcard