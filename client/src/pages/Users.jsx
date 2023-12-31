import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import {
  Box,
  Table,
  Typography,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const Users = () => {
  // get the token from AuthContext
  const { token } = useContext(AuthContext);

  const usersBackgroundImage = "/images/background-001.jpg";

  // define state to store the Users Data
  const [usersData, setUsersData] = useState(null);

  useEffect(() => {
    // fetch the Users Data from the backend
    const fetchAllUsers = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_SERVER_URL}/api/users/all`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status !== 200) {
          throw response;
        }
        // console.log("fetchAllUsers response:", response);
        const data = await response.json();
        // console.log("fetchAllUsers data:", data);
        // store the Users Data in state
        setUsersData(data);
      } catch (error) {
        console.error("fetchAllUsers error:", error);
      }
    };
    fetchAllUsers();
  }, []);

  return (
    <Box
      sx={{
        color: "white",
        minHeight: "70vh",
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${usersBackgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
        overflow: "hidden",
      }}
      p={3}>
      <Typography variant={"h3"} mb={1}>
        Users Page
      </Typography>
      {usersData && (
        <>
          <Typography variant={"h6"} mb={1}>
            users Table from the Database
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  {Object.keys(usersData[0]).map((column) => (
                    <TableCell key={column}>{column}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {usersData.map((user) => (
                  <TableRow key={user.google_id}>
                    {Object.keys(usersData[0]).map((column) => (
                      <TableCell key={column}>{user[column]}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </Box>
  );
};

export default Users;
