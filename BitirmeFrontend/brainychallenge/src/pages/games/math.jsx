import { useEffect, useState } from "react";
import { Box, Heading, Textarea, Button, Image } from "@chakra-ui/react";
import Board from "../../components/board";
import Level from "../../components/level";
import Screen from "../../components/screen";
import { saveUserScore } from "../../Request";

function MentalMath() {
   const [isOn, setIsOn] = useState(false);
   const [isOver, setIsOver] = useState(false);
   let [value, setValue] = useState("");
   const [time, setTime] = useState(10);

   const [play, setPlay] = useState({
      score: 0,
      numberOne: 0,
      numberTwo: 0,
      operation: "",
   });

   function getRandomNumber() {
      return Math.floor(Math.random() * 10 + 1);
   }

   function getRandomOperation() {
      const operations = ["+", "-", "*"];
      return operations[Math.floor(Math.random() * operations.length)];
   }

   const handleSaveScore = async () => {
      try {
         await saveUserScore("math", play.score);
         alert("Skor başarıyla kaydedildi!");
      } catch (error) {
         console.error("Error saving score:", error);
         alert("Skor kaydedilemedi!");
      }
   };

   function calculateAnswer(numberOne, numberTwo, operation) {
      switch (operation) {
         case "+":
            return numberOne + numberTwo;
         case "-":
            return numberOne - numberTwo;
         case "*":
            return numberOne * numberTwo;

         default:
            return 0;
      }
   }

   useEffect(() => {
      if (isOn) {
         setPlay({
            score: 0,
            numberOne: getRandomNumber(),
            numberTwo: getRandomNumber(),
            operation: getRandomOperation(),
         });
         setTime(10);
      }
   }, [isOn]);

   useEffect(() => {
      let interval = null;
      if (isOn) {
         interval = setInterval(() => {
            setTime((prevTime) => {
               if (prevTime <= 1) {
                  clearInterval(interval);
                  setIsOver(true);
                  setIsOn(false);
                  return 0;
               }
               return prevTime - 1;
            });
         }, 1000);
      }
      return () => clearInterval(interval);
   }, [isOn]);

   async function handleInputChange(e) {
      setValue(e.target.value);
      let answer = calculateAnswer(play.numberOne, play.numberTwo, play.operation);
      if (parseInt(e.target.value, 10) === answer) {
         setPlay({
            numberOne: getRandomNumber(),
            numberTwo: getRandomNumber(),
            operation: getRandomOperation(),
            score: play.score + 1,
         });
         setValue("");
      }
   }

   const handleKeyDown = (event) => {
      if (event.key === "Enter") {
         event.preventDefault();
      }
   };

   if (isOn) {
      return (
         <Board>
            <Box>
               <Level>{play.score}</Level>
               <Heading
                  size="xl"
                  py={2}
                  color="blue.200"
                  justifyItems={"center"}
               >
                  Kalan Süre: {time}
               </Heading>
               <Box
                  display="flex"
                  alignItems="center"
               >
                  <Box>
                     <Heading>
                        {play.numberOne} {play.operation} {play.numberTwo} =
                     </Heading>
                  </Box>
                  <Box p="10">
                     <Textarea
                        value={value}
                        onKeyDown={handleKeyDown}
                        onChange={handleInputChange}
                        placeContent="center"
                        width="40"
                        fontSize="4xl"
                     />
                  </Box>
               </Box>
            </Box>
         </Board>
      );
   } else if (isOver) {
      return (
         <Board>
            <Box>
               <Heading
                  size="xl"
                  color="#fff"
                  p={4}
               >
                  Çarpma İşlemi
               </Heading>
               <Heading
                  size="xl"
                  color="#fff"
               >
                  Level: {play.score}
               </Heading>
               <Button
                  mt={10}
                  p={8}
                  mr={4}
                  bg="yellow.400"
                  onClick={() => {
                     setIsOn(true);
                     setIsOver(false);
                  }}
               >
                  Tekrar Oyna
               </Button>
               <Button
                  mt={10}
                  p={8}
                  bg="yellow.400"
                  onClick={handleSaveScore}
               >
                  Kaydet
               </Button>
            </Box>
         </Board>
      );
   } else {
      return (
         <Board>
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
                  src="../calculator.svg"
               />
               <Screen
                  title="Çarpma İşlemi"
                  symbol=""
                  button="Başla"
                  onStatusChange={() => setIsOn(true)}
               >
                  Zaman dolmadan olabildiğince hızlı çöz.
               </Screen>
            </Box>
         </Board>
      );
   }
}

export default MentalMath;
