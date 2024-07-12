import { useContext } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
   Container,
   Box,
   Link,
   Stack,
   Heading,
   Flex,
   Menu,
   MenuList,
   MenuItem,
   MenuButton,
   IconButton,
   Image,
   Center,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { AuthContext } from "../utils/AuthContext";
/* eslint-disable react/prop-types */

const LinkItem = ({ to, path, children }) => {
   const active = path === to;
   return (
      <RouterLink to={to}>
         <Box
            p={3}
            m={0}
            bg={active ? "#eeeeee" : undefined}
            fontWeight="bold"
            _hover={{ bg: "#eeeeee" }}
         >
            {children}
         </Box>
      </RouterLink>
   );
};

function Navbar({ path }) {
   const { user } = useContext(AuthContext);

   return (
      <Box
         position="fixed"
         h="68px"
         as="nav"
         w="100%"
         bg="#ffffff"
         zIndex={2}
         boxShadow="md"
      >
         <Container
            display="flex"
            maxW="container.xl"
            flexWrap="wrap"
            textAlign="center"
            alignItems="center"
            justifyContent="space-between"
         >
            <Flex _hover={{ bg: "#eee" }}>
               <LinkItem
                  to="/"
                  path={path}
               >
                  <Center>
                     <Image
                        src="/logom2.png"
                        alt="BrainyChallenge Logo"
                        h="45px"
                     />
                     <Heading
                        size="md"
                        color="#000"
                     >
                        BrainyChallenge
                     </Heading>
                  </Center>
               </LinkItem>
            </Flex>

            <Flex
               flexGrow={1}
               justifyContent="flex-end"
            >
               <Stack
                  direction={{ base: "column", md: "row" }}
                  display={{ base: "none", md: "flex" }}
                  width={{ base: "full", md: "auto" }}
                  alignItems="center"
                  mt={{ base: 4, md: 0 }}
               >
                  <LinkItem
                     to="/scores/leaderboard/reaction"
                     path={path}
                  >
                     LIDERLIK TABLOSU
                  </LinkItem>

                  <LinkItem
                     to="/dashboard"
                     path={path}
                  >
                     REKORLARIM
                  </LinkItem>

                  {user ? (
                     <>
                        <LinkItem
                           to={`user/profile/${user?._id}`}
                           path={path}
                        >
                           PROFİLİM
                        </LinkItem>
                        <LinkItem
                           to="/logout"
                           path={path}
                        >
                           ÇIKIŞ YAP
                        </LinkItem>
                     </>
                  ) : (
                     <>
                        <LinkItem
                           to="/signup"
                           path={path}
                        >
                           KAYIT OL
                        </LinkItem>
                        <LinkItem
                           to="/login"
                           path={path}
                        >
                           GİRİŞ YAP
                        </LinkItem>
                     </>
                  )}
               </Stack>
            </Flex>

            <Box
               flex={0}
               alignContent="right"
            >
               <Box
                  ml={2}
                  display={{ base: "inline-block", md: "none" }}
               >
                  <Menu>
                     <MenuButton
                        as={IconButton}
                        icon={<HamburgerIcon color="black" />}
                        colorScheme="black"
                        bgColor="#eeeeee"
                        variant="outline"
                        aria-label="Options"
                     />
                     <MenuList bg="#fff">
                        <MenuItem
                           as={Link}
                           _hover={{ bg: "#eeeeee" }}
                        >
                           <RouterLink to="/">Ana Sayfa</RouterLink>
                        </MenuItem>
                        <MenuItem
                           as={Link}
                           _hover={{ bg: "#eeeeee" }}
                        >
                           <RouterLink to="/dashboard">Rekorlarım</RouterLink>
                        </MenuItem>
                        <MenuItem
                           as={Link}
                           _hover={{ bg: "#eeeeee" }}
                        >
                           <RouterLink to="/scores/leaderboard/reaction">
                              Liderlik Tablosu
                           </RouterLink>
                        </MenuItem>
                        {user ? (
                           <>
                              <MenuItem
                                 as={Link}
                                 _hover={{ bg: "#eeeeee" }}
                              >
                                 <RouterLink to={`user/profile/${user?._id}`}>
                                    Profilim
                                 </RouterLink>
                              </MenuItem>
                              <MenuItem
                                 as={Link}
                                 _hover={{ bg: "#eeeeee" }}
                              >
                                 <RouterLink to="/logout">Çıkış Yap</RouterLink>
                              </MenuItem>
                           </>
                        ) : (
                           <>
                              <MenuItem
                                 as={Link}
                                 _hover={{ bg: "#eeeeee" }}
                              >
                                 <RouterLink to="/login">Giriş Yap</RouterLink>
                              </MenuItem>
                              <MenuItem
                                 as={Link}
                                 _hover={{ bg: "#eeeeee" }}
                              >
                                 <RouterLink to="/signup">Kayıt Ol</RouterLink>
                              </MenuItem>
                           </>
                        )}
                     </MenuList>
                  </Menu>
               </Box>
            </Box>
         </Container>
      </Box>
   );
}

export default Navbar;
