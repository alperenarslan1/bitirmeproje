import {
   Flex,
   Box,
   Container,
   FormControl,
   FormLabel,
   Input,
   InputGroup,
   InputRightElement,
   Button,
   Heading,
   Text,
   useColorModeValue,
   Alert,
   AlertIcon,
   VStack,
   Link as ChakraLink,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { LoginUtil } from "../components/loginUtil/LoginUtil";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../Request";

function Signup() {
   const [showPassword, setShowPassword] = useState(false);
   const usernameRef = useRef(null);
   const emailRef = useRef(null);
   const passwordRef = useRef(null);
   const passwordConfirmRef = useRef(null);
   const [error, setError] = useState("");
   const navigate = useNavigate();

   const formBackground = useColorModeValue("white", "gray.700");

   async function handleSubmit(e) {
      e.preventDefault();

      try {
         if (passwordRef.current?.value !== passwordConfirmRef.current?.value) {
            return setError("Parolalar eşleşmiyor.");
         }

         const userName = usernameRef.current.value;
         const email = emailRef.current.value;
         const password = passwordRef.current.value;

         const data = {
            userName,
            email,
            password,
         };

         const response = await registerUser(data);
         console.log(
            "%csrcComponentsRegister.jsx:94 Object",
            "color: #26bfa5;",
            response
         );
         return navigate("/");
      } catch (e) {
         console.log("kayit basarisiz");
      }
   }

   return (
      <Container
         maxW="lg"
         p={0}
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
                  <Heading>Kayıt Ol</Heading>
                  {error && (
                     <Alert
                        status="error"
                        borderRadius="md"
                        mt={4}
                     >
                        <AlertIcon />
                        {error}
                     </Alert>
                  )}
               </Box>
               <Box
                  py={4}
                  px={8}
                  w="full"
               >
                  <form onSubmit={handleSubmit}>
                     <VStack spacing={4}>
                        <FormControl
                           id="userName"
                           isRequired
                        >
                           <FormLabel>Kullanıcı Adı</FormLabel>
                           <Input
                              type="text"
                              ref={usernameRef}
                           />
                        </FormControl>
                        <FormControl
                           id="email"
                           isRequired
                        >
                           <FormLabel>E-posta</FormLabel>
                           <Input
                              type="email"
                              ref={emailRef}
                           />
                        </FormControl>
                        <FormControl
                           id="password"
                           isRequired
                        >
                           <FormLabel>Şifre</FormLabel>
                           <InputGroup>
                              <Input
                                 type={showPassword ? "text" : "password"}
                                 ref={passwordRef}
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
                        <FormControl
                           id="confirmPassword"
                           isRequired
                        >
                           <FormLabel>Şifreyi tekrar giriniz.</FormLabel>
                           <InputGroup>
                              <Input
                                 type={showPassword ? "text" : "password"}
                                 ref={passwordConfirmRef}
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
                        <Button
                           colorScheme="blue"
                           type="submit"
                           w="full"
                        >
                           Kayıt Ol
                        </Button>
                     </VStack>
                  </form>
                  <Text
                     align={"center"}
                     my={4}
                  >
                     Zaten bir hesabın var mı?{" "}
                     <ChakraLink
                        as={Link}
                        to="/login"
                        color="blue.500"
                     >
                        Giriş yap
                     </ChakraLink>
                  </Text>
                  <LoginUtil />
               </Box>
            </VStack>
         </Flex>
      </Container>
   );
}

export default Signup;
