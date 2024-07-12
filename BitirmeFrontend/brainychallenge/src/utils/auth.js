import { jwtVerify } from "jose";

const SECRET_KEY =
   "eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTcxNjU1MjMyMywiaWF0IjoxNzE2NTUyMzIzfQ.8CD63jjD9_tX-0CtQ8bapI8u3AXkv7jzKriHe";
export const getUserFromToken = async () => {
   const token = localStorage.getItem("token");
   const secretKey = new TextEncoder().encode(SECRET_KEY);

   if (token) {
      try {
         const { payload } = await jwtVerify(token, secretKey);
         return payload;
      } catch (error) {
         console.error("Geçersiz token:", error);
         return null;
      }
   }
   return null;
};
