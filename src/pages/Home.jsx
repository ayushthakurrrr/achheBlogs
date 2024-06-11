import React from 'react'
import { Container, Postcard } from '../components/index'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

function Home() {
    const status = useSelector(state => state.auth.status)
    const posts = useSelector(state => state.posts)
    const dispatch = useDispatch()

    if (!status) {
        return (
            <div className='flex justify-center min-h-screen'>
                <Link className='font-bold text-3xl hover:text-gray-600 content-center' to='/login'>
                    Login to see blogs.
                </Link>
            </div>
        )
    }
    else if (status && posts.length === 0) {
        return (
            <div className='flex justify-center min-h-screen'>
                <Link className='font-bold text-3xl hover:text-gray-600 ' to='/add-post'>
                    Currently no posts available, Add some.
                </Link>
            </div>
        )
    }
    else {
        return (
            <div className='w-full py-12 px-4 min-h-screen'>
                <Container >
                    <div className='flex flex-wrap justify-center gap-8'>
                        {posts.posts.map((post) => {
                            if (post.Status === 'active') {
                                return (
                                    <Link key={post.$id} to={`/post/${post.$id}`} className='sm:w-1/4 w-full sm:min-w-64 px-3 py-5 flex justify-center items-center  bg-slate-200  shadow-lg shadow-[#6a5acd] rounded-md'>
                                        <Postcard {...post} />
                                    </Link>)
                            } else {
                                return null
                            }
                        })}
                    </div>
                </Container>
            </div>
        )
    }
}

export default Home