import Logo from "../assets/logo.png";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../css/Cadastro.css";

function CadastroComponent() {

    const [ name, setName ] = useState("");
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

    const handerSubmit = async (e) => {
        try {
            e.preventDefault();

            if(!name.trim() || !email.trim() || !password.trim()) {
                setErro("Preencha todos o campos")
                return
            }

            setErro("");

            const response = await fetch("https://fintrack-backend-26qa.onrender.com/create/user", {
                method: "POST",
                headers: { "Content-Type" : "application/json" },
                body: JSON.stringify({
                    name,
                    email, 
                    password
                })
            });
                if(!response.ok) {
                    const error = await response.json();
                    throw new Error(error.error);
                }

            setName("");
            setEmail("");
            setPassword("");

            setTimeout(() => {
                navigate("/login");
            }, 1000);
            
        } catch (error) {
            if (error instanceof Error) {
                alert(error.message);
            }
        }
    } 

    return (
        <div className={show ? "container_cadastro show" : "container_cadastro"}>
            <div className="left-cadastro"></div>
            <div className="right-cadastro">
                <nav className="nav-cadastro">
                    <img src={Logo} alt="logo"/>
                </nav>
                <div className="form-div">
                    <h2 id="text_cadastro">Abra sua conta na FinTrack</h2>
                    <p id="parag_cadastro">Preencha seus dados dados para continuar</p>
                    <form className="form-cadastro" onSubmit={handerSubmit}>
                        <input type="text" placeholder="Nome" value={name} onChange={(e) => setName(e.target.value)}/>
                        <input type="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)}/>
                        <input type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)}/>
                        <span id="caracteres">
                            senha deve conter 8 caracteres <br />
                            uma letra maiúscula e numero.
                        </span>
                        <button type="submit">Cadastrar</button>
                        <span id="error_cadastro">{erro}</span>
                        <Link to="/login" id="link">
                            Já tenho cadastro
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CadastroComponent;