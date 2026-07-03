import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function GraficoFinanceiro() {
  const data = [
    { mes: "Jan", entradas: 2000, saidas: 1200 },
    { mes: "Fev", entradas: 2500, saidas: 1800 },
    { mes: "Mar", entradas: 1800, saidas: 900 },
    { mes: "Abr", entradas: 3000, saidas: 1500 },
  ];

  return (
    <ResponsiveContainer width="90%" height={250}>
      <LineChart data={data}>
        <CartesianGrid vertical={false} opacity={0.1} />
        <XAxis dataKey="mes" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="entradas" />
        <Line type="monotone" dataKey="saidas" />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default GraficoFinanceiro;