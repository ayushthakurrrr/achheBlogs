import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from '../components/index';
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import Loader from "../components/Loader";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();
    const [loader, setLoader] = useState(true)

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.UseId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            setLoader(true)
            appwriteService.getPost(slug).then((post) => {
                console.log(post, 111)
                if (post) setPost(post);
                else navigate("/");
            })
                .finally(() => { setLoader(false) })
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        setLoader(true);
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImg);
                navigate("/");
            }
        })
        .finally(() => setLoader(false))
    };

    if (loader) {
        return <Loader />
    } else {

        return post ? (
            <div className="py-12">
                {console.log(post, 112)}
                <Container>
                    <div className="w-full relative flex justify-center bg-slate-200 rounded-xl pt-11 pb-2">
                        <img
                            src={appwriteService.previewFile(post.featuredImg)}
                            alt={post.title}
                            className="rounded-lg"
                        />

                        {isAuthor && (
                            <div className="absolute right-6 top-2">
                                <Link to={`/edit-post/${post.$id}`}>
                                    <Button bgColor="bg-green-600" className="text-white px-3 py-0.5 rounded-sm mr-3 hover:bg-green-500" Children={'Edit'} />
                                </Link>
                                <Button bgColor="bg-red-600" className="text-white px-3 py-0.5 rounded-sm hover:bg-red-500" onClick={deletePost} Children={'Delete'} />

                            </div>
                        )}
                    </div>
        
                    <div className="w-full">
                        <h1 className="text-2xl font-bold mb-5">{post.title}</h1>
                    </div>
                    <div className="">
                        {parse(post.content)}
                    </div>
                    <div className="font-light text-end mr-6  mt-3">
                        Posted by {post.postedBy}
                    </div>
                </Container>
            </div>
        ) : null;
    }
}