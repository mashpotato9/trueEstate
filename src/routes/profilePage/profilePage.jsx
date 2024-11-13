import Chat from '../../components/chat/chat.jsx';
import List from '../../components/list/list.jsx';
import './profilePage.scss';
import apiRequest from '../../lib/apiRequest.js';
import { Await, Link, useLoaderData, useNavigate } from 'react-router-dom';
import { Suspense, useContext } from 'react';
import { authContext } from '../../context/authContext.jsx';

function ProfilePage() {
    const data = useLoaderData()
    const navigate = useNavigate()

    const { updateUser, currUser } = useContext(authContext)
    

    const handleLogout = async () => {
        try {
            await apiRequest.post("/auth/logout")
            updateUser(null)
            navigate("/")
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="profilePage">
            <div className="details">
                <div className="wrapper">
                    <div className="title">
                        <h1>User Information</h1>
                        <Link to='/profile/update'>
                            <button>Update Profile</button>
                        </Link>
                    </div>
                    <div className="info">
                        <span>Avatar: <img src={currUser.userInfo.avatar || "/noavatar.png"} alt="" /></span>
                        <span>Username: <b>{currUser.userInfo.username}</b></span>
                        <span>E-mail: <b>{currUser.userInfo.email}</b></span>
                        <button onClick={handleLogout}>Logout</button>
                    </div>
                    <div className="title">
                        <h1>My List</h1>
                        <Link to="/add">
                            <button>Create a New Post</button>
                        </Link>
                    </div>
                    <Suspense fallback={<div>Loading...</div>}>
                        <Await
                            resolve={data.postResponse}
                            errorElement={
                                <p>Error loading your list!</p>
                            }
                        >
                            {(postResponse) => <List data={postResponse.data.posts} />}
                        </Await>
                    </Suspense>
                    <div className="title">
                        <h1>Saved List</h1>
                    </div>
                    <Suspense fallback={<div>Loading...</div>}>
                        <Await
                            resolve={data.postResponse}
                            errorElement={
                                <p>Error loading your saved list!</p>
                            }
                        >
                            {(postResponse) => <List data={postResponse.data.savedPosts} />}
                        </Await>
                    </Suspense>
                </div>
            </div>
            <div className="chatContainer">
                <div className="wrapper">
                <Suspense fallback={<div>Loading...</div>}>
                        <Await
                            resolve={data.chatResponse}
                            errorElement={
                                <p>Error loading chats!</p>
                            }
                        >
                            {(chatResponse) => <Chat data={chatResponse.data} />}
                        </Await>
                    </Suspense>
                    <Chat />
                </div>
            </div>
        </div>
    )
}

export default ProfilePage