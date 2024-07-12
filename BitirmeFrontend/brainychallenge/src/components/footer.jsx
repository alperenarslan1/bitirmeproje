import {
   Box,
   Container,
   Text,
   IconButton,
   VStack,
   HStack,
   Link,
   useColorModeValue,
} from "@chakra-ui/react";
import { FaInstagram, FaTwitter, FaGithub, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
   const color = useColorModeValue("gray.600", "gray.100");
   const hoverBg = useColorModeValue("gray.200", "gray.600"); // Hover için arka plan rengi
   const hoverIconColor = useColorModeValue("blue.600", "blue.200"); // Hover sırasında ikon rengi

   return (
      <Box
         bg="#EEEEEE"
         color={color}
         py="12"
         mt="12"
         boxShadow="0px 4px 10px rgba(0, 0, 0, 0.1)"
         borderTop="1px"
         borderColor="gray.200"
      >
         <Container maxW="container.xl">
            <VStack spacing="5">
               <Text
                  fontSize="lg"
                  fontWeight="bold"
               >
                  Brainy Challenge © 2024
               </Text>
               <HStack spacing="5">
                  {[
                     {
                        icon: FaInstagram,
                        label: "Instagram",
                        href: "https://www.instagram.com",
                     },
                     {
                        icon: FaTwitter,
                        label: "Twitter",
                        href: "https://www.twitter.com",
                     },
                     {
                        icon: FaGithub,
                        label: "GitHub",
                        href: "https://www.github.com",
                     },
                     {
                        icon: FaLinkedinIn,
                        label: "LinkedIn",
                        href: "https://www.linkedin.com",
                     },
                  ].map((social, index) => (
                     <IconButton
                        key={index}
                        as={Link}
                        isExternal
                        href={social.href}
                        aria-label={social.label}
                        icon={<social.icon fontSize="20px" />}
                        variant="outline"
                        _hover={{
                           bg: hoverBg,
                           color: hoverIconColor,
                           transform: "scale(1.1)",
                        }}
                        transition="all 0.2s ease-in-out" // Pürüzsüz geçiş efekti
                     />
                  ))}
               </HStack>
               <HStack
                  spacing="4"
                  wrap="wrap"
                  justifyContent="center"
               >
                  <Link
                     href="#"
                     _hover={{ textDecoration: "underline" }}
                  >
                     Kullanım Şartları
                  </Link>
                  <Link
                     href="#"
                     _hover={{ textDecoration: "underline" }}
                  >
                     Gizlilik Politikası
                  </Link>
                  <Link
                     href="#"
                     _hover={{ textDecoration: "underline" }}
                  >
                     Destek
                  </Link>
                  <Link
                     href="#"
                     _hover={{ textDecoration: "underline" }}
                  >
                     Hakkımızda
                  </Link>
               </HStack>
            </VStack>
         </Container>
      </Box>
   );
};

export default Footer;
