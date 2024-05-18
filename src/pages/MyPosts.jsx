import React, { useState, useEffect } from 'react'
import service from '../appwrite/config'
import { Container, Postcard } from '../components/index'
import { useSelector } from 'react-redux'


const MyPosts = () => {

    const [posts, setPosts] = useState([])
    const userData = useSelector(state => state.auth.userData)

    useEffect(() => {
        console.log('documents')
        console.log(userData,'userData')
        service.myposts(userData.$id)
            .then((data) => {
                console.log(data)
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

export default MyPosts