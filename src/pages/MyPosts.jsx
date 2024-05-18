import React, { useState, useEffect } from 'react'
import service from '../appwrite/config'
import { Container, Postcard } from '../components/index'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'


const MyPosts = () => {

    const [posts, setPosts] = useState([])
    const userData = useSelector(state => state.auth.userData)

    useEffect(() => {
        console.log('documents')
        console.log(userData, 'userData')
        service.myposts(userData.$id)
            .then((data) => {
                console.log(data)
                if (data) {
                    setPosts(data.documents)
                }
            })
    }, [])

    if (posts.length === 0) {
        return (
            <div>
                No posts posted by you, <Link to='/add-post'>
                    Post some
                </Link>
            </div>
        )
    }
    else {
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
}

export default MyPosts