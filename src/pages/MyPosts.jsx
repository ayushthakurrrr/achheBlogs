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
            <Loader />)

    } else {
        if (posts.length === 0) {
            return (
                <div className='py-12 '>
                    <Link className='font-bold text-3xl hover:text-gray-600' to='/add-post'>
                        No posts posted by you, Post some.
                    </Link>
                </div>
            )
        }
        else {
            return (
                <div className='w-full py-12 px-2'>
                    <Container >
                        <div className='flex flex-wrap justify-center gap-8'>
                            {console.log('hgji')}
                            {posts.map((post) => (
                                <div key={post.$id} className='sm:w-1/4 w-full sm:min-w-64 px-3 py-5 flex justify-center items-center  bg-slate-200 rounded-md'>
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