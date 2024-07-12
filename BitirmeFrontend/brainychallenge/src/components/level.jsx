import { Heading } from "@chakra-ui/react";
/* eslint-disable react/prop-types */
const Level = ({ children }) => {
   return (
      <Heading size="xl" py={10} color="blue.200">
         Level: {children}
      </Heading>
   );
};

export default Level;
