import React from 'react'
import databaseServiceObj from '../appwrite/config'

const Postcard = ({ $id, title, featuredImg, postedBy }) => {

    return (
            <div className="group relative ">
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
    )
}

export default Postcard