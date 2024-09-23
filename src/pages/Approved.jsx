import { useEffect, useState } from "react";
import axios from "axios";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Toolbar, Container } from '@mui/material';

export default function Approved() {
  const [appr, setAppr] = useState([]);

  const fetchApproved = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/request/getApproved`);
      setAppr(response.data); 
      console.log(response.data); // Log the response data directly
    } catch (error) {
      console.error("Error fetching options:", error);
    }
  };

  useEffect(() => {
    fetchApproved();
  }, []);

  return (
    <>
    <Box
    component="main"
    sx={{
      backgroundColor: (theme) =>
        theme.palette.mode === 'light'
          ? theme.palette.grey[100]
          : theme.palette.grey[900],
      flexGrow: 1,
      height: '100vh',
      overflow: 'auto',
    }}
  >
    <Toolbar />
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4, }}>
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Request ID</TableCell>
            <TableCell>Property Tag</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {appr.map((item) => (
            <TableRow key={item.rid}> 
              <TableCell>{item.rid}</TableCell>
              <TableCell>
                {item.item ? (
                  <div>
                    <p>{item.item.iid}</p>
                  </div>
                ) : (
                  <div>None</div>
                )}
              </TableCell>
              <TableCell>{item.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Container>
</Box>
    </>
  );
}
