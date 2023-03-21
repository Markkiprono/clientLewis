import {
  Alert,
  CircularProgress,
  Snackbar,
  FormControl,
  InputLabel,
  Input,
  Button,
} from "@mui/material";
import React, { useState } from "react";

import axios from "../../../api/axios";

const Alert1 = React.forwardRef(function Alert1(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const UpdateProfile = () => {
  const [me, setMe] = useState("");
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setloading] = useState(false);

  const newProfile = async (e) => {
    e.preventDefault();
    setloading(true);
    try {
      await axios.put("/api/users/employee", { me }).then((res) => {
        setMe(res.data);
        setloading(false);
        setOpen(true);
      });
    } catch (err) {
      console.log(err);
      setloading(false);
      setError(true);
    }
  };

  return (
    <>
      {error && <Alert severity="error">Error</Alert>}
      <div>UpdateProfile</div>
      <form onSubmit={newProfile}>
        <FormControl sx={{ m: 1 }} variant="standard" fullWidth>
          <InputLabel htmlFor="standard-adornment-username">
            Full Name
          </InputLabel>
          <Input
            required
            id="standard-adornment-username"
            value={me}
            onChange={(e) => setMe(e.target.value)}
          />
        </FormControl>
        <Button
          type="submit"
          style={{
            background: "black",
            color: "white",
            position: "relative",
            top: 20,
            borderRadius: 7,
          }}
          fullWidth
        >
          update
        </Button>
      </form>
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
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert1 onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Updated Successfully
        </Alert1>
      </Snackbar>
    </>
  );
};

export default UpdateProfile;
