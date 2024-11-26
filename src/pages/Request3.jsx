import { useEffect, useState } from "react";
import axios from "axios";
import { 
  Table, TableBody, TableCell, TableContainer, 
  Container, TableHead, TableRow, Paper, 
  Typography, Button, Box, Toolbar, Tabs, Tab, 
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  TextField
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useSnackbar } from "../components/SnackbarContext";

export default function Request3({ user, setUser }) {
  const [data, setData] = useState([]);
  const [fullNames, setFullNames] = useState({});
  const [loader, setLoader] = useState(null);
  const [currentTab, setCurrentTab] = useState(0);
  const [counts, setCounts] = useState({});
  const [dialogOpen, setDialogOpen] = useState(false);
  const [reason, setReason] = useState("");
  const [open, setOpen] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const [available, setAvailable] = useState(0);
  const showSnackbar = useSnackbar();

  const [itemDetails, setItemDetails] = useState({
    rid: '',
    itemAccPerId: '',
    itemId: '',
    itemName: '',
  });

  const columns = ["REQUEST ID", "ITEM ID", "NAME", "ACCOUNTABLE PERSON", "STATUS", "ACTIONS"];
  const statuses = ["TO BE RETURNED", "RETURNED", "REJECTED", "DISPOSED"];
  const address = getIpAddress();

  function getIpAddress() {
    const hostname = window.location.hostname;
    const indexOfColon = hostname.indexOf(':');
    return indexOfColon !== -1 ? hostname.substring(0, indexOfColon) : hostname;
  }

  const fetchFullName = async (uid) => {
    try {
      const response = await fetch(`http://${address}:42069/${uid}/full-name`);
      if (!response.ok) throw new Error('Network response was not ok');
      return await response.text();
    } catch (error) {
      console.error('Error fetching full name:', error);
      return '';
    }
  };

  const fetchReturn = async () => {
    try {
      const responses = await Promise.all(statuses.map(status => 
        axios.get(`http://${address}:42069/request/byItemStatus`, { params: { status } })
      ));

      const allData = responses.flatMap(response => response.data);
      setData(allData);
      
      const newCounts = {};
      allData.forEach(item => {
        newCounts[item.status] = (newCounts[item.status] || 0) + 1;
      });
      setCounts(newCounts);

    } catch (error) {
      console.error("Error fetching options:", error);
    }
  };

  useEffect(() => {
    fetchReturn();
  }, [loader]);

  useEffect(() => {
    const loadFullNames = async () => {
      const names = {};
      for (const item of data) {
        if (item.itemAccPerId) {
          const fullName = await fetchFullName(item.itemAccPerId);
          names[item.itemAccPerId] = fullName;
        }
      }
      setFullNames(names);
    };
    loadFullNames();
  }, [data]);

  const handleClickOpen = (rid, itemAccPerId, itemId, itemName, quantity) => {
    setItemDetails({
      rid: rid,
      itemAccPerId: itemAccPerId,
      itemId: itemId,
      itemName: itemName,
    });
    setAvailable(quantity);
    setOpen(true);
    setQuantity(0);
  };

  const handleClose = () => {
      setOpen(false);
  };

  const handleApproving = async (rid, fullName, accPerId, itemId, itemName) => {
    try {
      await axios.put(`http://${address}:42069/request/approve-return/${rid}`);
      showSnackbar('Item return approved successfully!', 'success');
      
      axios.post(`http://${address}:42069/addLog`, {
        description: `Approved the return request of ${fullName}: [${itemId}] - ${itemName}`,
        type: "REQUEST - RETURN (APPROVED)"
      }, {
        params: {
          uid: user.uid,
          iid: itemId 
        }
      })
      .then(response => {
        setLoader(Math.random()*1000);
      })
      .catch(error => {
        console.error("Error adding log:", error);
      });

    } catch (error) {
      console.log(error);
      showSnackbar('Failed to approve the return of item.', 'error');
    }
  };

  // const handleAddBack = async (rid, accPerId, itemId, itemName, quantity) => {
  //   if (quantity < 0 || quantity > available) {
  //     showSnackbar('Please enter a valid quantity.', 'error');
  //     return;
  //   }

  //   try {
  //     await axios.put(`http://${address}:42069/request/add-back/${rid}`, null, {
  //       params: { quantity }
  //     });
  //     setLoader(Math.random() * 1000);
  //     showSnackbar('Item added back to inventory!', 'success');
  //     handleClose();

  //     axios.post(`http://${address}:42069/addLog`, {
  //       description: `Added the item back to inventory: [${itemId}] - ${itemName}`,
  //       type: "REQUEST - ADDED BACK TO INVENTORY)"
  //     }, {
  //       params: {
  //         uid: accPerId,
  //         iid: itemId 
  //       }
  //     })
  //     .then(response => {
  //       setLoader(Math.random()*1000);
  //     })
  //     .catch(error => {
  //       console.error("Error adding log:", error);
  //     });

  //   } catch (error) {
  //     console.log(error);
  //     showSnackbar('Failed to add item back to inventory.', 'error');
  //   }
  // };

  const handleAddBack = async (rid, accPerId, itemId, itemName) => {
    try {
      await axios.put(`http://${address}:42069/request/add-back/${rid}`);
      setLoader(Math.random() * 1000);
      showSnackbar('Item added back to inventory!', 'success');
      handleClose();

      axios.post(`http://${address}:42069/addLog`, {
        description: `Added the item back to inventory: [${itemId}] - ${itemName}`,
        type: "REQUEST - ADDED BACK TO INVENTORY)"
      }, {
        params: {
          uid: accPerId,
          iid: itemId 
        }
      })
      .then(response => {
        setLoader(Math.random()*1000);
      })
      .catch(error => {
        console.error("Error adding log:", error);
      });

    } catch (error) {
      console.log(error);
      showSnackbar('Failed to add item back to inventory.', 'error');
    }
  };

  const handleDisposing = async (rid, accPerId, itemId, itemName) => {
    try {
      await axios.put(`http://${address}:42069/request/dispose/${rid}`);
      setLoader(Math.random() * 1000);
      showSnackbar('Item successfully disposed!', 'success');

      axios.post(`http://${address}:42069/addLog`, {
        description: `Disposed the item: [${itemId}] - ${itemName}`,
        type: "REQUEST - DISPOSAL"
      }, {
        params: {
          uid: accPerId,
          iid: itemId 
        }
      })
      .then(response => {
        setLoader(Math.random()*1000);
      })
      .catch(error => {
        console.error("Error adding log:", error);
      });

    } catch (error) {
      console.log(error);
      showSnackbar('Failed to dispose item.', 'error');
    }
  };

  const handleShowReason = async (reason) => {
    setReason(reason);
    setDialogOpen(true);
  }

  const handleCloseDialog = () => {
    setReason('');
    setDialogOpen(false);
  };

  const filteredData = data.filter(item => item.status === statuses[currentTab]);

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
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Tabs
            value={currentTab}
            onChange={(event, newValue) => setCurrentTab(newValue)}
            textColor="inherit"
            variant="fullWidth"
            sx={{ 
                '& .MuiTabs-indicator': {
                  backgroundColor: '#8a252c',
                },
              }}
          >
            {statuses.map((status, index) => (
              <Tab 
                label={`${status} (${counts[status] || 0})`} 
                key={index}
                sx={{ 
                    color: '#8a252c',
                    fontWeight: 'bold',
                 }}
              />
            ))}
          </Tabs>
          
          <TableContainer component={Paper} style={{ maxHeight: '550px', overflowY: 'auto' }}>
            <Table>
              <TableHead>
                <TableRow style={{ position: 'sticky', top: 0, backgroundColor: '#eeeeee', zIndex: 1 }}>
                  {columns.map((column) => (
                    <TableCell key={column} style={{ padding: '10px', fontWeight: '600', color: 'black', backgroundColor: '#eeeeee', textAlign: 'center' }}>
                      {column}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredData.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      <Typography variant="body1" color="textSecondary">
                        No requests available.
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredData.map((item) => (
                    <TableRow key={item.rid} >
                      <TableCell style={{ textAlign: 'center' }}>{item.rid}</TableCell>
                      <TableCell style={{ textAlign: 'center' }}>{item.itemId}</TableCell>
                      <TableCell style={{ textAlign: 'center' }}>{item.itemName}</TableCell>
                      <TableCell style={{ textAlign: 'center' }}>{fullNames[item.itemAccPerId] || 'Loading...'}</TableCell>
                      <TableCell style={{ textAlign: 'center' }}>{item.status}</TableCell>
                      <TableCell colSpan={2} align="center" >
                        {item.status === "TO BE RETURNED" && (
                            <Button
                                onClick={() => handleApproving(item.rid, fullNames[item.itemAccPerId], item.itemAccPerId, item.itemId, item.itemName)}
                                variant="contained"
                                color="success"
                                startIcon={<CheckCircleOutlineIcon />}
                                sx={{ width: '110px', mr: 1 }}
                            >
                                Accept
                            </Button>
                        )}
                        {item.status === "RETURNED" && (
                            <>
                            <Button
                                // onClick={() => handleClickOpen(item.rid, item.itemAccPerId, item.itemId, item.itemName, item.itemQuantity)}
                                onClick={() => handleAddBack(item.rid, item.itemAccPerId, item.itemId, item.itemName)}
                                variant="contained"
                                color="success"
                                startIcon={<CheckCircleOutlineIcon />}
                                sx={{ width: '131px', mr: 1 }}
                            >
                                Add Back
                            </Button>
                            <Button
                                onClick={() => handleDisposing(item.rid, item.itemAccPerId, item.itemId, item.itemName)}
                                variant="contained"
                                color="error"
                                startIcon={<DeleteOutlineIcon />}
                                sx={{ width: '110px', mr: 1 }}
                            >
                                Dispose
                            </Button>
                            </>
                        )}
                        {item.status === "REJECTED" && (
                            <>
                            <Button
                                onClick={() => handleShowReason(item.reason)}
                                variant="contained"
                                color="primary"
                                startIcon={<VisibilityIcon />}
                            >
                                Show Reason
                            </Button>
                            </>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>

          <Dialog open={dialogOpen} onClose={handleCloseDialog}>
            <DialogTitle>Reason for Rejection:</DialogTitle>
            <DialogContent>
              <Typography variant="body1" align="center" >{reason}</Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog} color="primary" variant="contained">
                Close
              </Button>
            </DialogActions>
          </Dialog>

          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Deduct Quantity</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Please enter the quantity to deduct (Available: {available}).
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Quantity"
                    type="number"
                    fullWidth
                    variant="outlined"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={() => handleAddBack(itemDetails.rid, itemDetails.accPerId, itemDetails.itemId, itemDetails.itemName, quantity)} color="primary">
                    Submit
                </Button>
            </DialogActions>
        </Dialog>

        </Container>
      </Box>
    </>
  );
}
