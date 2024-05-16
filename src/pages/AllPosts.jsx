import React, { useState, useEffect } from 'react'
import service from '../appwrite/config'
import { Container, Postcard } from '../components/index'

const AllPosts = () => {

    const [posts, setPosts] = useState([])

    useEffect(() => {
        console.log('documents')
        service.getPosts()
        .then((data) => {
            if (data) {
                setPosts(data.documents)
            }
        })
    }, [])


    return (
        <div>
            <Container>
            <div className='flex flex-wrap'>
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

export default AllPosts