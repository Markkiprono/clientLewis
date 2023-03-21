import { useAuthContext } from "./useAuthContext";

import { useNavigate } from "react-router-dom";
export const useLogout = () => {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const { dispatch } = useAuthContext();
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const logout = async () => {
    setLoading(true);
    try {
      await axios.post("/api/users/logout", { email, password }).then((res) => {
        localStorage.removeItem("user");
        dispatch({ type: "LOGOUT" });
        setLoading(false);
        setOpen(true);

        setTimeout(() => {
          navigate("/login");
        }, 2000);
      });
    } catch (err) {
      if (err.code === "ERR_NETWORK") {
        setErrorMessage(err.message);
      }
      console.log(err);
      setError(true);
      setLoading(false);
      setErrorMessage(err.response.data);
    }
  };
  return { logout, error, errorMessage, loading, open };
};
