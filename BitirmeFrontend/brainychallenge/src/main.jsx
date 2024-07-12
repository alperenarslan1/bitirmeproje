import ReactDOM from "react-dom/client";

import { BrowserRouter } from "react-router-dom";
import Website from "./App.jsx";
import { AuthProvider } from "./utils/AuthContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
   <AuthProvider>
      <BrowserRouter>
         <Website />
      </BrowserRouter>
   </AuthProvider>
);
