import React from 'react'
import { Link } from 'react-router-dom'
import databaseServiceObj from '../appwrite/config'
import { useSelector } from 'react-redux'

const Postcard = ({ $id, title, featuredImg, postedBy }) => {

    return (
        <Link to={`/post/${$id}`}>
            <div>
                <div>
                    <img src={databaseServiceObj.previewFile(featuredImg)} alt={title} />
                </div>
                <h2>{title}</h2>
                <h3>Posted by {postedBy}</h3>
            </div>
        </Link>
    )
}

export default Postcard