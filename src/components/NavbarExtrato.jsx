import { NavLink } from "react-router-dom";
import { BiTransfer } from "react-icons/bi";
import { AiFillFileText } from "react-icons/ai";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import Logo from "../assets/logo.png"
import { FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../css/Navbar.css"

function NavbarExtrato () {

    const navigate = useNavigate();

    function handlerClick () {
        setTimeout(() => {
            navigate("/")
        },  300)
    }

    return (
        <div className="container_NavbarExtrato">
                <div className="logo_extrato">
                    <div className="fintrack">
                        <img src={Logo} alt="logo" />
                    </div>
                    <div className="out_mobile">
                        <FaSignOutAlt id="sair" onClick={handlerClick}/>
                    </div>
                </div>
                <div className="pages_extrato">
                    <NavLink to="/extrato" id="border" className={({ isActive }) => isActive ? "link_navbar ativo" : "link_navbar"}>
                        Todos
                    </NavLink>
                    <NavLink to="/exTransfer" id="border" className={({ isActive }) => isActive ? "link_navbar ativo" : "link_navbar"}>
                    <BiTransfer/>
                        Transferência
                     </NavLink>
                    <NavLink to="/exSaque" id="border" className={({ isActive }) => isActive ? "link_navbar ativo" : "link_navbar"}>
                    <AiFillFileText/>
                        Saque
                    </NavLink>
                    <NavLink to="/exDeposito" id="border" className={({ isActive }) => isActive ? "link_navbar ativo" : "link_navbar"}>
                    <FaMoneyBillTransfer/>
                        Deposito
                    </NavLink>
                </div>
        </div>
    )
}

export default NavbarExtrato;