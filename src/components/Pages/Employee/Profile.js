import {
  Alert,
  AppBar,
  Button,
  CircularProgress,
  Toolbar,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import axios from "../../../api/axios";
import { useLogout } from "../../../hooks/useLogout";
import CheckIN from "./CheckIN";
import { Link } from "react-router-dom";

const Profile = () => {
  const [me, setMe] = useState({});
  const { logout } = useLogout();
  const [error, setError] = useState(false);
  const [loading, setloading] = useState(false);
  const [access, setAccess] = useState(true);
  useEffect(() => {
    const getMe = async () => {
      setloading(true);
      try {
        await axios.get("/api/users/employee").then((res) => {
          setMe(res.data);
          setloading(false);
        });
      } catch (err) {
        console.log(err);
        setloading(false);
        setError(true);
      }
    };
    getMe();
  }, []);

  if (me.role === "employee") {
    setAccess(false);
  }

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Button onClick={logout()}>Log Out</Button>
          <Box sx={{ flexGrow: 1 }} />

          <Button component={Link} disable={access} to="/admin">
            Admin
          </Button>
        </Toolbar>
      </AppBar>
      <div>Profile</div>
      {loading && (
        <div
          style={{
            marginTop: 20,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress style={{ color: "black", marginTop: 10 }} />
        </div>
      )}
      {error && <Alert severity="error">Error finding Profile</Alert>}
      {me && <div>{me.name}</div>}
      <Button component={Link} to="/Profile/update">
        Change Profile
      </Button>
      <CheckIN />
    </>
  );
};

export default Profile;
