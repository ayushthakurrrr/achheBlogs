import React, { useEffect, useState } from 'react'
import { Container, PostForm } from '../components/index'
import appwriteService from "../appwrite/config";
import { useNavigate, useParams } from 'react-router-dom';

function Editpost() {
    const [post, setPost] = useState(null)
    const { slug } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (slug) {
            console.log(slug)
            appwriteService.getPost(slug).then((data) => {
                if (data) {
                    console.log(data,121)
                    setPost(data)
                }
            })
        } else {
            navigate('/')
        }
    }, [slug, navigate])
    return post ? (
        <div className='py-8'>
            <Container>
                <PostForm post={post} />
            </Container>
        </div>
    ) : null
}

export default Editpost