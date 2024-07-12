import { useState, useEffect } from "react";
import { Box, Button, Center, Text, Image } from "@chakra-ui/react";
import Board from "../../components/board";
import Screen from "../../components/screen";
import { saveUserScore } from "../../Request";

/* eslint-disable react/prop-types */

function ReactionTest() {
   const [gameState, setGameState] = useState("waiting");
   const [startTime, setStartTime] = useState(0);
   const [reactionTime, setReactionTime] = useState(0);

   useEffect(() => {
      if (gameState === "ready") {
         const timeoutId = setTimeout(() => {
            setGameState("clicked");
            setStartTime(Date.now());
         }, Math.random() * 2000 + 2000); // 2-4 saniye sonra yeşil olacak

         return () => clearTimeout(timeoutId);
      }
   }, [gameState]);

   const startGame = () => {
      setGameState("ready");
   };

   const handleScreenClick = () => {
      if (gameState === "clicked") {
         const endTime = Date.now();
         const delta = endTime - startTime;
         setReactionTime(delta);
         setGameState("finished");
      } else if (gameState === "ready") {
         setGameState("Çok erken");
      }
   };

   const resetGame = () => {
      setGameState("waiting");
      setStartTime(0);
      setReactionTime(0);
   };

   const saveScore = async () => {
      try {
         await saveUserScore("reaction", reactionTime);
         alert("Skor başarıyla kaydedildi!");
      } catch (error) {
         console.error("Error saving score:", error);
         alert("Skor kaydedilirken bir hata oluştu.");
      }
   };

   let backgroundColor = "#CE2636"; // Kırmızı
   let messageText = "Yeşil için bekleyin...";

   if (gameState === "clicked") {
      backgroundColor = "#4BDB6A"; // Yeşil
      messageText = "Tıkla!";
   } else if (gameState === "finished") {
      backgroundColor = "#00A3E0"; // Mavi
      messageText = `Reaksiyon Hızınız: ${reactionTime} ms`;
   } else if (gameState === "Çok erken") {
      messageText = "Çok Erken!";
   }

   return (
      <Board>
         {gameState === "waiting" ? (
            <Box
               display="flex"
               flexDirection="column"
               alignItems="center"
            >
               <Image
                  color="white"
                  alt="symbol"
                  mb="15px"
                  h="50px"
                  src="../thunder.svg"
               />
               <Screen
                  title="Reaksiyon Testi"
                  symbol=""
                  button="Başla"
                  onStatusChange={startGame}
               >
                  Refleksinizi ölçmek için yeşil yandığında tıklayın.
               </Screen>
            </Box>
         ) : (
            <Center h="65vh">
               <Box
                  w="100vw"
                  h="100%"
                  bg={backgroundColor}
                  cursor="pointer"
                  onClick={handleScreenClick}
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
               >
                  <Text
                     fontSize="4xl"
                     color="white"
                  >
                     {messageText}
                  </Text>
                  {(gameState === "finished" || gameState === "Çok erken") && (
                     <Box mt="10">
                        <Button
                           p={6}
                           bg="yellow.400"
                           onClick={resetGame}
                           mr={4}
                        >
                           Tekrar Dene
                        </Button>
                        {gameState === "finished" && (
                           <Button
                              p={6}
                              bg="yellow.400"
                              onClick={saveScore}
                           >
                              Kaydet
                           </Button>
                        )}
                     </Box>
                  )}
               </Box>
            </Center>
         )}
      </Board>
   );
}

export default ReactionTest;
