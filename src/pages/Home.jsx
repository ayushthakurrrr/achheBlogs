import React, { useEffect, useState } from 'react'
import appwriteService from "../appwrite/config";
import { Container, Postcard } from '../components/index'
import { useSelector } from 'react-redux';

function Home() {
    const [posts, setPosts] = useState([])
    const status = useSelector(state => state.auth.status)

    useEffect(() => {
        appwriteService.getPosts().then((data) => {
            console.log(data, 91)
            
            if (data) {
                console.log('postform')
                setPosts(data.documents)
                console.log(data.documents, 92)
            }
            else {
                setPosts([])
            }
        })
    }, [])
    // console.log(posts, 989)

    if (!status) {
        return (
            <div>
                Login to see posts.
            </div>
        )
    }
    else if (status && posts.length === 0) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    {console.log(posts)}
                    {console.log(posts.length)}
                    {console.log('nsdh')}
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                Currently no posts available, add some.
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
    // if (posts.length === 0) {
    //     return (
    //         <div className="w-full py-8 mt-4 text-center">
    //             <Container>
    //                 {console.log('nsdh')}
    //                 <div className="flex flex-wrap">
    //                     <div className="p-2 w-full">
    //                         <h1 className="text-2xl font-bold hover:text-gray-500">
    //                             Add post
    //                         </h1>
    //                     </div>
    //                 </div>
    //             </Container>
    //         </div>
    //     )
    // }
    else {
        return (
            <div className='w-full py-8'>
                <Container >
                    <div className='flex flex-wrap'>
                        {console.log('hgji')}
                        {posts.map((post) => (
                            <div key={post.$id} className='p-2 w-1/4'>
                                <Postcard {...post} />
                            </div>
                        ))}
                    </div>
                </Container>
            </div>
        )
    }
}

export default Home