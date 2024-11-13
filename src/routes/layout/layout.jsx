import './layout.scss'
import NavBar from '../../components/navBar/navBar.jsx'
import { Outlet, Navigate } from 'react-router-dom'
import { useContext } from 'react'
import { authContext } from '../../context/authContext.jsx'


function Layout() {
    return (
        <div className="layout">
            <div className="navbar">
                <NavBar />
            </div>
            <div className="content">
                <Outlet />
            </div>
        </div>
    )
}

function RequireAuth() {

    const { currUser } = useContext(authContext)

    if (!currUser) {
        return <Navigate to="/login" />
    }

    return (
        currUser && (
            <div className="layout">
                <div className="navbar">
                    <NavBar />
                </div>
                <div className="content">
                    <Outlet />
                </div>
            </div>
        )
    )
}


export { Layout, RequireAuth }