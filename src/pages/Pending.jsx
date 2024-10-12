import { useEffect, useState } from "react";
import axios from "axios";
import { Table, TableBody, TableCell, TableContainer, Container, TableHead, TableRow, Paper, Typography, Button, Box, Toolbar } from '@mui/material';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';

export default function Pending() {
  const [pends, setPends] = useState([]);
  const [loader, setLoader] = useState(null);

  const columns = ["REQUEST ID", "ITEM NAME", "ACCOUNTABLE PERSON", "DATE REQUESTED", "STATUS", "ACTIONS" ];

  const address = getIpAddress();
	
	function getIpAddress() {
		const hostname = window.location.hostname;

		const indexOfColon = hostname.indexOf(':');

		if(indexOfColon !== -1) {
			return hostname.substring(0, indexOfColon);
		}

		return hostname;
	}

  const fetchReturn = async (status) => {
    try {
      const response = await axios.get(`http://${address}:8080/request/byItemStatus`, {
        params: { status }
      });
      setPends(response.data);
    } catch (error) {
      console.error("Error fetching options:", error);
    }
  };

  useEffect(() => {
    fetchReturn('TO BE RETURNED');
  }, [loader]);

  const handleApproving = async (rid) => {
    try {
      await axios.put(`http://localhost:8080/request/update`, {}, {
        params: {
          rid: rid,
          status: 'approved return'
        }
      });
      setLoader(Math.random() * 1000);
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
                <TableCell> {pend.rid} </TableCell>
                <TableCell> {pend.item.description.name} </TableCell>
                <TableCell> {pend.item.accPerson.fname + " " + pend.item.accPerson.lname} </TableCell>
                <TableCell> {pend.item.invoiceDate} </TableCell>
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
                    // disabled={pend.status !== 'pending'}
                    style={{ 
                      backgroundColor: 'green', 
                      color: 'white' }}
                  >
                    Accept
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
