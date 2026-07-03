import { Outlet } from "react-router-dom"
import NavbarExtrato from "../components/NavbarExtrato";
import "../css/Navbar.css"

function LayoutExtrato () {
    return (
        <>
            <NavbarExtrato/>
            <Outlet />
        </>
    )
}

export default LayoutExtrato;