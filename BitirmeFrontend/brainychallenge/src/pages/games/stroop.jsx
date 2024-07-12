import { useState, useEffect } from "react";
import { Button, Flex, Heading, Text, VStack, Box, Image } from "@chakra-ui/react";
import Board from "../../components/board";
import Level from "../../components/level";
import Screen from "../../components/screen";
import { saveUserScore } from "../../Request";

// Renkler ve onların kodları
const colors = ["Kırmızı", "Mavi", "Yeşil", "Sarı", "Mor", "Turuncu"];
const colorCodes = {
   Kırmızı: "red",
   Mavi: "blue",
   Yeşil: "green",
   Sarı: "yellow",
   Mor: "purple",
   Turuncu: "orange",
};

function StroopEffect() {
   const [isOn, setIsOn] = useState(false);
   const [isOver, setIsOver] = useState(false);
   const [score, setScore] = useState(0);
   const [currentWord, setCurrentWord] = useState("");
   const [currentColor, setCurrentColor] = useState("");
   const [timeLeft, setTimeLeft] = useState(60);
   const [buttonBackgrounds, setButtonBackgrounds] = useState({});

   useEffect(() => {
      let interval = null;
      if (isOn) {
         pickRandomWordAndColor();
         generateButtonBackgrounds();
         interval = setInterval(() => {
            setTimeLeft((oldTime) => {
               if (oldTime <= 1) {
                  setIsOn(false);
                  setIsOver(true);
                  clearInterval(interval);
                  return 0;
               }
               return oldTime - 1;
            });
         }, 1000);
      }
      return () => clearInterval(interval);
   }, [isOn]);

   const pickRandomWordAndColor = () => {
      let word, color;
      do {
         word = colors[Math.floor(Math.random() * colors.length)];
         color =
            Object.values(colorCodes)[
               Math.floor(Math.random() * Object.values(colorCodes).length)
            ];
      } while (color === colorCodes[word]);
      setCurrentWord(word);
      setCurrentColor(color);
   };

   const generateButtonBackgrounds = () => {
      let backgrounds = {};
      colors.forEach((color) => {
         let bg;
         do {
            bg =
               Object.values(colorCodes)[
                  Math.floor(Math.random() * Object.values(colorCodes).length)
               ];
         } while (bg === colorCodes[color]);
         backgrounds[color] = bg;
      });
      setButtonBackgrounds(backgrounds);
   };

   const handleAnswer = (colorName) => {
      if (colorCodes[colorName] === currentColor) {
         setScore(score + 1);
      } else {
         setTimeLeft((prevTime) => Math.max(prevTime - 5, 0));
      }
      pickRandomWordAndColor();
      generateButtonBackgrounds();
   };

   const restartGame = () => {
      setIsOn(true);
      setIsOver(false);
      setScore(0);
      setCurrentWord("");
      setCurrentColor("");
      setTimeLeft(60);
      setButtonBackgrounds({});
   };

   const handleSaveScore = async () => {
      try {
         await saveUserScore("stroop", score);

         alert("Skor başarıyla kaydedildi!");
      } catch (error) {
         alert("Skor kaydedilemedi!");
      }
   };

   if (isOver) {
      return (
         <Board>
            <Box textAlign="center">
               <Heading
                  size="xl"
                  color="#fff"
                  p={4}
               >
                  Oyun Bitti
               </Heading>
               <Heading
                  size="xl"
                  color="#fff"
               >
                  Skorunuz: {score}
               </Heading>
               <Button
                  mt={10}
                  p={7}
                  mr={4}
                  bg="yellow.400"
                  onClick={restartGame}
               >
                  Tekrar Oyna
               </Button>
               <Button
                  mt={10}
                  p={7}
                  bg="yellow.400"
                  onClick={handleSaveScore}
               >
                  Kaydet
               </Button>
            </Box>
         </Board>
      );
   }

   return (
      <Board>
         {!isOn ? (
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
                  src="../stroop.png"
               />
               <Screen
                  title="Renk Bilmecesi"
                  symbol=""
                  button="Başla"
                  onStatusChange={() => {
                     setIsOn(true);
                     setTimeLeft(60);
                  }}
               >
                  1 dakika içerisinde yazılan rengi işaretlemeye çalışın.
               </Screen>
            </Box>
         ) : (
            <VStack spacing={8}>
               <Level>{score}</Level>
               <Heading
                  color="blue.200"
                  size="xl"
               >
                  Kalan Süre: {timeLeft}
               </Heading>
               <Text
                  fontSize="2xl"
                  color={currentColor}
                  fontWeight="bold"
               >
                  {currentWord}
               </Text>
               <Flex
                  wrap="wrap"
                  justifyContent="center"
               >
                  {Object.entries(buttonBackgrounds).map(([text, bgColor]) => (
                     <Button
                        key={text}
                        bg={bgColor}
                        color="white"
                        onClick={() => handleAnswer(text)}
                        m={2}
                     >
                        {text}
                     </Button>
                  ))}
               </Flex>
            </VStack>
         )}
      </Board>
   );
}

export default StroopEffect;
