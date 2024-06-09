import React, { useState, useEffect } from 'react'
import service from '../appwrite/config'
import { Container, Postcard } from '../components/index'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Loader2 from '../components/Loader2'

const MyPosts = () => {

    // const [posts, setPosts] = useState([])
    // const [loader, setLoader] = useState(true)
    const userData = useSelector(state => state.auth.userData)
    const id = userData.$id;
    // console.log(userData, 'userdata')
    const posts = useSelector(state => state.posts)
    // console.log(posts.posts)
    const myposts = posts.posts.filter(item => item.UseId === id);

    // {
    // console.log(id,'userdata id')
    // item.UseId === id
    // if (item.UseId === id) {
    //     return item
    // }else{
    //     return null
    // }
    //}

    // );

    // console.log(myposts, 'mypost')
    // useEffect(() => {
    //     setLoader(true)

    //     // const myposts = posts.map(item => item.useId === userData.$id);

    //     setLoader(false)
    //     // service.myposts(userData.$id)
    //     //     .then((data) => {
    //     //         if (data) {
    //     //             setPosts(data.documents)
    //     //         }
    //     //     })
    //     //     .finally(() => { setLoader(false) })
    // }, [])

    // if (loader) {
    //     return (
    //         <Loader2 />)

    // } else {
    if (myposts.length === 0) {
        return (
            <div className='flex justify-center min-h-screen'>
                <Link className='font-bold text-3xl hover:text-gray-600 content-center p-4' to='/add-post'>
                    No posts posted by you, Post some.
                </Link>
            </div>
        )
    }
    else {
        return (
            <div className='w-full py-12 px-4 min-h-screen'>
                <Container >
                    <div className='flex flex-wrap justify-center gap-8'>
                        {myposts.map((post) => (
                            <Link key={post.$id} to={`/post/${post.$id}`} className='sm:w-1/4 w-full sm:min-w-64 px-3 py-5 flex justify-center items-center  bg-slate-200  shadow-lg shadow-[#6a5acd] rounded-md'>
                                <Postcard {...post} />
                            </Link>
                        ))}
                    </div>
                </Container>
            </div>
        )
    }
}

// }

export default MyPosts