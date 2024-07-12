import { Button, SimpleGrid, Heading, Box, Image } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Board from "../../components/board";
import Screen from "../../components/screen";
import timeout from "../../components/util";
import Level from "../../components/level";
import { saveUserScore } from "../../Request";

function VisualMemory() {
   const [isOn, setIsOn] = useState(false);
   const [isOver, setIsOver] = useState(false);
   const [level, setLevel] = useState(1);
   const [boardSize, setBoardSize] = useState(3);
   const [tilesToFind, setTilesToFind] = useState(3);
   const [tileSize, setTileSize] = useState(90);

   const initPlay = {
      isDisplay: false,
      userTurn: false,
      score: tilesToFind,
      tilePattern: [],
      userGuess: [],
      mask: [],
      userCorrect: [],
   };

   const [play, setPlay] = useState(initPlay);
   const [flashTile, setFlashTile] = useState([]);
   const [wrongTile, setWrongTile] = useState([]);
   const [rewardTile, setRewardTile] = useState([]);
   const [playerScore, setPlayerScore] = useState(0);
   const [playerTrial, setPlayerTrial] = useState(0);

   const handleSaveScore = async () => {
      try {
         await saveUserScore("visualMemory", playerScore);
         alert("Skor başarıyla kaydedildi!");
      } catch (error) {
         console.error("Error saving score:", error);
         alert("Skor kaydedilemedi!");
      }
   };

   useEffect(() => {
      const newSize = Math.ceil(level / 3) + 2;
      setBoardSize(newSize);
      setTilesToFind(level + 2);

      const initialTileSize = 270; // 3x3 için toplam başlangıç boyutu
      const newTileSize = initialTileSize / newSize;
      setTileSize(newTileSize);

      setPlay({ ...initPlay, score: level + 2, isDisplay: true });
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [level]);

   const numberList = Array.from(Array(boardSize * boardSize).keys()).map((i) =>
      i.toString()
   );

   useEffect(() => {
      if (isOn) {
         setPlay({ ...initPlay, isDisplay: true });
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [isOn, boardSize, tilesToFind]);

   useEffect(() => {
      if (isOn && play.isDisplay) {
         let patternIdsSet = new Set();

         while (patternIdsSet.size < tilesToFind) {
            patternIdsSet.add(
               Math.floor(Math.random() * (boardSize * boardSize)).toString()
            );
         }

         let patternIds = Array.from(patternIdsSet);
         setPlay({ ...play, tilePattern: patternIds });
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [isOn, play.isDisplay, boardSize, tilesToFind]);

   useEffect(() => {
      if (isOn && play.isDisplay && play.tilePattern.length) {
         displayTiles();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [isOn, play.isDisplay, play.tilePattern.length]);

   async function displayTiles() {
      await timeout(1000);
      setFlashTile(play.tilePattern);

      await timeout((1000 * play.tilePattern.length) / 2); // Dinamik bekleme süresi
      setFlashTile([]);
      setPlay({ ...play, isDisplay: false, userTurn: true });
   }

   async function tileClickHandle(number) {
      if (!play.isDisplay && play.userTurn) {
         let userGuess = number.toString();
         play.userGuess.push(userGuess);
         if (play.tilePattern.includes(userGuess)) {
            let correct = play.userGuess.filter((guess) =>
               play.tilePattern.includes(guess)
            );
            setFlashTile(correct);
            if (play.tilePattern.length === new Set(play.userGuess).size) {
               await timeout(500);
               setRewardTile(play.tilePattern);
               await timeout(500);
               setRewardTile([]);
               setFlashTile(numberList);
               await timeout(500);
               setFlashTile([]);

               setPlayerTrial(playerTrial + 1);
               setPlayerScore(playerScore + 1);

               setLevel(level + 1);

               setPlay({
                  ...play,
                  isDisplay: true,
                  userTurn: false,
                  userCorrect: [...play.userCorrect, 1],
                  tilePattern: [],
                  userGuess: [],
               });
            }
         } else {
            setFlashTile([userGuess]);

            setWrongTile([userGuess]);
            await timeout(500);
            setWrongTile([]);

            setFlashTile(numberList);
            await timeout(500);
            setFlashTile([]);

            setIsOn(false);
            setIsOver(true);
         }
      }
   }

   const handleRestartGame = () => {
      setIsOn(true);
      setIsOver(false);
      setLevel(1);
   };

   if (isOn) {
      return (
         <Board>
            <Box>
               <Level>{level}</Level>
               <SimpleGrid
                  spacing="3"
                  columns={{ md: boardSize }}
               >
                  {numberList.map((v) => (
                     <Button
                        key={v}
                        bg={
                           rewardTile.includes(v)
                              ? "#38DC35"
                              : wrongTile.includes(v)
                              ? "red"
                              : "white"
                        }
                        w={`${tileSize}px`}
                        h={`${tileSize}px`}
                        p="8"
                        rounded="md"
                        opacity={flashTile.includes(v) ? "1" : "0.3"}
                        _hover={{}}
                        onClick={() => tileClickHandle(v)}
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
                  Visual Memory
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
                  onClick={handleRestartGame}
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
                  h="50px"
                  src="../brain.jpg"
               />
               <Screen
                  title="Görsel Hafıza"
                  symbol=""
                  button="Başla"
                  onStatusChange={setIsOn}
               >
                  Yanıp sönen karelerin tamamını aklınızda tutun.
               </Screen>
            </Box>
         </Board>
      );
   }
}

export default VisualMemory;
