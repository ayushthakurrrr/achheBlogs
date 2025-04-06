import React, { useState } from 'react'
import { Container, Postcard } from '../components/index'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../appwrite/auth';
import appwriteService from '../appwrite/config'
import { logIn as storeLogin } from "../store/authSlice"
import { setPosts } from "../store/postSlice"

function Home() {
    const status = useSelector(state => state.auth.status)
    const posts = useSelector(state => state.posts)
    const dispatch = useDispatch()
    const postsArr = posts.posts;

    function reverseArray(postsArr) {
        const reversedArray = [];
        for (let i = postsArr.length - 1; i >= 0; i--) {
            reversedArray.push(postsArr[i]);
        }
        return reversedArray;
    }
    const reversedPosts = reverseArray(postsArr)

    const [disabled, setDisabled] = useState(false)
    const [loadingPosts, setLoadingPosts] = useState(false);

    const navigate = useNavigate()
    const demoLogin = async () => {
        setDisabled(true)
        setLoadingPosts(true);
        try {
            const session = await authService.login({ email: "demo@achheblogs.com", password: "demo@123" })
            if (session) {
                const userData = await authService.getCurrentUser()
                if (userData) {
                    dispatch(storeLogin({ userData: userData }))
                }
                appwriteService.getPosts()
                    .then((data) => {
                        if (data) {
                            dispatch(setPosts(data.documents))
                        }
                        else {
                            dispatch(setPosts([]))
                        }
                    })
                navigate('/')
            }
        } catch (error) {
            throw error;
        }
        finally {
            setLoadingPosts(false);
            setDisabled(false)
        }

    }

    if (!status) {
        return (
            < section className="min-h-screen flex justify-center" >
                <div className="flex flex-col items-center justify-center text-center">
                    <h1 className="text-2xl sm:text-5xl font-bold text-[#6a5acd]">Welcome to achheBlogs</h1>
                    <p className="mt-1 sm:mt-4 text-sm sm:text-xl text-[#515178]">Discover insightful blogs from amazing writers.</p>
                    <div className="mt-8">
                        <Link to="/login" className="bg-white text-[#6a5acd] font-bold text-xl px-4 py-2 rounded mr-4 hover:text-[#9090ec]">Login</Link>
                        <Link to="/signup" className="bg-[#6a5acd] text-white px-4 py-2 rounded hover:bg-[#7878DC]">Sign Up</Link>
                    </div>
                    <div>
                        <button disabled={disabled} className='bg-[#f4c464] text-white px-3 pb-1 py-0.5 ml-6 rounded-md hover:bg-[#f1b846] mt-7 mb-7' onClick={demoLogin}>{disabled ? "Loading..." : "Login with Demo Account"}</button>
                    </div>
                </div>
            </section >
        )
    }
    else if (status && loadingPosts) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <p className="text-xl text-gray-500">Loading posts...</p>
            </div>
        );
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
                                    <Link key={post.$id} to={`/post/${post.$id}`} className='sm:w-1/4 w-full sm:min-w-64 px-3 py-5 flex justify-center items-center bg-slate-200  shadow-lg shadow-[#6a5acd] rounded-md'>
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