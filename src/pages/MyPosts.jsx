import React, { useState, useEffect } from 'react'
import service from '../appwrite/config'
import { Container, Postcard } from '../components/index'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Loader from '../components/Loader'

const MyPosts = () => {

    const [posts, setPosts] = useState([])
    const [loader, setLoader] = useState(true)
    const userData = useSelector(state => state.auth.userData)

    useEffect(() => {
        setLoader(true)
        console.log('documents')
        console.log(userData, 'userData')
        service.myposts(userData.$id)
            .then((data) => {
                console.log(data)
                if (data) {
                    setPosts(data.documents)
                }
            })
            .finally(() => { setLoader(false) })
    }, [])


    if (loader) {
        return (
            <Loader/>)

    } else {
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
                <div className='w-full py-12'>
                <Container >
                    <div className='flex flex-wrap justify-center gap-6'>
                        {console.log('hgji')}
                        {posts.map((post) => (
                            <div key={post.$id} className='w-1/4 min-w-52 p-2 flex justify-center items-center  bg-slate-200 rounded-sm'>
                                <Postcard {...post} />
                            </div>
                        ))}
                    </div>
                </Container>
            </div>
            )
        }
    }

}

export default MyPosts