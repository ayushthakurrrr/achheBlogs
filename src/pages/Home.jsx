import React from 'react'
import { Container, Postcard } from '../components/index'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function Home() {
    const status = useSelector(state => state.auth.status)
    const posts = useSelector(state => state.posts)
    const postsArr = posts.posts;

    function reverseArray(postsArr) {
        const reversedArray = [];
        for (let i = postsArr.length - 1; i >= 0; i--) {
            reversedArray.push(postsArr[i]);
        }
        return reversedArray;
    }
    const reversedPosts = reverseArray(postsArr)

    if (!status) {
        return (
            // <div className='flex justify-center min-h-screen'>
            //     <Link className='font-bold text-3xl hover:text-gray-600 content-center' to='/login'>
            //         Login to see blogs.
            //     </Link>
            // </div>
            < section className="min-h-screen flex justify-center" >
                <div className="flex flex-col items-center justify-center text-center">
                    <h1 className="text-2xl sm:text-5xl font-bold text-[#6a5acd]">Welcome to achheBlogs</h1>
                    <p className="mt-1 sm:mt-4 text-sm sm:text-xl text-[#515178]">Discover insightful blogs from amazing writers.</p>
                    <div className="mt-8">
                        <Link to="/login" className="bg-white text-[#6a5acd] font-bold text-xl px-4 py-2 rounded mr-4 hover:text-[#9090ec]">Login</Link>
                        <Link to="/signup" className="bg-[#6a5acd] text-white px-4 py-2 rounded hover:bg-[#7878DC]">Sign Up</Link>
                    </div>
                </div>
            </section >
        )
    }
    else if (status && postsArr.length === 0) {
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
                        {reversedPosts.map((post) => {
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