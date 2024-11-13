import Slider from '../../components/slider/slider'
import './singlePage.scss'
import Map from '../../components/map/map'
import { useLoaderData, useNavigate } from 'react-router-dom'
import DOMPurify from 'dompurify'
import { useContext, useState } from 'react'
import { authContext } from '../../context/authContext.jsx'
import apiRequest from '../../lib/apiRequest.js'

function SinglePage() {
    const post = useLoaderData()
    const { currUser } = useContext(authContext)
    const navigate = useNavigate()
    const [saved, setSaved] = useState(post.isSaved)


    const handleSave = async () => {
        if (!currUser) {
            navigate("/login")
            return
        }
        setSaved(prev => !prev)
        try{
            await apiRequest.post("/users/save", {postId: post.id})
        } catch (err) {
            setSaved(prev => !prev)
            console.error(err)
        }
    }
    return (
        <div className="singlePage">
            <div className="details">
                <div className="wrapper">
                    <Slider images={post.img} />
                    <div className="info">
                        <div className="top">
                            <div className="post">
                                <h1>{post.title}</h1>
                                <div className="address">
                                    <img src="./pin.png" alt="" />
                                    <span>{post.address}</span>
                                </div>
                                <div className="price">$ {post.price}</div>
                            </div>
                            <div className="user">
                                <img src={post.user.avatar} alt="" />
                                <span>{post.user.username}</span>
                            </div>
                        </div>
                        <div className="bottom" dangerouslySetInnerHTML={{ 
                            __html: DOMPurify.sanitize(post.postDetail.desc),
                        }}></div>
                    </div>
                </div>
            </div>
            <div className="features">
                <div className="wrapper">
                    <p className='title'>General</p>
                    <div className="listVertical">
                        <div className="feature">
                            <img src="./utility.png" alt="" />
                            <div className="featureText">
                                <span>Utilities</span>
                                {
                                    post.postDetail.utilites === "owner" ?
                                        <p>Owner Paid</p> :
                                        <p>Tenant Paid</p>
                                }
                            </div>
                        </div>
                        <div className="feature">
                            <img src="./pet.png" alt="" />
                            <div className="featureText">
                                <span>Pet Policy</span>
                                {
                                    post.postDetail.pet === "allowed" ?
                                        <p>Pets Allowed</p> :
                                        <p>No Pets Allowed</p>
                                }
                            </div>
                        </div>
                        <div className="feature">
                            <img src="./fee.png" alt="" />
                            <div className="featureText">
                                <span>Income Policy</span>
                                <p>{post.postDetail.income}</p>
                            </div>
                        </div>
                    </div>

                    <p className='title'>Room Sizes</p>
                    <div className="sizes">
                        <div className="size">
                            <img src="./size.png" alt="" />
                            <span>{post.postDetail.size} sqft</span>
                        </div>
                        <div className="size">
                            <img src="./bed.png" alt="" />
                            <span>{post.bedroom} bedroom</span>
                        </div>
                        <div className="size">
                            <img src="./bath.png" alt="" />
                            <span>{post.bathroom} bathroom</span>
                        </div>
                    </div>

                    <p className='title'>Nearby Places</p>
                    <div className="listHorizontal">
                        <div className="feature">
                            <img src="./school.png" alt="" />
                            <div className="featureText">
                                <span>School</span>
                                <p>{post.postDetail.school}m away</p>
                            </div>
                        </div>
                        <div className="feature">
                            <img src="./bus.png" alt="" />
                            <div className="featureText">
                                <span>Bus Stop</span>
                                <p>{post.postDetail.bus}m away</p>
                            </div>
                        </div>
                        <div className="feature">
                            <img src="./restaurant.png" alt="" />
                            <div className="featureText">
                                <span>Restaurant</span>
                                <p>{post.postDetail.restaurant}m away</p>
                            </div>
                        </div>
                    </div>

                    <p className='title'>Location</p>
                    <div className="mapContainer">
                        <Map data={post} />
                    </div>

                    <div className="buttons">
                        <button>
                            <img src="./chat.png" alt="" />
                            <span>Send a Message</span>
                        </button>
                        <button onClick={handleSave} style={{
                            backgroundColor: saved ? '#fece51' : 'white',
                            color: saved ? '#ffffff' : '#000000'
                        }}>
                            <img src="./save.png" alt="" />
                            {saved ? "Place Saved" : "Save the Place"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SinglePage