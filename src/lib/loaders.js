import { defer } from "react-router-dom";
import apiRequest from "./apiRequest"

export const singlePageLoader = async ({params}) => {
    const res = await apiRequest.get(`/posts/${params.id}`);
    return res.data;
}

export const listPageLoader = async ({request}) => {
    const query = request.url.split('?')[1];
    const res = apiRequest.get(`/posts?${query}`);
    return defer({
        postResponse: res
    });
}

export const profilePageLoader = async () => {
    const post = await apiRequest.get("/users/profilePosts");
    const chat = await apiRequest.get("/chats");

    return defer({
        postResponse: post,
        chatResponse: chat
    });
}