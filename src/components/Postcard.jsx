import React from 'react'
import { Link } from 'react-router-dom'
import  databaseServiceObj  from '../appwrite/config'

const Postcard = ({ $id, title, featuredImg }) => {
    return (
        <Link to={`/post/${$id}`}>
            <div>
                <div>
                    <img src={databaseServiceObj.previewFile(featuredImg)} alt={title} />
                </div>
                <h2>{title}</h2>
            </div>
        </Link>
    )
}

export default Postcard