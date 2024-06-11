import React from 'react'
import { Container, Postcard } from '../components/index'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const MyPosts = () => {

    const userData = useSelector(state => state.auth.userData)
    const id = userData.$id;
    const posts = useSelector(state => state.posts)
    const myposts = posts.posts.filter(item => item.UseId === id);

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

export default MyPosts