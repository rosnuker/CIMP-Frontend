import { useEffect, useState } from "react";
import axios from "axios";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Toolbar, Container } from '@mui/material';

export default function Approved() {
  const [appr, setAppr] = useState([]);
  const columns = ["REQUEST ID", "PROPERTY TAG", "STATUS" ];
  const address = getIpAddress();

  function getIpAddress() {
      const hostname = window.location.hostname;
      const indexOfColon = hostname.indexOf(':');
      return indexOfColon !== -1 ? hostname.substring(0, indexOfColon) : hostname;
  }

  const fetchApproved = async () => {
    try {
      const response = await axios.get(`http://${address}:8080/request/getApproved`);
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
    <TableContainer component={Paper} style={{ maxHeight: '550px', overflowY: 'auto' }}>
      <Table>
      <TableHead>
        <TableRow style={{ position: 'sticky', top: 0, backgroundColor: '#eeeeee', zIndex: 1 }}>
          {columns.map((column) => (
            <TableCell
              key={column}
              style={{ padding: '10px', fontWeight: '600', color: 'black', backgroundColor: '#eeeeee' }}
            >
              {column}
            </TableCell>
          ))}
        </TableRow>
        </TableHead>
        <TableBody>
          {appr.map((item) => (
            <TableRow key={item.rid}> 
              <TableCell>{item.rid}</TableCell>
              <TableCell> {item.itemId} </TableCell>
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
