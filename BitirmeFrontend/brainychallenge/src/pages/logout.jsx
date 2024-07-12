import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../utils/AuthContext";

function Logout() {
   const navigate = useNavigate();
   const { logout } = useContext(AuthContext);

   useEffect(() => {
      logout();
      navigate("/");
   }, [logout, navigate]);

   return null;
}

export default Logout;
