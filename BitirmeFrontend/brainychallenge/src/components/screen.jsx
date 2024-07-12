import { useCallback } from "react";
import { Heading } from "@chakra-ui/react";
import { Box, Button } from "@chakra-ui/react";
import { motion } from "framer-motion";
/* eslint-disable react/prop-types */
const Screen = ({ children, title, symbol, button, onStatusChange, delay = 0.1 }) => {
   const changeGame = useCallback(() => {
      onStatusChange(true);
   }, [onStatusChange]);
   return (
      <motion.div initial={{ y: 200, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: delay }}>
         <Box fontSize="25px" color="#fff">
            <Heading size="4xl" mb={1}>
               {symbol}
            </Heading>
            <Heading size="2xl" mb={5}>
               {title}
            </Heading>
            {children}
            <br />
            <Button bg="yellow.400" p={5} _hover={{ bg: "white" }} my={4} color="#000" fontSize="14pt" onClick={changeGame}>
               {button}
            </Button>
         </Box>
      </motion.div>
   );
};

export default Screen;
