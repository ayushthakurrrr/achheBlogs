import React, { useEffect, useState } from 'react'
import { Container, PostForm } from '../components/index'
import appwriteService from "../appwrite/config";
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../components/Loader';

function Editpost() {
    const [post, setPost] = useState(null)
    const [loader, setLoader] = useState(true)
    const { slug } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (slug) {
            setLoader(true)
            appwriteService.getPost(slug).then((data) => {
                if (data) {
                    setPost(data)
                }
            })
                .finally(() => setLoader(false))
        } else {
            navigate('/')
        }
    }, [slug, navigate])

    if (loader) {
        return <Loader />
    } else {
        return post ? (
            <div className='py-8'>
                <Container>
                    <PostForm post={post} />
                </Container>
            </div>
        ) : null
    }
}

export default Editpost