import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"
import "../css/Navbar.css"

function Layout () {
    return (
        <>
            <Navbar/>
            <main className="content">
                <Outlet />
            </main>
        </>
    )
}

export default Layout;