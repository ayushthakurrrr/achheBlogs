import React from 'react'
import databaseServiceObj from '../appwrite/config'

// const Postcard = ({ $id, title, featuredImg, postedBy }) => {

//     return (
//             <div className="group relative h-84">
//                 <div className="mb-4 overflow-hidden">
//                     <img
//                         src={databaseServiceObj.previewFile(featuredImg)}
//                         alt={title}
//                         className="rounded-md m-auto transition duration-300 ease-in-out transform group-hover:scale-110"
//                     />
//                 </div>
//                 <h2 className="text-lg font-bold">{title}</h2>
//                 <h3 className="font-light">Posted by {postedBy}</h3>
//             </div>
//     )
// }

const Postcard = ({ $id, title, featuredImg, postedBy }) => {
    return (
        <div className="group relative h-[310px] w-full flex flex-col justify-between">
            <div className="mb-2 overflow-hidden h-[200px]">
                <img
                    src={databaseServiceObj.previewFile(featuredImg)}
                    alt={title}
                    className="rounded-md mx-auto h-full w-full object-cover transition duration-300 ease-in-out transform group-hover:scale-110"
                />
            </div>
            <div className="px-2">
                <h2 className="text-lg font-bold truncate">{title}</h2>
                <h3 className="font-light text-sm text-gray-600">Posted by {postedBy}</h3>
            </div>
        </div>
    )
}

export default Postcard