import { useNavigate } from "react-router-dom";
import { Center, Container, Box, Wrap, WrapItem } from "@chakra-ui/react";
import Screen from "./components/screen";
import Gamecard from "./components/gamecard";
import { Image } from "@chakra-ui/react";
import Footer from "./components/footer";

function Home() {
   const navigate = useNavigate();

   const handleButtonClick = () => {
      navigate("/games/reaction");
   };
   return (
      <Box
         h="100%"
         w="100%"
      >
         <Center
            w="100%"
            h="55vh"
            bg="#3182CE"
         >
            <Box
               display="flex"
               p={2}
               mb={2}
               textAlign="center"
               justifyContent="center"
            >
               <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
               >
                  <Image
                     src="/logom2.png"
                     alt="logo"
                     h="100px"
                  />
                  <Screen
                     title="Brainy Challenge"
                     symbol=""
                     button="Başlayın"
                     onStatusChange={handleButtonClick}
                  >
                     Hafıza ve zeka oyunlarıyla bilişsel becerilerinizi test edin.
                  </Screen>
               </Box>
            </Box>
         </Center>
         <Container maxW={"full"}>
            <Wrap
               mx="100px"
               spacingX="5px"
               spacingY="30px"
               justify="center"
               py={8}
            >
               <WrapItem>
                  <Gamecard
                     name="Reaksiyon Testi"
                     to="/games/reaction"
                     srcImage="./thunder.svg"
                  >
                     Yeşil yandığında basın
                  </Gamecard>
               </WrapItem>
               <WrapItem>
                  <Gamecard
                     name="Renk Bilmecesi"
                     srcImage="./stroop.png"
                     to="/games/colors"
                  >
                     Renk karmaşıklığıyla baş edebilecek misin?
                  </Gamecard>
               </WrapItem>
               <WrapItem>
                  <Gamecard
                     name="Sıra Hafızası"
                     to="/games/sequence"
                     srcImage="./memory.svg"
                  >
                     Karelerin sırasını takip edin.
                  </Gamecard>
               </WrapItem>
               <WrapItem>
                  <Gamecard
                     name="Hızlı Matematik"
                     to="/games/math"
                     srcImage="./calculator.svg"
                  >
                     1 dakika içerisinde kaç tane dört işlemi çözebilirsin?
                  </Gamecard>
               </WrapItem>
               <WrapItem>
                  <Gamecard
                     name="Görsel Hafıza"
                     to="/games/visualMemory"
                     srcImage="./brain.jpg"
                  >
                     1 dakika içerisinde kaç tane dört işlemi çözebilirsin?
                  </Gamecard>
               </WrapItem>
            </Wrap>
         </Container>
         <Footer />
      </Box>
   );
}

export default Home;
