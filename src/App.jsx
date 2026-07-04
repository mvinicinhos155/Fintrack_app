import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Login from "./pages/Login.jsx"
import Cadastro from "./pages/Cadastro.jsx"
import Dashboard from "./pages/Dashboard.jsx"
import Transferencia from "./pages/Transferêcia.jsx"
import ProtectedRoute from "./routes/ProtectedRoute.jsx"
import Extrato from "./pages/Extrato.jsx"
import Layout from "./Layout/Layout.jsx"
import ExtratoSaques from "./pages/historicos/Saques.jsx"
import Depositos from "./pages/historicos/Depositos.jsx"
import LayoutExtrato from "./Layout/LayoutExtrato.jsx"
import Transferencias from "./pages/historicos/Transferencias.jsx"
import Saque from "./pages/Saque.jsx"
import Deposito from "./pages/Deposito.jsx"

function App() {

  return (
    <BrowserRouter>
    
      <Routes>
        <Route path="/login" element={<Login/>}/> 
        <Route path="/cadastro" element={<Cadastro/>}/>
        <Route element={<ProtectedRoute/>}>
          <Route element={<Layout/>}>
            <Route path="/" element={<Dashboard/>}/>
            <Route path="/transfer" element={<Transferencia/>}/>
            <Route path="/saque" element={<Saque/>}/>
            <Route path="/deposito" element={<Deposito/>}/>
            <Route element={<LayoutExtrato/>}>
              <Route path="/extrato" element={<Extrato/>}/>
              <Route path="/exTransfer" element={<Transferencias/>}/>
              <Route path="/exSaque" element={<ExtratoSaques/>}/>
              <Route path="/exDeposito" element={<Depositos/>}/>
            </Route>
          </Route>    
        </Route>  
        <Route path="*" element={localStorage.getItem("token") ? <Navigate to="/" replace/> : <Navigate to="/login" replace/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
