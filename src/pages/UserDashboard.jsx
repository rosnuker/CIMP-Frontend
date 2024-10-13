import { Box, Container, Grid, IconButton, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Toolbar, Button, Typography } from "@mui/material";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { useEffect, useState } from "react";
import axios from "axios";

export default function UserDashboard({ user, setUser }) {
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(null);
	
  const columns = ["PROPERTY TAG", "NAME", "INVOICE NUMBER", "INVOICE DATE", "ISSUE ORDER NUMBER", "QUANTITY", "REMARKS", "SUPPLIER", "TOTAL COST", "UNIT COST", "LIFESPAN", "STATUS"];
  const address = getIpAddress();
	
	function getIpAddress() {
		const hostname = window.location.hostname;

		const indexOfColon = hostname.indexOf(':');

		if(indexOfColon !== -1) {
			return hostname.substring(0, indexOfColon);
		}

		return hostname;
	}

  useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(
					`http://${address}:8080/request/user/${user.uid}`
				);
				setData(response.data);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		fetchData();
	}, [loader]);

  const handleApprove = async (rid) => {
    try {
      await axios.put(`http://${address}:8080/request/update`, {}, {
        params: {
          rid: rid,
          status: 'approved'
        }
      });
      setLoader(Math.random() * 1000);
    } catch(error) {
      console.error(error);
    }
  }

  const handleReject = async (rid) => {
    try {
      await axios.put(`http://${address}:8080/request/update`, {}, {
        params: {
          rid: rid,
          status: 'rejected'
        }
      });
      setLoader(Math.random() * 1000);
    } catch(error) {
      console.error(error);
    }
  }

  const handleReturn = async (rid) => {
    try {
      await axios.put(`http://${address}:8080/request/update`, {}, {
        params: {
          rid: rid,
          status: 'pending return'
        }
      });
      setLoader(Math.random() * 1000);
    } catch(error) {
      console.error(error);
    }
  }

  return(
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
          <Container maxWidth="lg" sx={{ mt: 10, mb: 4 }}>
            <TableContainer component={Paper} style={{ maxHeight: '530px', marginLeft: '1px', marginRight: '1px', marginTop: '20px' }}>
              <Table size="small" stickyHeader aria-label="customized table">
                <TableHead>
                  <TableRow style={{ position: 'sticky', top: 0, backgroundColor: '#eeeeee', zIndex: 1 }}>
                    {columns.map((column) => (
                      <TableCell
                        key={column}
                        style={{ padding: '10px', fontWeight: '600', color: 'black', backgroundColor: '#eeeeee', textAlign: 'center' }}
                      >
                        {column}
                      </TableCell>
                    ))}
                    <TableCell
                      style={{ padding: '10px', fontWeight: '600', color: 'black', width: '150px', backgroundColor: '#eeeeee', textAlign: 'center', position: 'sticky', right: 0, zIndex: 2 }}
                    >
                      ACTIONS
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                {data.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={columns.length + 1} style={{ textAlign: 'center', padding: '20px' }}>
                    <Typography variant="body1">There are no item(s) to show</Typography>
                  </TableCell>
                </TableRow>
              ) : (
                data.map((req) => (
                  !req.item.deleted && (req.item.status === "WAITING" || req.item.status === "ASSIGNED") && (
                    <TableRow
                      key={req.rid}
                      style={{
                        backgroundColor: 'white',
                        transition: 'background-color 0.3s ease',
                      }}
                    >
                      <TableCell>{req.item.iid}</TableCell>
                      <TableCell>{req.item.description.name}</TableCell>
                      <TableCell>{req.item.invoiceNumber}</TableCell>
                      <TableCell>{req.item.invoiceDate}</TableCell>
                      <TableCell>{req.item.issueOrder}</TableCell>
                      <TableCell>{req.item.quantity} {req.item.unitOfMeasurement}</TableCell>
                      <TableCell>{req.item.remarks}</TableCell>
                      <TableCell>{req.item.supplier}</TableCell>
                      <TableCell>₱{req.item.totalCost.toLocaleString()}</TableCell>
                      <TableCell>₱{req.item.unitCost.toLocaleString()}</TableCell>
                      <TableCell>{req.item.lifespan}</TableCell>
                      <TableCell>{req.item.status}</TableCell>
                      <TableCell style={{ position: 'sticky', right: 0, backgroundColor: 'white', zIndex: 2 }}>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                          {req.item.status === "WAITING" && (
                            <>
                                <Button onClick={() => handleApprove(req.rid)} variant="contained" color="success" startIcon={<CheckCircleOutlineIcon />} sx={{ width: '110px', mr: 1 }}>
                                    Approve
                                </Button>
                                <Button variant="contained" color="error" startIcon={<RemoveCircleOutlineIcon />}>
                                    Reject
                                </Button>
                            </>
                        )}
                        {req.item.status === "ASSIGNED" && (
                            <Button onClick={() => handleReturn(req.rid)} variant="contained" color="primary" startIcon={<CheckCircleOutlineIcon />}>
                                Return
                            </Button>
                        )}
                        </div>
                      </TableCell>
                    </TableRow>
                  )
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
