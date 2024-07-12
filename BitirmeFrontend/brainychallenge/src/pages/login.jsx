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
import { useRef, useState, useContext } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { LoginUtil } from "../components/loginUtil/LoginUtil";
import { useNavigate, Link } from "react-router-dom";
import { fetchLogin } from "../Request";
import { AuthContext } from "../utils/AuthContext";

function Login() {
   const [showPassword, setShowPassword] = useState(false);
   const emailRef = useRef(null);
   const passwordRef = useRef(null);
   const [error, setError] = useState("");
   const navigate = useNavigate();
   const { login } = useContext(AuthContext);

   const formBackground = useColorModeValue("white", "gray.700");

   async function handleSubmit(e) {
      e.preventDefault();

      setError("");

      const email = emailRef.current.value;
      const password = passwordRef.current.value;

      const payload = {
         email: email,
         password: password,
      };

      try {
         const response = await fetchLogin(payload);
         console.log(response);

         if (response.token) {
            // Başarılı giriş durumunda tokenı yerel depolamaya atıyorum
            login(response.token);
            console.log(response.token);
            navigate("/");
         } else {
            setError("Giriş Bilgileriniz Yanlış");
         }
      } catch (error) {
         // Fetch sırasında hata oluşursa genel hata mesajı
         setError("Bir hata oluştu, lütfen tekrar deneyin");
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
                  <Heading>Giriş Yap</Heading>
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
                           id="email"
                           isRequired
                        >
                           <FormLabel>E-posta Adresi</FormLabel>
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
                        <Button
                           colorScheme="blue"
                           type="submit"
                           w="full"
                        >
                           Giriş Yap
                        </Button>
                     </VStack>
                  </form>
                  <Text
                     align={"center"}
                     my={4}
                  >
                     Bir hesabın yok mu?{" "}
                     <ChakraLink
                        as={Link}
                        to="/signup"
                        color="blue.500"
                     >
                        Kayıt Ol
                     </ChakraLink>
                  </Text>
                  <LoginUtil />
               </Box>
            </VStack>
         </Flex>
      </Container>
   );
}

export default Login;
