import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = () => {
    const userState = useSelector((state) => state.auth);
    return (userState.email !== "") ? <Outlet /> : <Navigate to="/signin" />;
}

export default PrivateRoute;