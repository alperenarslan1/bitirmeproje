import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../utils/AuthContext";
import {
   Box,
   Heading,
   VStack,
   Button,
   Table,
   Thead,
   Tbody,
   Tr,
   Th,
   Td,
   Container,
   Flex,
   Spacer,
   LinkBox,
   LinkOverlay,
} from "@chakra-ui/react";
import { fetchUserScores, fetchUserProfile } from "../Request";

function Dashboard() {
   const [userScores, setUserScores] = useState([]);
   const [username, setUsername] = useState("");
   const { user } = useContext(AuthContext);
   const games = [
      { title: "Reaksiyon Testi", slug: "reaction" },
      { title: "Renk Bilmecesi", slug: "colors" },
      { title: "Sıra Hafızası", slug: "sequence" },
      { title: "Hızlı Matematik", slug: "math" },
      { title: "Görsel Hafıza", slug: "visualMemory" },
   ];

   useEffect(() => {
      const fetchData = async () => {
         try {
            if (user) {
               const userData = await fetchUserProfile(user._id);
               if (userData) {
                  setUsername(userData.userName);
                  const scores = await fetchUserScores(user._id);
                  setUserScores(scores);
               }
            }
         } catch (error) {
            console.error("Error fetching user data:", error);
         }
      };

      fetchData();
   }, [user]);

   return (
      <Container
         maxW="container.xl"
         p={50}
      >
         <VStack
            spacing={8}
            align="stretch"
         >
            <Box
               bg="whiteAlpha.800"
               boxShadow="base"
               p={4}
               borderRadius="md"
               borderWidth="1px"
            >
               <Flex
                  direction={{ base: "column", md: "row" }}
                  align="center"
               >
                  <Box>
                     <Heading
                        color="gray.700"
                        size="md"
                     >
                        Kullanıcı Adı
                     </Heading>
                     <Heading
                        pt={2}
                        size="md"
                     >
                        {username ? username : "Misafir"}
                     </Heading>
                  </Box>
                  <Spacer />

                  {!user && (
                     <>
                        <Button
                           as={Link}
                           to={"/signup"}
                           colorScheme="blue"
                           size="md"
                        >
                           Kayıt Ol
                        </Button>
                        <Button
                           as={Link}
                           to={"/login"}
                           colorScheme="blue"
                           size="md"
                           ml={2}
                        >
                           Giriş Yap
                        </Button>
                     </>
                  )}
               </Flex>
            </Box>

            <Box
               bg="whiteAlpha.800"
               boxShadow="base"
               p={4}
               borderRadius="md"
               borderWidth="1px"
            >
               <Table variant="simple">
                  <Thead>
                     <Tr>
                        <Th>Oyun</Th>
                        <Th isNumeric>Skor</Th>
                        <Th>Oyna</Th>
                     </Tr>
                  </Thead>
                  <Tbody>
                     {games.map((game, index) => (
                        <Tr key={index}>
                           <Td>
                              <Heading size="md">{game.title}</Heading>
                           </Td>
                           <Td isNumeric>
                              <Heading
                                 m={2}
                                 size="md"
                              >
                                 {userScores[index] ? userScores[index].score : "?"}
                              </Heading>
                           </Td>
                           <Td>
                              <LinkBox>
                                 <Button colorScheme="blue">
                                    <LinkOverlay
                                       as={Link}
                                       to={`/games/${game.slug}`}
                                    >
                                       Oyna
                                    </LinkOverlay>
                                 </Button>
                              </LinkBox>
                           </Td>
                        </Tr>
                     ))}
                  </Tbody>
               </Table>
            </Box>
         </VStack>
      </Container>
   );
}

export default Dashboard;
