import Logo from "../assets/logo.png";
import { FaSignOutAlt } from "react-icons/fa";
import { BiTransfer } from "react-icons/bi";
import { AiFillFileText } from "react-icons/ai";
import { IoHomeSharp } from "react-icons/io5";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { MdOutlineFileDownload } from "react-icons/md";
import { NavLink, useNavigate } from "react-router-dom";

import "../css/Navbar.css";

function Navbar () {

    const navigate = useNavigate();

    function handlerOut () {
        localStorage.removeItem("token");
        setTimeout(() => {
            navigate("/login");
        }, 1500)
    }


    return (
        <div className="container_navbar">
            <div className="navbar">
                <div className="logo_navbar">
                    <img src={Logo} alt="logo" />
                </div>
                <div className="pages">
                    <NavLink to="/" className={({ isActive }) => isActive ? "link_navbar ativo" : "link_navbar"}>
                        <IoHomeSharp/> 
                        Dashboard
                    </NavLink>
                    <NavLink to="/transfer" className={({ isActive }) => isActive ? "link_navbar ativo" : "link_navbar"}>
                        <BiTransfer/>
                        Transferências
                     </NavLink>
                    <NavLink to="/extrato" className={({ isActive }) => isActive ? "link_navbar ativo" : "link_navbar"}>
                        <AiFillFileText/> 
                        Extrato
                    </NavLink>
                    <NavLink to="/deposito" className={({ isActive }) => isActive ? "link_navbar ativo" : "link_navbar"}>
                        <MdOutlineFileDownload/> 
                        Deposito
                    </NavLink>
                    <NavLink to="/saque" className={({ isActive }) => isActive ? "link_navbar ativo" : "link_navbar"}>
                        <FaMoneyBillTransfer/> 
                        Sacar
                    </NavLink>
                </div>
                <div className="out">
                    <NavLink id="link_navbar"  className="link_navbar" onClick={handlerOut}><FaSignOutAlt/> Sair</NavLink>
                </div>
            </div>
        </div>
    )
}

export default Navbar;