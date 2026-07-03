import { FaUserCircle } from "react-icons/fa";
import { TbTransferVertical } from "react-icons/tb";
import { LuDownload } from "react-icons/lu";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { FaChevronDown } from "react-icons/fa";
import { FaPix } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import "../css/Dashboard.css";
import { Link, NavLink } from "react-router-dom";
import GraficoFinanceiro from "./GraficosFinanceiros";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

function DashboardComponent() {
  const [user, setUser] = useState(null);
  const [extrato, setExtrato] = useState([]);
  const [mostrar, setMostrar] = useState(false);
  const [ aberto, setAberto ] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    //pegar usúario
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Token não encontrado");
    }

    const getUser = async () => {
      const response = await fetch("http://localhost:3000/find/user", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();
      setUser(data.findUser);
    };

    //pegar extrato
    const getExtrato = async () => {
      const response = await fetch("http://localhost:3000/find/trasition", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();
      setExtrato(data.transacoes);
    };

    getExtrato();
    getUser();
  }, []);

  const Saldo = Number(user?.conta?.saldo);
  const SaldoFormatado = Saldo.toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  });

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setAberto(false);
      }
  }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function handlerOut () {
        localStorage.removeItem("token");
        setTimeout(() => {
            navigate("/login");
        }, 1500)
    }

  return (
    <div className="container_dashboard">
      <div className="top">
        <div className="into" >
          <h1 id="title_dashboard">Olá, {user?.name} 👋</h1>
          <p id="parag_dashboard">aqui está o resumo da sua conta</p>
        </div>
        <div className="me">
          <span onClick={() => setAberto(true)}>
            <FaUserCircle /> {user?.name}
          </span>
          <div className="none">
            {aberto && (
            <div className="navlinks" ref={menuRef}>
              <div className="link_mobile">
                <NavLink to="/transfer" id="navLink">
                  Transferir
                </NavLink>
              </div>
              <div className="link_mobile">
                <NavLink to="/deposito" id="navLink">
                  Deposito
                </NavLink>
              </div>
              <div className="link_mobile">
                <NavLink to="/saque" id="navLink">
                  Sacar
                </NavLink>
              </div>
              <div className="link_mobile">
                <NavLink to="/extrato" id="navLink">
                  Extrato
                </NavLink>
              </div>
              <div className="link_mobile">
                <NavLink className="link_mobile" id="navLink" onClick={handlerOut}>
                  Sair
                </NavLink>
              </div>
            </div>
          )}
          </div>
        </div>
      </div>
      <div className="dashboard">
        <div className="track">
          <div className="saldo">
            <div className="eye">
              <span id="text_saldo">Saldo disponivel</span>
              <button onClick={() => setMostrar(!mostrar)}>
                {mostrar ? <FaRegEye /> : <FaRegEyeSlash />}
              </button>
            </div>

            <h2 id="saldoFormatado" className={!mostrar ? "text" : "noText"}>
              {!mostrar ? SaldoFormatado : "*******"}
            </h2>
          </div>
          <div className="rendimento">
            <div className="saldo_total">
              <span>saldo total</span>
              <h3>R$ ********</h3>
            </div>
            <div className="rendimento_dashboard">
              <span>Rendimento</span>
              <h3>+ R$ ****</h3>
            </div>
          </div>
          <div className="trask_button">
            <NavLink
              to="/transfer"
              className={({ isActive }) =>
                isActive ? "link_dashboard ativo" : "link_dashboard"
              }
            >
              <TbTransferVertical />
              Transferir
            </NavLink>
            <NavLink
              to="/deposito"
              className={({ isActive }) =>
                isActive ? "link_dashboard ativo" : "link_dashboard"
              }
            >
              <LuDownload />
              Depositar
            </NavLink>
            <NavLink
              to="/saque"
              className={({ isActive }) =>
                isActive ? "link_dashboard ativo" : "link_dashboard"
              }
            >
              <FaMoneyBillTransfer />
              Sacar
            </NavLink>
            <NavLink
              to="/transfer"
              className={({ isActive }) =>
                isActive ? "link_dashboard ativo" : "link_dashboard"
              }
            >
              <FaPix />
              Pix
            </NavLink>
          </div>
        </div>
        <div className="extrato">
          <h1>Últimas movimentações</h1>
          {Array.isArray(extrato) &&
            (extrato.length === 0 ? (
              <span className="noExtrato">Nenhuma movimentação</span>
            ) : (
              extrato.slice(0, 3).map((e) => {
                const valorFormatado = Number(e.valor).toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                });

                const dataFormatada = new Date(e.createdAt).toLocaleString(
                  "pt-BR",
                );

                return (
                  <div key={e.id} className="ex">
                    <span>{e.tipo}</span>
                    <span>{valorFormatado}</span>
                    <span>{dataFormatada}</span>
                  </div>
                );
              })
            ))}
          <div className="button_extrato">
            <button>
              <Link to="/extrato" id="extrato">
                Ver mais <br /> <FaChevronDown />
              </Link>
            </button>
          </div>
        </div>
      </div>
      <div className="grafico">
        <div className="title_grafico">
          <h2>Fluxo Financeiro</h2>
          <p>Entradas e saídas dos últimos meses</p>
        </div>
        <GraficoFinanceiro />
      </div>
    </div>
  );
}

export default DashboardComponent;
