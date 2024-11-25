import { Box, Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Toolbar, Button, Typography, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Divider } from "@mui/material";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { useEffect, useState } from "react";
import axios from "axios";

export default function UserDashboard({ user, setUser }) {
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(null);
	
  const [openRejectDialog, setOpenRejectDialog] = useState(false); 
  const [rejectionReason, setRejectionReason] = useState('');
  const [selectedRid, setSelectedRid] = useState(null); 


  const columns = ["PROPERTY TAG", "ITEM NAME", "MODEL", "SERIAL NUMBER", "STATUS", "QUANTITY", "TOTAL COST"];
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
      await axios.put(`http://${address}:8080/request/approve/${rid}`);
      setLoader(Math.random() * 1000);
    } catch(error) {
      console.error(error);
    }
  }

  const handleReject = async (rid) => {
    try {
      await axios.put(`http://${address}:8080/request/reject/${rid}`, {}, {
        params: {
          reason: rejectionReason
        }
      });
      setLoader(Math.random() * 1000);
      handleCloseRejectDialog();
    } catch(error) {
      console.log(rid);
      console.error(error);
    }
  }

  const handleReturn = async (rid) => {
    try {
      await axios.put(`http://${address}:8080/request/return/${rid}`);
      setLoader(Math.random() * 1000);
    } catch(error) {
      console.error(error);
    }
  }

  const handleOpenRejectDialog = (rid) => {
    setSelectedRid(rid); // Store the rid of the item being rejected
    setOpenRejectDialog(true); 
  };

  const handleCloseRejectDialog = () => {
    setOpenRejectDialog(false); 
    setRejectionReason(''); 
  };

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
                data.map((req) =>
                  req.itemStatus === 'DISPOSED' || req.itemStatus === 'ADD BACK' || req.deleted ? null : (
                    <TableRow
                      key={req.rid}
                      style={{
                        backgroundColor: 'white',
                        transition: 'background-color 0.3s ease',
                      }}
                    >
                      <TableCell>{req.itemId}</TableCell>
                      <TableCell>{req.itemName}</TableCell>
                      <TableCell>{req.itemModel}</TableCell>
                      <TableCell>{req.itemSerialNumber}</TableCell>
                      <TableCell>{req.itemStatus}</TableCell>
                      <TableCell>{req.itemQuantity} {req.itemUnitOfMeasurement}</TableCell>
                      <TableCell>₱{req.itemTotalCost.toLocaleString()}</TableCell>
                      <TableCell style={{ position: 'sticky', right: 0, backgroundColor: 'white', zIndex: 2 }}>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                          {req.itemStatus === 'WAITING' && req.status !== 'UNASSIGNED' && (
                            <>
                              <Button
                                onClick={() => handleApprove(req.rid)}
                                variant="contained"
                                color="success"
                                startIcon={<CheckCircleOutlineIcon />}
                                sx={{ width: '110px', mr: 1 }}
                              >
                                Approve
                              </Button>
                              <Button onClick={() => handleOpenRejectDialog(req.rid)} variant="contained" color="error" startIcon={<RemoveCircleOutlineIcon />}>
                                Reject
                              </Button>
                            </>
                          )}
                          {req.itemStatus === 'ASSIGNED' && req.itemConsumable !== true && req.status !== 'UNASSIGNED' && (
                            <Button onClick={() => handleReturn(req.rid)} variant="contained" color="primary" startIcon={<CheckCircleOutlineIcon />}>
                              Return
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                )
              )}
            </TableBody>
              </Table>
            </TableContainer>
          </Container>
        </Box>	
          {/* Reject Dialog */}
          <Dialog open={openRejectDialog} onClose={handleCloseRejectDialog} fullWidth maxWidth="sm">
      <DialogTitle>
      <Typography
              variant="h6"
              sx={{
                textAlign: "center",
                fontWeight: "bold",
                color: "black ",
                backgroundColor: "",
                paddingY: 1,
                marginBottom: 3,
              }}
            >
               Please State Your Reason for Rejection
            </Typography>
        <Divider sx={{ marginBottom: 2 }} />
      </DialogTitle>
      <DialogContent>
        <Box my={2}>
          <TextField
            autoFocus
            id="reason"
            label="Reason"
            type="text"
            fullWidth
            variant="outlined"
            value={rejectionReason}
            onChange={(e) => setRejectionReason(e.target.value)}
            multiline
            rows={4} 
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Box display="flex" justifyContent="space-between" width="100%" px={2} pb={2}>
          <Button 
          onClick={handleCloseRejectDialog} 
          variant="contained"
          sx={{
            marginRight: 2,
            backgroundColor: "#e0e0e0",
            color: "#fafafa",
            "&:hover": {
              backgroundColor: "#9e9e9e",
            },
          }}
          >
            Cancel
          </Button>
          <Button onClick={() => handleReject(selectedRid)} color="primary" variant="contained">
            Submit
          </Button>
        </Box>
      </DialogActions>
    </Dialog>

    </>
  );
}
