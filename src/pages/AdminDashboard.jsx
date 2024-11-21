import React, { useState, useEffect } from 'react';
import { Box, Container, Paper, Toolbar, Typography, Button, TableContainer, Table, TableHead, IconButton, TableRow, TableCell, TableBody, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Divider, MenuItem, Select, InputLabel, FormControl, Tabs, Tab } from "@mui/material";
import axios from 'axios';
import AddIcon from '@mui/icons-material/Add';
import { useSnackbar } from '../components/SnackbarContext';

export default function AdminDashboard({ user, setUser, data = [] }) {
  const columns = ["FIRST NAME", "LAST NAME", "DEPARTMENT", "DESIGNATION", "USERNAME", "TYPE"];
  const [users, setUsers] = useState([]);
  const [showDeleted, setShowDeleted] = useState(false);
  // States for form fields
  const [fname, setFirstName] = useState('');
  const [lname, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [department, setDepartment] = useState('');
  const [designation, setDesignation] = useState('');
  const [type, setType] = useState('');
  const showSnackbar = useSnackbar();

  // State for opening/closing the modal
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false); // For editing user
  const [selectedUserId, setSelectedUserId] = useState(null); // To track which user is selected

  const address = getIpAddress();

  function getIpAddress() {
      const hostname = window.location.hostname;
      const indexOfColon = hostname.indexOf(':');
      return indexOfColon !== -1 ? hostname.substring(0, indexOfColon) : hostname;
  }
  
  // Fetch data from the backend on component mount
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://${address}:8080/getAllUsers`);
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleClickOpen = () => {
    setFirstName('');
    setLastName('');
    setUsername('');
    setDepartment('');
    setDesignation('');
    setPassword('');
    setConfirmPassword('');
    setType('');
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFirstName('');
    setLastName('');
    setUsername('');
    setDepartment('');
    setDesignation('');
    setPassword('');
    setConfirmPassword('');
    setType('');
  };

  const handleAddUser = async () => {
    // Check if all fields are filled
    if (!fname || !lname || !username || !department || !designation || !password || !confirmPassword || !type) {
      showSnackbar('All fields must be filled!', 'error');
      return; // Prevent further execution
    }
    if (password !== confirmPassword) {
      showSnackbar('Password does not match!', 'error');
      return;
    }

    try {
      const newUser = {
        fname,
        lname,
        username,
        department,
        designation,
        password,
        type
      };

      // Make a POST request to register a new user
      await axios.post(`http://${address}:8080/register`, newUser);

      // Fetch updated user list
      fetchData();

      // Clear form fields and close modal
      setFirstName('');
      setLastName('');
      setUsername('');
      setDepartment('');
      setDesignation('');
      setPassword('');
      setType('');
      handleClose();

      showSnackbar('User added successfully!', 'success');
    } catch (error) {
      console.error("Error adding user:", error);
      showSnackbar('Error adding user!', 'error');
    }
  };

  const [openDialog, setOpenDialog] = useState(false);
	const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
      setOpenDialog(false);
  };

  // Functions for editing user
  const handleEditOpen = (user) => {
    setFirstName(user.fname);
    setLastName(user.lname);
    setUsername(user.username);
    setDepartment(user.department);
    setDesignation(user.designation);
    setPassword(user.password);
    setType(user.type);
    setSelectedUserId(user.uid); // Track selected user ID
    setEditOpen(true);
  };

  const handleEditClose = () => {
    setEditOpen(false);
    // Clear fields
    setFirstName('');
    setLastName('');
    setUsername('');
    setDepartment('');
    setDesignation('');
    setPassword('');
    setConfirmPassword('');
    setType('');
  };

  const handleUpdateUser = async () => {
    if (!fname || !lname || !username || !department || !designation || !password || !confirmPassword || !type) {
      showSnackbar('All fields must be filled!', 'error');
      return; // Prevent further execution
    }
    if (password !== confirmPassword) {
      showSnackbar('Password does not match!', 'error');
      return;
    }

    try {
      const updatedUser = {
        fname,
        lname,
        username,
        department,
        designation,
        password,
        type
      };

      // Make a PUT request to update the user
      await axios.put(`http://${address}:8080/updateUser/${selectedUserId}`, updatedUser);

      // Fetch updated user list
      fetchData();
      handleEditClose(); // Close edit dialog

      showSnackbar('User updated successfully!', 'success');
    } catch (error) {
      console.error("Error updating user:", error);
      showSnackbar('Error updating user!', 'error');
    }
  };

  const handleDeleteUser = async () => {
    try {
      // Make a DELETE request to delete the user
      await axios.delete(`http://${address}:8080/deleteUser/${selectedUserId}`);

      // Fetch updated user list
      fetchData();
      handleCloseDialog();
      handleEditClose(); // Close edit dialog
      showSnackbar('User deleted successfully!', 'success');
    } catch (error) {
      console.error("Error deleting user:", error);
      showSnackbar('Error deleting user!', 'error');
    }
  };

  return (
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
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            type="button"
            variant="contained"
            sx={{
              borderRadius: 2,
              fontFamily: "Poppins",
              backgroundColor: '#8c383e',
              color: '#fafafa',
              '&:hover': {
                backgroundColor: 'darkred',
              },
            }}
            startIcon={<AddIcon />}
            onClick={handleClickOpen}
          >
            Add Users
          </Button>
        </div>

        <Tabs
          value={showDeleted ? 'deleted' : 'active'}
          onChange={(event, newValue) => setShowDeleted(newValue === 'deleted')}
          textColor="inherit"
          variant="fullWidth"
          sx={{ 
            '& .MuiTabs-indicator': {
              backgroundColor: '#8a252c',
            },
          }}
        >
          <Tab 
            label={`Active Users (${users.filter(user => !user.deleted && user.uid !== 1).length})`} 
            value="active"
            sx={{ 
              color: '#8a252c',
              fontWeight: 'bold',
            }}
          />
          <Tab 
            label={`Inactive Users (${users.filter(user => user.deleted && user.uid !== 1).length})`} 
            value="deleted"
            sx={{ 
              color: '#8a252c',
              fontWeight: 'bold',
            }}
          />
        </Tabs>

        

<TableContainer component={Paper} style={{ maxHeight: '530px', marginLeft: '1px', marginRight: '4px', marginTop: '20px' }}>
  <Table size="small" stickyHeader aria-label="customized table">
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
      {users.length === 0 ? (
        <TableRow>
          <TableCell colSpan={columns.length} style={{ textAlign: 'center', padding: '20px' }}>
            <Typography variant="body1">There are no User(s) to show</Typography>
          </TableCell>
        </TableRow>
      ) : (
        users
          .filter((user) => showDeleted ? user.deleted : !user.deleted) // Filter users based on toggle
          .filter(user => user.uid !== 1)
          .map((user) => (
            <TableRow
              key={user.uid}
              style={{
                backgroundColor: 'white',
                transition: 'background-color 0.3s ease',
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'gray'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'white'}
              onClick={() => handleEditOpen(user)} // Open edit dialog on row click
            >
              <TableCell>{user.fname}</TableCell>
              <TableCell>{user.lname}</TableCell>
              <TableCell>{user.department}</TableCell>
              <TableCell>{user.designation}</TableCell>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.type === 'admin' ? 'Admin' : user.type === 'owner' ? 'Owner' : user.type === 'encoder' ? 'Encoder' : user.type === 'acc_person' ? 'Accountable Person' : user.type}</TableCell>
            </TableRow>
          ))
      )}
    </TableBody>
  </Table>
</TableContainer>

        {/* Dialog for adding users */}
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>
            <Typography
              variant="h6"
              sx={{
                textAlign: "center",
                fontWeight: "bold",
                color: "maroon",
                backgroundColor: "yellow",
                paddingY: 1,
                marginBottom: 3,
              }}
            >
              Add New User
            </Typography>
            <Divider sx={{ marginBottom: 2 }} />
          </DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="First Name"
              type="text"
              fullWidth
              variant="outlined"
              value={fname}
              required
              onChange={(e) => setFirstName(e.target.value)}
            />
            <TextField
              margin="dense"
              label="Last Name"
              type="text"
              fullWidth
              variant="outlined"
              value={lname}
              required
              onChange={(e) => setLastName(e.target.value)}
            />
            <TextField
              margin="dense"
              label="Username"
              type="text"
              fullWidth
              variant="outlined"
              value={username}
              required
              onChange={(e) => setUsername(e.target.value)}
            />
            <FormControl fullWidth variant="outlined" margin="dense">
              <InputLabel>Department</InputLabel>
              <Select
                value={department}
                required
                onChange={(e) => setDepartment(e.target.value)}
                label="Department"
              >
                <MenuItem value="Alumni Affairs Office">Alumni Affairs Office</MenuItem>
                <MenuItem value="CASE-Dean's Office">CASE-Dean's Office</MenuItem>
                <MenuItem value="CCS-Dean's Office">CCS-Dean's Office</MenuItem>
                <MenuItem value="CCS-IT / CREATE / NEXUSS">CCS-IT / CREATE / NEXUSS</MenuItem>
                <MenuItem value="CCS-MakerSpace">CCS-MakerSpace</MenuItem>
                <MenuItem value="CMBA-Dean's Office">CMBA-Dean's Office</MenuItem>
                <MenuItem value="CMBA-DHTM">CMBA-DHTM</MenuItem>
                <MenuItem value="CON">CON</MenuItem>
                <MenuItem value="CON-Dean's Office">CON-Dean's Office</MenuItem>
                <MenuItem value="CORE-MARKETING">CORE-MARKETING</MenuItem>
                <MenuItem value="CEA-ARCH">CEA-ARCH</MenuItem>
                <MenuItem value="CEA-CE">CEA-CE</MenuItem>
                <MenuItem value="CEA-CE / PCO">CEA-CE / PCO</MenuItem>
                <MenuItem value="CEA-CHE">CEA-CHE</MenuItem>
                <MenuItem value="CEA-DEMP">CEA-DEMP</MenuItem>
                <MenuItem value="CEA-ECE">CEA-ECE</MenuItem>
                <MenuItem value="CEA-EE">CEA-EE</MenuItem>
                <MenuItem value="CEA-EM">CEA-EM</MenuItem>
                <MenuItem value="CEA-ME">CEA-ME</MenuItem>
                <MenuItem value="CV-FIC">CV-FIC</MenuItem>
                <MenuItem value="ETEEAP">ETEEAP</MenuItem>
                <MenuItem value="Executive Office">Executive Office</MenuItem>
                <MenuItem value="FAO">FAO</MenuItem>
                <MenuItem value="GUIDANCE">GUIDANCE</MenuItem>
                <MenuItem value="HRD">HRD</MenuItem>
                <MenuItem value="ISD">ISD</MenuItem>
                <MenuItem value="JHS">JHS</MenuItem>
                <MenuItem value="LRAC">LRAC</MenuItem>
                <MenuItem value="MEDICAL-DENTAL CLINIC">MEDICAL-DENTAL CLINIC</MenuItem>
                <MenuItem value="MIS-ISD">MIS-ISD</MenuItem>
                <MenuItem value="MSDO">MSDO</MenuItem>
                <MenuItem value="MSDO - ATO">MSDO - ATO</MenuItem>
                <MenuItem value="NLO">NLO</MenuItem>
                <MenuItem value="OAS">OAS</MenuItem>
                <MenuItem value="OPC">OPC</MenuItem>
                <MenuItem value="QAO">QAO</MenuItem>
                <MenuItem value="RDCO">RDCO</MenuItem>
                <MenuItem value="SAFETY & SECURITY">SAFETY & SECURITY</MenuItem>
                <MenuItem value="SSO">SSO</MenuItem>
                <MenuItem value="SHS">SHS</MenuItem>
                <MenuItem value="TSG">TSG</MenuItem>
                <MenuItem value="URO">URO</MenuItem>
                <MenuItem value="URO-College">URO-College</MenuItem>
                <MenuItem value="URO-ELEM">URO-ELEM</MenuItem>
                <MenuItem value="URO-HS">URO-HS</MenuItem>
                <MenuItem value="URO-SHS">URO-SHS</MenuItem>
              </Select>
            </FormControl>
            <TextField
              margin="dense"
              label="Designation"
              type="text"
              fullWidth
              variant="outlined"
              value={designation}
              required
              onChange={(e) => setDesignation(e.target.value)}
            />
            <TextField
              margin="dense"
              label="Password"
              type="password"
              fullWidth
              variant="outlined"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
              margin="dense"
              label="Confirm Password"
              type="password"
              fullWidth
              variant="outlined"
              value={confirmPassword}
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          <FormControl fullWidth variant="outlined" margin="dense">
            <InputLabel>Type</InputLabel>
            <Select
              value={type}
              required
              onChange={(e) => setType(e.target.value)}
              label="Type"
            >
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="owner">Owner</MenuItem>
              <MenuItem value="encoder">Encoder</MenuItem>
              <MenuItem value="acc_person">Accountable Person</MenuItem>
            </Select>
          </FormControl>
          </DialogContent>
          <DialogActions>
            <Button 
              onClick={handleClose} 
              variant="contained"
              sx={{
                marginRight: 1,
                marginBottom: 2,
                backgroundColor: "#e0e0e0",
                color: "#fafafa",
                "&:hover": {
                  backgroundColor: "#9e9e9e",
                },
              }}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleAddUser} 
              color="primary" 
              variant="contained"
              sx={{
                marginLeft: 1,
                marginRight: 2,
                marginBottom: 2,
                width: '100px',
              }}
            >
              Add
            </Button>
          </DialogActions>
        </Dialog>

        {/* Dialog for editing users */}
        <Dialog open={editOpen} onClose={handleEditClose}>
          <DialogTitle>
            <Typography
              variant="h6"
              sx={{
                textAlign: "center",
                fontWeight: "bold",
                color: "maroon",
                backgroundColor: "yellow",
                paddingY: 1,
                marginBottom: 3,
              }}
            >
              Edit User
            </Typography>
            <Divider sx={{ marginBottom: 2 }} />
          </DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="First Name"
              type="text"
              fullWidth
              variant="outlined"
              value={fname}
              required
              onChange={(e) => setFirstName(e.target.value)}
            />
            <TextField
              margin="dense"
              label="Last Name"
              type="text"
              fullWidth
              variant="outlined"
              value={lname}
              required
              onChange={(e) => setLastName(e.target.value)}
            />
            <TextField
              margin="dense"
              label="Username"
              type="text"
              fullWidth
              variant="outlined"
              value={username}
              required
              onChange={(e) => setUsername(e.target.value)}
            />
            <FormControl fullWidth variant="outlined" margin="dense">
              <InputLabel>Department</InputLabel>
              <Select
                value={department}
                required
                onChange={(e) => setDepartment(e.target.value)}
                label="Department"
              >
                <MenuItem value="Alumni Affairs Office">Alumni Affairs Office</MenuItem>
                <MenuItem value="CASE-Dean's Office">CASE-Dean's Office</MenuItem>
                <MenuItem value="CCS-Dean's Office">CCS-Dean's Office</MenuItem>
                <MenuItem value="CCS-IT / CREATE / NEXUSS">CCS-IT / CREATE / NEXUSS</MenuItem>
                <MenuItem value="CCS-MakerSpace">CCS-MakerSpace</MenuItem>
                <MenuItem value="CMBA-Dean's Office">CMBA-Dean's Office</MenuItem>
                <MenuItem value="CMBA-DHTM">CMBA-DHTM</MenuItem>
                <MenuItem value="CON">CON</MenuItem>
                <MenuItem value="CON-Dean's Office">CON-Dean's Office</MenuItem>
                <MenuItem value="CORE-MARKETING">CORE-MARKETING</MenuItem>
                <MenuItem value="CEA-ARCH">CEA-ARCH</MenuItem>
                <MenuItem value="CEA-CE">CEA-CE</MenuItem>
                <MenuItem value="CEA-CE / PCO">CEA-CE / PCO</MenuItem>
                <MenuItem value="CEA-CHE">CEA-CHE</MenuItem>
                <MenuItem value="CEA-DEMP">CEA-DEMP</MenuItem>
                <MenuItem value="CEA-ECE">CEA-ECE</MenuItem>
                <MenuItem value="CEA-EE">CEA-EE</MenuItem>
                <MenuItem value="CEA-EM">CEA-EM</MenuItem>
                <MenuItem value="CEA-ME">CEA-ME</MenuItem>
                <MenuItem value="CV-FIC">CV-FIC</MenuItem>
                <MenuItem value="ETEEAP">ETEEAP</MenuItem>
                <MenuItem value="Executive Office">Executive Office</MenuItem>
                <MenuItem value="FAO">FAO</MenuItem>
                <MenuItem value="GUIDANCE">GUIDANCE</MenuItem>
                <MenuItem value="HRD">HRD</MenuItem>
                <MenuItem value="ISD">ISD</MenuItem>
                <MenuItem value="JHS">JHS</MenuItem>
                <MenuItem value="LRAC">LRAC</MenuItem>
                <MenuItem value="MEDICAL-DENTAL CLINIC">MEDICAL-DENTAL CLINIC</MenuItem>
                <MenuItem value="MIS-ISD">MIS-ISD</MenuItem>
                <MenuItem value="MSDO">MSDO</MenuItem>
                <MenuItem value="MSDO - ATO">MSDO - ATO</MenuItem>
                <MenuItem value="NLO">NLO</MenuItem>
                <MenuItem value="OAS">OAS</MenuItem>
                <MenuItem value="OPC">OPC</MenuItem>
                <MenuItem value="QAO">QAO</MenuItem>
                <MenuItem value="RDCO">RDCO</MenuItem>
                <MenuItem value="SAFETY & SECURITY">SAFETY & SECURITY</MenuItem>
                <MenuItem value="SSO">SSO</MenuItem>
                <MenuItem value="SHS">SHS</MenuItem>
                <MenuItem value="TSG">TSG</MenuItem>
                <MenuItem value="URO">URO</MenuItem>
                <MenuItem value="URO-College">URO-College</MenuItem>
                <MenuItem value="URO-ELEM">URO-ELEM</MenuItem>
                <MenuItem value="URO-HS">URO-HS</MenuItem>
                <MenuItem value="URO-SHS">URO-SHS</MenuItem>
              </Select>
            </FormControl>
            <TextField
              margin="dense"
              label="Designation"
              type="text"
              fullWidth
              variant="outlined"
              value={designation}
              required
              onChange={(e) => setDesignation(e.target.value)}
            />
            <TextField
              margin="dense"
              label="Password"
              type="password"
              fullWidth
              variant="outlined"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
              margin="dense"
              label="Confirm Password"
              type="password"
              fullWidth
              variant="outlined"
              value={confirmPassword}
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <FormControl fullWidth variant="outlined" margin="dense">
              <InputLabel>Type</InputLabel>
              <Select
                value={type}
                required
                onChange={(e) => setType(e.target.value)}
                label="Type"
              >
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="owner">Owner</MenuItem>
                <MenuItem value="encoder">Encoder</MenuItem>
                <MenuItem value="acc_person">Accountable Person</MenuItem>
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button 
              onClick={handleEditClose} 
              variant="contained"
              sx={{
                marginRight: 1,
                marginBottom: 2,
                marginRight: 30,
                backgroundColor: "#e0e0e0",
                color: "#fafafa",
                "&:hover": {
                  backgroundColor: "#9e9e9e",
                },
              }}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleOpenDialog} 
              color="error" 
              variant="contained"
              sx={{
                marginLeft: 1,
                marginBottom: 2,
                width: '100px',
              }}
            >
              Delete
            </Button>
            <Button 
              onClick={handleUpdateUser} 
              color="primary" 
              variant="contained"
              sx={{
                marginLeft: 1,
                marginRight: 2,
                marginBottom: 2,
                width: '100px',
              }}
            >
              Update
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Delete Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this user?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={handleCloseDialog}
            sx={{
              backgroundColor: "#e0e0e0",
              color: "#fafafa",
              "&:hover": {
                backgroundColor: "#9e9e9e",
              },
            }}
          >
            Cancel
          </Button>
          <Button variant="contained" color="error" onClick={handleDeleteUser}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
        
      </Container>
    </Box>
  );
}
