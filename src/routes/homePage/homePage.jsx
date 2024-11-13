import { useContext } from 'react'
import SearchBar from '../../components/searchBar/searchBar.jsx'
import './homePage.scss'
import { authContext } from '../../context/authContext.jsx'

function HomePage() {

    const {currUser} = useContext(authContext)
    
  return (
    <div className="homePage">
        <div className="textContainer">
            <div className="wrapper">
                <h1 className='title'>
                    Find Real Estate & Get Your Dream Place 
                </h1>
                <p className='description'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                    Vivamus ac elit quis est porttitor gravida nec sed odio. 
                    Donec nec ex at velit
                </p>
                <SearchBar/>
                <div className="boxes">
                    <div className="box">
                        <h1>16+</h1>
                        <h2>Years of Experience</h2>
                    </div>
                    <div className="box">
                        <h1>200</h1>
                        <h2>Award Gained</h2>
                    </div>
                    <div className="box">
                        <h1>1200+</h1>
                        <h2>Property Ready</h2>
                    </div>
                </div>
            </div>
        </div>
        <div className="imgContainer">
            <img src="./bg.png" alt="" />
        </div>
    </div>
  )
}

export default HomePage