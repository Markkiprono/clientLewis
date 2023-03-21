import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [user, setUser] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setUser(user);

    if (!user) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <GlobalContext.Provider value={{ user, setUser }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const GlobalChatState = () => {
  return useContext(GlobalContext);
};
