import { MdOutlineFileUpload } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { useState, useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../css/Saque.css";

function SaqueComponent() {
  const [user, setUser] = useState(null);
  const [valor, setValor] = useState("");
  const [descricao, setDescricao] = useState("");
  const [error, setError] = useState("");
  const [aberto, setAberto] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Erro ao pegar token");
    }

    const getUser = async () => {
      const response = await fetch("http://localhost:3000/find/user", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();
      setUser(data.findUser);
    };

    getUser();
  }, []);

  const valorFormatado = Number(user?.conta?.saldo).toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  });

  async function handlerSubmit(e) {
    e.preventDefault();

    if (!valor.trim()) {
      setError("Preencha campo obrigatorio");
    }

    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Erro ao pegar token");
    }

    const response = await fetch("https://fintrack-backend-26qa.onrender.com/withdraw", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        valor,
        descricao,
      }),
    });

    if (!response.ok) {
      throw new Error("Erro ao realizar o saque");
    }

    setTimeout(() => {
      setAberto(true);
    }, 300);

    setValor("");
    setDescricao("");
  }

  function handlerClick () {
    setTimeout(() => {
      navigate("/");
    }, 700)
  }

  return (
    <div className="container_saque">
      <div className="top_saque">
        <div className="text_saque">
          <h1>Sacar</h1>
          <p>Realize um saque da sua conta</p>
        </div>
        <div className="icon_saque">
          <MdOutlineFileUpload />
        </div>
      </div>
      <div className="dados_saque">
        <div className="title_saque">
          <h1>Dados do Saque</h1>
        </div>
        <div className="contaOrigem">
          <span>Conta de Origem</span>
          <span id="flex">
            <FaRegUser id="user" /> {user?.name}
          </span>
        </div>
        <div className="saldoSaque">
          <span>Saldo Disponivel</span>
          <h3 id="valor">{valorFormatado}</h3>
        </div>
        <form className="form_saque" onSubmit={handlerSubmit}>
          <div className="valorSaque">
            <span>Valor do Saque</span>
            <div className="valorSaque_input">
              <span>R$</span>
              <input
                type="number"
                placeholder="0,00"
                onChange={(e) => setValor(e.target.value)}
              />
            </div>
            <span id="error">{error}</span>
          </div>
          <div className="descricaoSaque">
            <span>Descrição(opcional)</span>
            <input
              type="text"
              placeholder="Ex: Saque no caixa eletrônico"
              onChange={(e) => setDescricao(e.target.value)}
            />
          </div>
          <div className="buttonSaque">
            <button type="submit">Confirmar Saque</button>
          </div>

          {aberto && (
            <div className="overlay">
              <div className="modal">
                <h1>Saque Realizada com sucesso</h1>
                <h2>
                  Muito Obrigado por escolher nosso banco para realizar
                  saque!
                </h2>
                <FaCheckCircle className="checkin" />
                <button onClick={handlerClick}>
                  Voltar para pagina inicial
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default SaqueComponent;
