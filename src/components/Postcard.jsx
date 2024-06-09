import React from 'react'
import { Link } from 'react-router-dom'
import databaseServiceObj from '../appwrite/config'


const Postcard = ({ $id, title, featuredImg, postedBy }) => {

    return (
        // <Link to={`/post/${$id}`}>
            <div className="group relative "> {/* Added overflow:hidden */}
                <div className="mb-4 overflow-hidden">
                    <img
                        src={databaseServiceObj.previewFile(featuredImg)}
                        alt={title}
                        className="rounded-md m-auto transition duration-300 ease-in-out transform group-hover:scale-110"
                    />
                </div>
                <h2 className="text-lg font-bold">{title}</h2>
                <h3 className="font-light">Posted by {postedBy}</h3>
            </div>
        // </Link>
    )
}

export default Postcard