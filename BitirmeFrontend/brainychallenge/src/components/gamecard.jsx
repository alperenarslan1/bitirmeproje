import { Box, Container, Heading, Text, useColorModeValue } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { Image } from "@chakra-ui/react";
/* eslint-disable react/prop-types */

const Gamecard = ({ children, name, to, srcImage }) => {
   const bgColor = useColorModeValue("gray.50", "gray.800");
   const borderColor = useColorModeValue("gray.200", "gray.700");

   return (
      <Container centerContent>
         <RouterLink to={to}>
            <Box
               w="500px"
               h="270px"
               textAlign="center"
               bg={bgColor}
               borderWidth="4px"
               borderColor={borderColor}
               borderRadius="xl"
               overflow="hidden"
               shadow="lg"
               transition="transform 0.2s, box-shadow 0.2s"
               cursor="pointer"
               _hover={{
                  boxShadow: "xl",
                  transform: "scale(1.03)",
               }}
            >
               <Box pt={8} pb={4} px={4}>
                  <Heading display="flex" flexDirection="column" alignItems="center" size="2xl" color="teal.500">
                     <Image alt="logo" h="35px" src={srcImage} />
                  </Heading>
                  <Heading size="lg" my={4} color="teal.600">
                     {name}
                  </Heading>
               </Box>
               <Text p={4} fontSize="14pt" color="gray.600">
                  {children}
               </Text>
            </Box>
         </RouterLink>
      </Container>
   );
};

export default Gamecard;
