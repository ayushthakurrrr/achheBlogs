import React, { useEffect, useState } from 'react'
import appwriteService from "../appwrite/config";
import { Container, Postcard } from '../components/index'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setPosts } from '../store/postSlice';
import { Link } from 'react-router-dom';
import Loader2 from '../components/Loader2';

function Home() {
    // const [posts, setPosts] = useState([])
    const [loader, setLoader] = useState(false)
    const status = useSelector(state => state.auth.status)
    const posts = useSelector(state => state.posts)
    // { console.log(posts) }
    // { console.log(posts.posts.length, 'length') }
    // console.log("render check 1")
    const dispatch = useDispatch()

    useEffect(() => {
        if (posts.posts.length === 0) {
            setLoader(true)
            appwriteService.getPosts()
                .then((data) => {
                    if (data) {
                        // setPosts(data.documents)
                        dispatch(setPosts(data.documents))
                    }
                    else {
                        // setPosts([])
                        dispatch(setPosts([]))
                    }
                })
                .finally(() => {
                    setLoader(false);
                })
        }
    }, [])
    // console.log(posts, 989)

    if (loader) {
        return (
            <Loader2 />
        )
    }
    else {

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
                        {/* {console.log(posts.posts)} */}
                        {posts.posts.map((post) => (
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
 }

export default Home