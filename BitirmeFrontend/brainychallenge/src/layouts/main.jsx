import { Helmet } from "react-helmet";
import { Box, Container } from "@chakra-ui/react";
import Navbar from "../components/navbar";
import { useLocation } from "react-router-dom";
/* eslint-disable react/prop-types */
const Main = ({ children }) => {
   const location = useLocation();

   return (
      <Box as="main">
         <Helmet>
            <meta
               name="viewport"
               content="width=device-width, initial-scale=1"
            />
            <title>Brainy Challenge</title>
         </Helmet>

         <Navbar path={location.pathname} />

         <Container
            maxWidth={"full"}
            h="100vh"
            py={19}
            px={0}
         >
            {children}
         </Container>
      </Box>
   );
};

export default Main;
