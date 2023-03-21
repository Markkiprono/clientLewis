import { Alert, CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "../../../api/axios";

const Attendance = () => {
  const [attendance, setAttendance] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    try {
      axios.get("/api/attendance").then((res) => {
        setAttendance(res.data);
        setMe(res.data);
        setloading(false);
      });
    } catch (err) {
      console.log(err);
      setloading(false);
      setError(true);
    }
  }, []);

  return (
    <>
      <div>Attendances</div>
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
      {attendance.map((item) => {
        return (
          <div>
            <h1>{item._id}</h1>
          </div>
        );
      })}
    </>
  );
};

export default Attendance;
