import { Button, SimpleGrid, Heading, Box, Image } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Board from "../../components/board";
import Screen from "../../components/screen";
import timeout from "../../components/util";
import Level from "../../components/level";
import { saveUserScore } from "../../Request";

function Sequence() {
   const [isOn, setIsOn] = useState(false);
   const [isOver, setIsOver] = useState(false);
   const numberList = Array.from(Array(9).keys()).map((i) => i.toString());

   const initPlay = {
      isDisplay: false,
      userTurn: false,
      score: 0,
      tileSequence: [],
      userGuess: [],
      prevTile: "",
   };

   const [play, setPlay] = useState(initPlay);
   const [flashTile, setFlashTile] = useState("");
   const [playerScore, setPlayerScore] = useState(0);

   const handleSaveScore = async () => {
      try {
         await saveUserScore("sequence", playerScore); // Oyun adı ve skoru iletiliyor
         alert("Skor başarıyla kaydedildi!");
      } catch (error) {
         alert("Skor kaydedilemedi!");
      }
   };

   useEffect(() => {
      if (isOn) {
         setPlay({ ...initPlay, isDisplay: true });
      } else {
         setPlay(initPlay);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [isOn]);

   useEffect(() => {
      if (isOn && play.isDisplay) {
         let tileID = Math.floor(Math.random() * 9);
         if (play.tileSequence.length > 0 && numberList[tileID] === play.prevTile) {
            if (tileID === 8) {
               tileID = 0;
            } else {
               tileID++;
            }
         }
         let newTile = numberList[tileID];
         const copySequence = [...play.tileSequence];
         copySequence.push(newTile);
         setPlay({ ...play, prevTile: newTile, tileSequence: copySequence });
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [isOn, play.isDisplay]);

   useEffect(() => {
      if (isOn && play.isDisplay && play.tileSequence.length) {
         displayTiles();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [isOn, play.isDisplay, play.tileSequence.length]);

   async function displayTiles() {
      await timeout(500);
      for (let i = 0; i < play.tileSequence.length; i++) {
         await timeout(300);
         setFlashTile(play.tileSequence[i]);
         await timeout(300);
         setFlashTile("");

         if (i === play.tileSequence.length - 1) {
            const copyTiles = [...play.tileSequence];
            setPlay({
               ...play,
               isDisplay: false,
               userTurn: true,
               userGuess: copyTiles.reverse(),
            });
         }
      }
   }

   async function tileClickHandle(number) {
      if (!play.isDisplay && play.userTurn) {
         const copyTiles = [...play.userGuess];
         const lastColor = copyTiles.pop();
         setFlashTile(number.toString());

         if (number.toString() === lastColor) {
            if (copyTiles.length) {
               setPlay({ ...play, userGuess: copyTiles });
            } else {
               setPlay({
                  ...play,
                  isDisplay: true,
                  userTurn: false,
                  score: play.tileSequence.length,
                  userGuess: [],
               });
            }
         } else {
            await timeout(200);
            setPlayerScore(play.score);
            setPlay({
               ...initPlay,
               score: play.tileSequence.length,
            });
            setIsOn(false);
            setIsOver(true);
         }
         await timeout(200);
         setFlashTile("");
      }
   }

   if (isOn) {
      return (
         <Board>
            <Box>
               <Level>{play.score}</Level>
               <SimpleGrid
                  spacing="4"
                  columns={{ md: 3 }}
               >
                  {numberList &&
                     numberList.map((tile) => (
                        <Button
                           key={tile}
                           bg="white"
                           p="14"
                           rounded="2xl"
                           opacity={flashTile === tile ? "1" : "0.2"}
                           _hover={{}}
                           onClick={() => tileClickHandle(tile)}
                        ></Button>
                     ))}
               </SimpleGrid>
            </Box>
         </Board>
      );
   } else if (isOver) {
      return (
         <Board>
            <Box>
               <Heading
                  size="2xl"
                  color="#fff"
                  p={4}
               >
                  Sıra Hafızası
               </Heading>
               <Heading
                  size="2xl"
                  color="#fff"
               >
                  Level: {playerScore}
               </Heading>
               <Button
                  mt={10}
                  p="8"
                  bg="yellow.400"
                  mr={4}
                  onClick={() => {
                     setIsOn(true), setIsOver(false);
                  }}
               >
                  Tekrar Oyna
               </Button>
               <Button
                  mt={10}
                  p="8"
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
                  h="69px"
                  src="../memory.svg"
               />

               <Screen
                  title="Sıra Hafızası"
                  symbol=""
                  button="Başla"
                  onStatusChange={setIsOn}
               >
                  Karelerin sıralarını hatırlamaya çalış.
               </Screen>
            </Box>
         </Board>
      );
   }
}

export default Sequence;
