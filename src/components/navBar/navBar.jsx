import './navBar.scss'
import {useContext, useState} from 'react'
import { Link } from 'react-router-dom'
import { authContext } from '../../context/authContext'
import { useStore } from '../../lib/notificationstore'

function NavBar(){
    console.log('NavBar rendering');

    const [open, setOpen] = useState(false)
    const {currUser} = useContext(authContext)
    const fetch = useStore(state => state.fetch)
    const num = useStore(state => state.num)
    

    if(currUser) fetch()


    return (
        <nav>
            <div className="left">
                <a href="" className='logo'>
                    <img src="./logo.png" alt="" />
                    <span>TrueEstate</span>
                </a>
                <Link to='/'>Home</Link>
                <a href="">About</a>
                <a href="">Contact</a>
                <a href="">Agents</a>
            </div>
            <div className="right">
                {currUser ? (
                    <div className='user'>
                        <img src={currUser.userInfo.avatar || "/noavatar.png"} alt="" />
                        <span>{currUser.userInfo.username}</span>
                        <Link to='/profile' className='profile'>
                            {num > 0 && <div className="notification">{num}</div>}
                            <span>Profile</span>
                        </Link>
                    </div>
                ) : (
                <><a href="/login">Login</a>
                <a href="/register" className='register'>Sign Up</a></>)}
                <div className="menuIcon">
                    <img src="./menu.png" alt="" onClick={()=> setOpen(!open)}/>
                </div>
                <div className={open ? "menu active" : "menu"}>
                    <a href="/">Home</a>
                    <a href="/">About</a>
                    <a href="/">Contact</a>
                    <a href="/">Agents</a>
                    <a href="/">Login</a>
                    <a href="/">Sign up</a>
                </div>
            </div>
        </nav>

    )
}

export default NavBar