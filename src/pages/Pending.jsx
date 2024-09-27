import { useEffect, useState } from "react";
import axios from "axios";
import { Table, TableBody, TableCell, TableContainer, Container, TableHead, TableRow, Paper, Typography, Button, Box, Toolbar } from '@mui/material';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';

export default function Pending() {
  const [pends, setPends] = useState([]);
const columns = ["REQUEST ID", "DATE REQUESTED", "STATUS", "ITEM ID" ];
  const fetchPending = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/request/getPending`);
      setPends(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching options:", error);
    }
  };

  useEffect(() => {
    fetchPending();
  }, []);

  const handleApproving = async (rid) => {
    try {
      await axios.put(`http://localhost:8080/request/update`, null, {
        params: {
          rid: rid,
          status: 'approved'
        }
      });
      fetchPending(); // Refresh the list after approval
    } catch (error) {
      console.log(error);
      alert("No Data Found!");
    }
  };

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
          {pends.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} align="center">
                <Typography variant="body1" color="textSecondary">
                  No pending requests available.
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            pends.map((pend) => (
              <TableRow key={pend.rid}>
                <TableCell>{pend.rid}</TableCell>
                <TableCell>
                  {pend.item ? (
                    <div>
                      <p>{pend.item.iid}</p>
                    </div>
                  ) : (
                    <div>None</div>
                  )}
                </TableCell>
                <TableCell>
                {pend.status === 'pending' ? (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '5px 10px',
                    border: '2px solid orange',
                    borderRadius: '50px',
                    color: 'orange',
                    width: '100px', 
                    height: '30px',
                    textAlign: 'center',
                  }}
                > < HourglassBottomIcon /> Pending
                </div>
              ) : (
                <div>{pend.status}</div>
              )}    
              </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleApproving(pend.rid)}
                    disabled={pend.status !== 'pending'}
                    style={{ 
                      backgroundColor: 'green', 
                      color: 'white' }}
                  >
                    Approve
                      </Button>
                    </TableCell>
                  </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </Box>
    </>
  );
}
