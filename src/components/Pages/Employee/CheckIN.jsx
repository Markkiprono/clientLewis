import React, { useState } from "react";
import axios from "../../../api/axios";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Alert from "@mui/material/Alert";
import { Button } from "@mui/material";

const Alert1 = React.forwardRef(function Alert1(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const CheckIN = () => {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState();

  const CheckInSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("/api/attendance").then((res) => {
        setLoading(false);
        setOpen(true);
      });
    } catch (err) {
      console.log(err);
      setLoading(false);
      setError(true);
    }
  };
  const checkOutSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("/api/attendance").then((res) => {
        setLoading(false);
        setOpen(true);
      });
    } catch (err) {
      console.log(err);
      setLoading(false);
      setError(true);
    }
  };
  return (
    <>
      {error && <Alert severity="error">Error</Alert>}

      <Button
        style={{
          background: "black",
          color: "white",
          position: "relative",
          top: 20,
          borderRadius: 7,
        }}
        onClick={CheckInSubmit}
      >
        Check In
      </Button>
      <Button
        style={{
          background: "black",
          color: "white",
          position: "relative",
          top: 20,
          borderRadius: 7,
        }}
        onClick={checkOutSubmit}
      >
        Check Out
      </Button>
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
          Success
        </Alert1>
      </Snackbar>
    </>
  );
};

export default CheckIN;
