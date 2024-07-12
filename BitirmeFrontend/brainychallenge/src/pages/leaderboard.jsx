import { useState, useEffect } from "react";
import {
   Container,
   Heading,
   VStack,
   Table,
   Thead,
   Tbody,
   Tr,
   Th,
   Td,
   Select,
   Center,
   Flex,
   Text,
   Button,
   Box,
} from "@chakra-ui/react";
import axios from "axios";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

function LeaderBoard() {
   const [selectedGame, setSelectedGame] = useState("reaction");
   const [scores, setScores] = useState([]);
   const [currentPage, setCurrentPage] = useState(1);
   const [totalPages, setTotalPages] = useState(1);
   const games = [
      { title: "Reaksiyon Testi", slug: "reaction" },
      { title: "Renk Bilmecesi", slug: "stroop" },
      { title: "Sıra Hafızası", slug: "sequence" },
      { title: "Hızlı Matematik", slug: "math" },
      { title: "Görsel Hafıza", slug: "visualMemory" },
   ];

   useEffect(() => {
      const fetchScores = async () => {
         try {
            const response = await axios.get(
               `http://localhost:5001/scores/leaderboard/${selectedGame}?page=${currentPage}`
            );
            setScores(response.data.scores || []);
            setTotalPages(response.data.totalPages || 1);
         } catch (error) {
            console.error("Error fetching scores:", error);
         }
      };

      fetchScores();
   }, [selectedGame, currentPage]);

   const handlePrevPage = () => {
      setCurrentPage((prev) => Math.max(prev - 1, 1));
   };

   const handleNextPage = () => {
      setCurrentPage((prev) => Math.min(prev + 1, totalPages));
   };

   const handleGameChange = (e) => {
      setSelectedGame(e.target.value);
      setCurrentPage(1); // Yeni oyun seçildiğinde sayfa numarasını sıfırla
   };

   return (
      <Container
         maxW="container.xl"
         p={5}
         mt={16}
      >
         <VStack
            spacing={5}
            align="stretch"
         >
            <Center>
               <Heading size="lg">Liderlik Tablosu</Heading>
            </Center>
            <Select
               placeholder="Oyun Seçin"
               value={selectedGame}
               onChange={handleGameChange}
               bg="white"
               boxShadow="base"
               borderRadius="md"
               borderWidth="1px"
               fontWeight="seim"
            >
               {games.map((game) => (
                  <option
                     key={game.slug}
                     value={game.slug}
                  >
                     {game.title}
                  </option>
               ))}
            </Select>
            <Box
               bg="whiteAlpha.800"
               boxShadow="base"
               p={4}
               borderRadius="md"
               borderWidth="1px"
            >
               <Table variant="simple">
                  <Thead fontWeight="bold">
                     <Tr>
                        <Th>#</Th>
                        <Th color="gray.900">Kullanıcı Adı</Th>
                        <Th
                           isNumeric
                           color="gray.900"
                        >
                           Skor
                        </Th>
                     </Tr>
                  </Thead>
                  <Tbody>
                     {scores.map((score, index) => (
                        <Tr key={index}>
                           <Td>{index + 1}</Td>
                           <Td>{score.user.userName}</Td>
                           <Td isNumeric>
                              {selectedGame === "reaction"
                                 ? `${score.score} ms`
                                 : score.score}
                           </Td>
                        </Tr>
                     ))}
                  </Tbody>
               </Table>
            </Box>
         </VStack>
         <Flex
            justifyContent="space-between"
            alignItems="center"
            mt={4}
         >
            <Button
               leftIcon={<ChevronLeftIcon />}
               onClick={handlePrevPage}
               disabled={currentPage === 1}
               colorScheme="blue"
               boxShadow="base"
            >
               Önceki
            </Button>
            <Text fontWeight="semibold">
               Sayfa {currentPage}/{totalPages}
            </Text>
            <Button
               rightIcon={<ChevronRightIcon />}
               onClick={handleNextPage}
               disabled={currentPage === totalPages}
               colorScheme="blue"
               boxShadow="base"
            >
               Sonraki
            </Button>
         </Flex>
      </Container>
   );
}

export default LeaderBoard;
