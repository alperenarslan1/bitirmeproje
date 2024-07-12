import { extendTheme } from "@chakra-ui/react";

const styles = {
   global: () => ({
      body: {
         bg: "#eee",
         color: "#000",
      },
   }),
};

const theme = extendTheme({
   styles,
});

export default theme;
