import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    posts: []
}

const postSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        setPosts: (state, action) => {
            state.posts = action.payload
        },

        deletePosts: (state) => {
            state.posts = []
        },

        deletePost: (state, action) => {
            state.posts = state.posts.filter(item => item.$id !== action.payload)
        },

        updatePost: (state, action) => {
            const index = state.posts.findIndex(item => item.$id === action.payload.$id)
            if (index !== -1) {
                state.posts[index] = action.payload
            }
        },

        addPost: (state, action) => {
            state.posts.push(action.payload)
        }
    }
})

export default postSlice.reducer;
export const { setPosts, deletePosts, deletePost, updatePost, addPost } = postSlice.actions