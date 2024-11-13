import './cards.scss'
import { Link } from 'react-router-dom'

function Cards({data}) {
    return(
        <div className="cards">
            <Link to={`/${data.id}`} className='imageContainer' >
                <img src={data.img[0]} alt="" />
            </Link>
            <div className="textContainer">
                <h2 className='title'>
                    <Link to={`/${data.id}`}>{data.title}</Link>
                </h2>
                <p className='address'>
                    <img src="./pin.png" alt="" />
                    <span>{data.address}</span>
                </p>
                <p className='price'>${data.price}</p>
                <div className="bottom">
                    <div className="features">
                        <div className="feature">
                            <img src="/bed.png" alt="" />
                            <span>{data.bedroom} bedroom</span>
                        </div>
                        <div className="feature">
                            <img src="/bath.png" alt="" />
                            <span>{data.bathroom} bathroom</span>
                        </div>
                    </div>
                    <div className="icons">
                        <div className="icon">
                            <img src="/save.png" alt="" />
                        </div>
                        <div className="icon">
                            <img src="/chat.png" alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cards;