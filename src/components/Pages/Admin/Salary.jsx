import { Alert, CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";

const Salary = () => {
  const [salary, setSalary] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    const getSalary = async () => {
      setLoading(true);
      try {
        await axios.get("/api/salary").then((res) => {
          setSalary(res.data);
          setLoading(false);
        });
      } catch (err) {
        console.log(err);
        setError(true);
      }
    };
    getSalary();
  }, []);
  return (
    <>
      <h1>Salary</h1>

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
      {error && (
        <Alert severity="error">Error finding Salary. Please Reload</Alert>
      )}
      {salary.map((sal) => {
        return (
          <div>
            <div>{sal.salary}</div>
          </div>
        );
      })}
    </>
  );
};

export default Salary;
