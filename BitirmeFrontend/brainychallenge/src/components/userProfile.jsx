import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchUserProfile, updateUserProfile } from "../Request";
import {
   Container,
   Flex,
   VStack,
   Box,
   FormControl,
   FormLabel,
   Input,
   InputGroup,
   InputRightElement,
   Button,
   Heading,
   useColorModeValue,
   Alert,
   AlertIcon,
   Spinner,
   Center,
   FormHelperText,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

const UserProfile = () => {
   const { userId } = useParams();
   const [userData, setUserData] = useState(null);
   const [newUsername, setNewUsername] = useState("");
   const [newEmail, setNewEmail] = useState("");
   const [newPassword, setNewPassword] = useState("");
   const [oldPassword, setOldPassword] = useState("");
   const [loading, setLoading] = useState(false);
   const [showPassword, setShowPassword] = useState(false);
   const [message, setMessage] = useState({ type: "", content: "" });
   const formBackground = useColorModeValue("white", "gray.700");

   useEffect(() => {
      const getUserData = async () => {
         try {
            if (!userId) {
               return;
            }
            const userData = await fetchUserProfile(userId);
            setUserData(userData);
            setNewUsername(userData.userName);
            setNewEmail(userData.email);
         } catch (error) {
            console.error("Error fetching user profile:", error);
         }
      };

      getUserData();
   }, [userId]);

   const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      try {
         const payload = {
            newUsername,
            newEmail,
            oldPassword,
            newPassword,
         };
         await updateUserProfile(userId, payload);
         setLoading(false);
         setOldPassword("");
         setNewPassword("");

         setMessage({ type: "success", content: "Profiliniz başarıyla güncellendi." });
         setTimeout(() => {
            setMessage({ type: "", content: "" });
         }, 2000);
      } catch (error) {
         setMessage({ type: "error", content: "Mevcut şifrenizi yanlış girdiniz." });
         setLoading(false);
         setTimeout(() => {
            setMessage({ type: "", content: "" });
         }, 2000);
      }
   };

   return (
      <Container
         maxW="lg"
         centerContent
      >
         <Flex
            direction="column"
            background={formBackground}
            p={{ base: 4, md: 8 }}
            rounded={12}
            boxShadow="lg"
            w="full"
            mt={10}
         >
            <VStack
               spacing={4}
               align="stretch"
               w="full"
            >
               <Box textAlign="center">
                  <Heading>Profil Düzenleme</Heading>
                  {message.type === "error" && (
                     <Alert
                        status="error"
                        borderRadius="md"
                        mt={4}
                     >
                        <AlertIcon />
                        {message.content}
                     </Alert>
                  )}

                  {message.type === "success" && (
                     <Alert
                        status="success"
                        borderRadius="md"
                        mt={4}
                     >
                        <AlertIcon />
                        {message.content}
                     </Alert>
                  )}
               </Box>
               <Box
                  py={4}
                  px={8}
                  w="full"
               >
                  {userData ? (
                     <form onSubmit={handleSubmit}>
                        <VStack spacing={4}>
                           <FormControl id="username">
                              <FormLabel>Kullanıcı Adı</FormLabel>
                              <Input
                                 type="text"
                                 value={newUsername}
                                 onChange={(e) => setNewUsername(e.target.value)}
                              />
                           </FormControl>
                           <FormControl id="email">
                              <FormLabel>E-posta</FormLabel>
                              <Input
                                 type="email"
                                 value={newEmail}
                                 onChange={(e) => setNewEmail(e.target.value)}
                              />
                           </FormControl>
                           <FormControl id="oldPassword">
                              {/* Eski şifre için */}
                              <FormLabel>Eski Şifre</FormLabel>
                              <InputGroup>
                                 <Input
                                    type={showPassword ? "text" : "password"}
                                    value={oldPassword}
                                    onChange={(e) => setOldPassword(e.target.value)}
                                 />
                                 <InputRightElement>
                                    <Button
                                       variant="ghost"
                                       onClick={() => setShowPassword(!showPassword)}
                                    >
                                       {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                                    </Button>
                                 </InputRightElement>
                              </InputGroup>
                           </FormControl>
                           <FormControl id="password">
                              <FormLabel>Yeni Şifre</FormLabel>
                              <InputGroup>
                                 <Input
                                    type={showPassword ? "text" : "password"}
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                 />
                                 <InputRightElement>
                                    <Button
                                       variant="ghost"
                                       onClick={() => setShowPassword(!showPassword)}
                                    >
                                       {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                                    </Button>
                                 </InputRightElement>
                              </InputGroup>
                              <FormHelperText>
                                 Şifreyi değiştirmek istemiyorsanız boş bırakın.
                              </FormHelperText>
                           </FormControl>
                           <Button
                              mt={3}
                              colorScheme="blue"
                              type="submit"
                              w="full"
                              isLoading={loading}
                           >
                              Değişiklikleri Kaydet
                           </Button>
                        </VStack>
                     </form>
                  ) : (
                     <Center>
                        <Spinner />
                     </Center>
                  )}
               </Box>
            </VStack>
         </Flex>
      </Container>
   );
};

export default UserProfile;
