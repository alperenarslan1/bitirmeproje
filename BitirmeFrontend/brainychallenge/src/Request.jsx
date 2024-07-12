const BASE_URL = "http://localhost:5001";

export const colors = {
   COLOR_PRIMARY: "#f96163",
   COLOR_LIGHT: "#fff",
   COLOR_DARK: "#000",
   COLOR_DARK_ALT: "#262626",
};

export const fetchLogin = async (payload) => {
   try {
      const response = await fetch(`${BASE_URL}/auth/login`, {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify(payload),
      });

      const data = await response.json();

      return data;
   } catch (error) {
      console.error("İstek başarısız");
      throw error;
   }
};

export const registerUser = async (userData) => {
   try {
      const response = await fetch(`${BASE_URL}/auth/register`, {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify(userData),
      });

      if (!response.ok) {
         const errorData = await response.json();
         throw new Error(errorData.message || "Kayıt işlemi başarısız oldu.");
      }

      const data = await response.json();
      return data;
   } catch (error) {
      console.error("Kullanıcı kaydedilemedi:", error);
      throw error;
   }
};

export const fetchUserProfile = async (userId) => {
   try {
      const response = await fetch(`${BASE_URL}/user/profile/${userId}`, {
         method: "GET",
         headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
         },
      });

      if (!response.ok) {
         const errorData = await response.json();
         throw new Error(errorData.error || "Kullanıcı bilgileri alınamadı.");
      }

      const userData = await response.json();
      return userData;
   } catch (error) {
      console.error("Kullanıcı bilgisi getirilemedi:", error);
      throw error;
   }
};

export const updateUserProfile = async (userId, payload) => {
   try {
      const response = await fetch(`${BASE_URL}/user/profile/${userId}`, {
         method: "PUT",
         headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
         },
         body: JSON.stringify(payload),
      });

      if (!response.ok) {
         const errorData = await response.json();
         throw new Error(errorData.message || "Kullanıcı profili güncellenemedi.");
      }

      const userData = await response.json();
      return userData;
   } catch (error) {
      console.error("Kullanıcı profili güncelleme hatası:", error);
      throw error;
   }
};

export const fetchUserScores = async (userId) => {
   try {
      const response = await fetch(`${BASE_URL}/scores/${userId}`, {
         method: "GET",
         headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
         },
      });

      if (!response.ok) {
         const errorData = await response.json();
         throw new Error(errorData.error || "Kullanıcı rekorları alınamadı.");
      }

      const userScores = await response.json();
      return userScores;
   } catch (error) {
      console.error("Kullanıcı bilgileri getirilemedi:", error);
      throw error;
   }
};

export const saveUserScore = async (game, score) => {
   try {
      const response = await fetch(`${BASE_URL}/scores/save`, {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
         },
         body: JSON.stringify({ game, score }),
      });

      if (!response.ok) {
         const errorData = await response.json();
         throw new Error(errorData.error || "Skor kaydedilemedi.");
      }

      const data = await response.json();
      return data;
   } catch (error) {
      console.error("Kullanıcı skoru kaydedilemedi:", error);
      throw error;
   }
};
