import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Button } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";

const LoginLogoutButton = () => {
  const { user, login, logout } = useContext(AuthContext);

  return (
    <>
      {user ? (
        <Button
          variant="contained"
          startIcon={<LogoutIcon />}
          onClick={() => logout()}>
          Logout
        </Button>
      ) : (
        <Button
          variant="contained"
          startIcon={<LoginIcon />}
          onClick={() => login()}>
          Login
        </Button>
      )}
    </>
  );
};

export default LoginLogoutButton;
