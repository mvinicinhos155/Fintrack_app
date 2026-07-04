import Logo from "../assets/logo.png";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../css/Login.css";

function LoginComponent() {

    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ erro, setErro ] = useState("");
    const[ show, setShow ] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const time = setTimeout(() => {
            setShow(true)
        }, 500);

        return () => clearTimeout(time)
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if( !email.trim() || !password.trim() ) {
                setErro("Preencha todos o campos")
                return
            }

            setErro("");

            const response = await fetch("https://fintrack-backend-26qa.onrender.com/login", {
                method: "POST",
                headers: { "Content-Type" : "application/json" },
                body: JSON.stringify({
                    email, 
                    password
                })
            });
                if(!response.ok) {
                    const error = await response.json();
                    throw new Error(error.error);
                }

            const data = await response.json();
            localStorage.setItem("token", data.token);


            setEmail("");
            setPassword("");

            setTimeout(() => {
                navigate("/");
            }, 1000);
    }

    return (
        <div className={show ? "container_login show" : "container_login"}>
            <div className="centralize">
                <div className="left-login">
                    <nav className="nav-login">
                        <img src={Logo} alt="logo"/>
                    </nav>
                    <div className="form-div">
                        <h2 id="title_login">Acesse sua conta</h2>
                        <form className="form-login" onSubmit={handleSubmit}>
                            <input type="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)}/>
                            <input type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)}/>
                            <span id="error_login">{erro}</span>
                            <button type="submit">Entrar</button>
                            <div className="links">
                                <span>Esqueci a senha</span>
                                <Link id="link_login" to="/cadastro">Fazer cadastro</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div className="right-login"></div>
        </div>
    )
}

export default LoginComponent;