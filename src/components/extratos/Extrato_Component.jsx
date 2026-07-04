import "../../css/Extrato.css";
import { FaUser } from "react-icons/fa";
import { LuClipboardType } from "react-icons/lu";
import { MdDateRange } from "react-icons/md";
import { MdMessage } from "react-icons/md";
import { LuBadgeDollarSign } from "react-icons/lu";
import { useState, useEffect } from "react";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { FaArrowAltCircleRight } from "react-icons/fa";

function ExtratoComponent() {
  const [extrato, setExtrato] = useState([]);
  const [ quantidade, setQuatidade ] = useState(5)

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Token não encontrado");
    }

    const getExtrato = async () => {
      const response = await fetch("https://fintrack-backend-26qa.onrender.com/find/trasition", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();
      setExtrato(data.transacoes);
    };

    getExtrato();
  }, []);

  const tipos = {
    deposito: {
      cor: "#52239975",
      color: "#8d42fd"
    },
    saque: {
      cor: "#0f492577",
      color: "#3cfd83"
    },
    transferencia: {
      cor: "#13316194",
      color: "#4a8bf3"
    },
  };

  return (
    <div className="container_extrato">
      <div className="render_entratos">
        <div className="top_extrato">
          <div className="user_extrato">
            <FaUser />
            <span>NOME</span>
          </div>
          <div className="tipo_extrato">
            <LuClipboardType />
            <span>TIPO</span>
          </div>
          <div className="data_extrato">
            <MdDateRange />
            <span>DATA</span>
          </div>
          <div className="descricao_extrato">
            <MdMessage />
            <span>DESCRIÇÃO</span>
          </div>
          <div className="valor_extrato">
            <LuBadgeDollarSign />
            <span>VALOR</span>
          </div>
        </div>
        <div className="half-extrato">
          {Array.isArray(extrato) &&
            extrato.slice(0, 10).map((e) => (
              <div className="relacao" key={e.id}>
                <div className="user_extrato">
                  <span>{e.contaOrigem?.user?.name}</span>
                </div>
                <div className="tipo_extrato">
                  <span>{e.tipo}</span>
                </div>
                <div className="data_extrato">
                  <span>{new Date(e.createdAt).toLocaleString("pt-br")}</span>
                </div>
                <div className="descricao_extrato">
                  <span>{e.descricao}</span>
                </div>
                <div className="valor_extrato">
                  <span>
                    {Number(e.valor).toLocaleString("pt-br", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </span>
                </div>
              </div>
            ))}
        </div>
      </div>
        <div className="extratos_mobile">
            {Array.isArray(extrato) &&
            extrato.slice(0, quantidade).map((e) => {
                const tipo = tipos[e.tipo.toLowerCase()];

                return (
                    <div className="extrato_mobile" key={e.id}>
                        <div className="left_mobile">
                        <h3>
                            <FaUser id="user_mobile" /> {e.contaDestino?.user?.name}
                        </h3>
                        <span>
                            <MdDateRange />
                            {new Date(e.createdAt).toLocaleString("pt-br")}
                        </span>
                        <span>
                            <MdMessage /> {e.descricao}
                        </span>
                        </div>
                        <div className="rigth_mobile">
                        <span
                            id="deposito_mobile"
                            style={{
                            backgroundColor: tipo.cor,
                            color: tipo.color
                            }}
                        >
                            {e.tipo}
                        </span>
                        <h1 id="valor_mobile">
                            {Number(e.valor).toLocaleString("pt-br", {
                            style: "currency",
                            currency: "BRL",
                            })}
                        </h1>
                        </div>
                    </div>
                );
            })}
            <div className="load_more">
                <FaArrowAltCircleLeft onClick={() => setQuatidade((q) => Math.max(5, q - 5))} id="left_button"/>
                <FaArrowAltCircleRight onClick={() => setQuatidade(quantidade + 5)} id="rigth_button"/>
            </div>
        </div>
    </div>
  );
}

export default ExtratoComponent;
