import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "../index";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "../Loader";

export default function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues, formState: { errors } } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            Status: post?.Status || "active",
        },
    });

    const [error, setError] = useState('')
    const [loader, setLoader] = useState(false)
    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const submit = async (data) => {
        setError('')
        setLoader(true)

        if (post) {
            try {
                const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;

                if (file) {
                    appwriteService.deleteFile(post.featuredImg);
                }
                const dbPost = await appwriteService.updatePost(post.$id, {
                    ...data,
                    featuredImg: file ? file.$id : undefined,
                });
                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }

            } catch (error) {
                setError(error.message)
            }
            setLoader(false)

        } else {
            try {
                const file = await appwriteService.uploadFile(data.image[0]);
                if (file) {
                    const fileId = file.$id;
                    data.featuredImg = fileId;
                    const dbPost = await appwriteService.createPost({ ...data, UseId: userData.$id, postedBy: userData.name });

                    if (dbPost) {
                        navigate(`/post/${dbPost.$id}`);
                    }
                }
            } catch (error) {
                setError(error.message)
            }
            setLoader(false)
        }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s/g, "-");

        return "";
    }, []);

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    if (loader) {
        return <Loader />
    } else {
        return (
            <form onSubmit={handleSubmit(submit)} className="flex flex-wrap py-6 my-12 bg-slate-200">
                <div className=" w-full px-6 flex flex-wrap justify-center">
                    <div className="w-full flex flex-wrap justify-center gap-3">
                        <div>
                        <Input
                            label="Title : "
                            placeholder="Title"
                            className="ps-2 mr-2 sm:mr-8"
                            {...register("title", { required: 'Title is required' })}
                        />
                        {errors.title && <p className="text-red-600">{errors.title.message}</p>}
                        </div>
                        <Input
                            label="Slug : "
                            placeholder="Slug"
                            className="mr-2 ps-2"
                            readOnly={true}
                            {...register("slug", { required: true })}
                            onInput={(e) => {
                                setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                            }}
                        />
                    </div>
                    <div className="mt-5 mb-5" >
                        <Input
                            label="Featured Image : "
                            type="file"
                            className=""
                            accept="image/png, image/jpg, image/jpeg, image/gif"
                            {...register("image", { required: !post })}
                        />
                        {errors.image && <p className="text-red-600">Featured Image is required</p>}
                        {post && (
                            <div className="w-full mt-3 text-center">
                                <img
                                    src={appwriteService.previewFile(post.featuredImg)}
                                    alt={post.title}
                                    className="rounded-md"
                                />
                            </div>
                        )}
                    </div>
                </div>
                <div className="w-full px-2 flex flex-col">
                    <RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />

                    <div className="w-full flex flex-wrap justify-center mb-4 mt-4">
                        <Select
                            options={["active", "inactive"]}
                            label="Status"
                            className="mr-4 text-white bg-[#6a5acd] px-3 py-0.5 pb-1 rounded-md"
                            {...register("Status", { required: true })}
                        />
                        <Button type="submit" className="text-white bg-green-600 px-3 py-0.5 rounded-md hover:bg-green-500" Children={post ? "Update" : "Submit"} />
                    </div>
                        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
                </div>
            </form>
        );
    }
}