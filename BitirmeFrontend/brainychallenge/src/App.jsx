import { ChakraProvider } from "@chakra-ui/provider";
import Layout from "./layouts/main";
import { Routes, Route } from "react-router-dom";
import theme from "./theme";
import Home from "./home";
import Signup from "./pages/signup";
import Login from "./pages/login";
import Sequence from "./pages/games/sequence";
import MentalMath from "./pages/games/math";
import Dashboard from "./pages/dashboard";
import VisualMemory from "./pages/games/visualMemory";
import ReactionTest from "./pages/games/reaction";
import StroopEffect from "./pages/games/stroop";
import Logout from "./pages/logout";
import UserProfile from "./components/userProfile";
import LeaderBoard from "./pages/leaderboard";

/* eslint-disable react/prop-types */

const Website = ({ router }) => {
   return (
      <ChakraProvider theme={theme}>
         <Layout router={router}>
            <Routes>
               <Route
                  index
                  element={<Home />}
               ></Route>
               <Route
                  path={"/signup"}
                  element={<Signup />}
               ></Route>
               <Route
                  path={"/login"}
                  element={<Login />}
               ></Route>
               <Route
                  path={"/scores/leaderboard/:game"}
                  element={<LeaderBoard />}
               ></Route>
               <Route
                  path={"/dashboard"}
                  element={<Dashboard />}
               ></Route>
               <Route
                  path={"/logout"}
                  element={<Logout />}
               ></Route>
               <Route
                  path={"/user/profile/:userId"}
                  element={<UserProfile />}
               />
               <Route
                  path={"/games/sequence"}
                  element={<Sequence />}
               ></Route>
               <Route
                  path={"/games/visualMemory"}
                  element={<VisualMemory />}
               ></Route>
               <Route
                  path={"/games/math"}
                  element={<MentalMath />}
               ></Route>
               <Route
                  path={"/games/reaction"}
                  element={<ReactionTest />}
               ></Route>
               <Route
                  path={"/games/colors"}
                  element={<StroopEffect />}
               ></Route>
            </Routes>
         </Layout>
      </ChakraProvider>
   );
};

export default Website;
