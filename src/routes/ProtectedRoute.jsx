import { Navigate, Outlet } from "react-router-dom";
import { jwtdecode } from "jwt-decode";

function ProtectedRoute() {
    const token = localStorage.getItem("token");

    if(!token) {
        return <Navigate to="/login" replace/>
    }

    try {
        const decoded = jwtdecode(token);

        // eslint-disable-next-line react-hooks/purity
        if(decoded.exp * 1000 < Date.now()){
            localStorage.removeItem("token");
            <Navigate to="/login" replace/>
        }
    } catch {
        localStorage.removeItem("token");
        return <Navigate to="/login" replace/>
    }

    return <Outlet/>
}

export default ProtectedRoute;