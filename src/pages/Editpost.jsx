import React, { useEffect, useState } from 'react'
import { Container, PostForm } from '../components/index'
import appwriteService from "../appwrite/config";
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

function Editpost() {
    const { slug } = useParams()
    const navigate = useNavigate()
    const posts = useSelector(state => state.posts)
    const post = posts.posts.find(item => item.$id === slug)

    return post ? (
        <div className='py-8'>
            <Container>
                <PostForm post={post} />
            </Container>
        </div>
    ) : null
}

export default Editpost