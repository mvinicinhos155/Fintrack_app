import "../css/Transfer.css";
import { FaPaperPlane } from "react-icons/fa6";
import { GiBackwardTime } from "react-icons/gi";
import { useState, useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

function TransferComponent() {
  const [saldo, setSaldo] = useState(null);
  const [extrato, setExtrato] = useState([]);
  const [ emailDestino, setEmailDestino ] = useState("");
  const [ valor, setValor ] = useState("");
  const [ descricao, setDescricao ] = useState("");
  const [ aberto, setAberto ] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Token não encontrado");
    }

    const getSaldo = async () => {
      const response = await fetch("http://localhost:3000/find/user", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setSaldo(data.findUser);
    };

    const getExtrato = async () => {
      const response = await fetch("http://localhost:3000/find/trasition", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setExtrato(data.transacoes);
    };

    getSaldo();
    getExtrato();
  }, []);

  async function handlersubmit(e) {

      try {
        e.preventDefault();

        const token = localStorage.getItem("token");
          if(!token) {
            throw new Error("Não Autorizado");
          }
        
        const response = await fetch("https://fintrack-backend-26qa.onrender.com/transfer", {
          method: "POST",
          headers: { "Content-type" : "application/json", "Authorization" : `Bearer ${token}`},
          body: JSON.stringify({
            emailDestino,
            valor,
            descricao
          })
        });

          if(!response.ok) {
            throw new Error("Erro ao fazer transação");
          }

          setTimeout(() => {
            setAberto(true)
          }, 300)
        
        setEmailDestino("");
        setValor("");
        setDescricao("");

      } catch (error) {
      alert(error.message || "Erro ao realizar transferência");
      }
  };

  function handlerClick () {
    setTimeout(() => {
      navigate("/");
    }, 700)
  }

  const Saldo = Number(saldo?.conta?.saldo);
  const Saldoformatado = Saldo.toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  });

  return (
    <div className="container_transfer">
      <div className="top_transfer">
        <h1>Transferência</h1>
        <div className="saldo_transfer">
          <span>Saldo atual</span>
          <h1>{Saldoformatado}</h1>
        </div>
      </div>
      <div className="flex">
        <div className="transferencia">
          <div className="title_transfer">
            <h1>Nova Transferência</h1>
          </div>
          <form className="form_transfer" onSubmit={handlersubmit}>
            <div className="input">
              <span>Destinatário</span>
              <input type="text" placeholder="Digite um e-mail" value={emailDestino} onChange={(e) => setEmailDestino(e.target.value)}/>
            </div>
            <div className="input">
              <span>Valor</span>
              <input type="number" placeholder="R$ 0,00" value={valor} onChange={(e) => setValor(e.target.value)} />
            </div>
            <div id="input">
              <span>Descrição</span>
              <textarea type="text" placeholder="Opicional" value={descricao} onChange={(e) => setDescricao(e.target.value)}/>
            </div>
            <div className="button_transferencia">
              <button type="submit">
                Transferir agora <FaPaperPlane />
              </button>
            </div>
          </form>
          {aberto && (
            <div className="overlay">
              <div className="modal">
                <h1>Transação Realizada com sucesso</h1>
                <h2>Muito Obrigado por escolher nosso banco para realizar transações!</h2>
                <FaCheckCircle className="checkin"/>
                <button onClick={handlerClick}>Voltar para pagina inicial</button>
              </div>
            </div>
          )}
        </div>
        <div className="extrato_tranfer">
          <div className="title_transfer">
            <h2 id="title">
              Últimas Transferências <GiBackwardTime id="time" />
            </h2>
          </div>
          <div className="ultimas_transfer">
            {Array.isArray(extrato) &&
              extrato
                .filter((e) => e.tipo === "TRANSFERENCIA").slice(0, 4)
                .map((e) => {
                  const valorFormatado = Number(e.valor).toLocaleString(
                    "pt-BR",
                    {
                      style: "currency",
                      currency: "BRL",
                    },
                  );

                  const dataFormatada = new Date(e.createdAt).toLocaleString(
                    "pt-BR",
                  );

                  return (
                    <div className="historico" key={e.id}>
                      <div className="left">
                        <h3>{e.contaDestino?.user?.name}</h3>
                        <span>{e.tipo}</span>
                      </div>
                      <div className="right">
                        <h3>{valorFormatado}</h3>
                        <span>{dataFormatada}</span>
                      </div>
                    </div>
                  );
                })}
                <div className="button_mais">
                  <Link className="vermais" to="/extrato">
                    Ver mais
                  </Link>
                </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TransferComponent;
