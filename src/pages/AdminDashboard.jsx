import React, { useState, useEffect } from 'react';
import { Box, Container, Paper, Toolbar, Typography, Button, TableContainer, Table, TableHead, IconButton, TableRow, TableCell, TableBody, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Divider, Snackbar,  MenuItem, Select, InputLabel, FormControl, Switch, FormControlLabel} from "@mui/material";
import { Link } from "react-router-dom";
import axios from 'axios';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonIcon from '@mui/icons-material/Person';
import Grid from "@mui/material/Grid2";

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://cit.edu/">
        CIMP
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function AdminDashboard({ user, setUser, data = [] }) {
  const columns = ["FIRST NAME", "LAST NAME", "USERNAME", "TYPE"];
  const [users, setUsers] = useState([]);
  const [showDeleted, setShowDeleted] = useState(false);
  // States for form fields
  const [fname, setFirstName] = useState('');
  const [lname, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [type, setType] = useState('');

  // State for opening/closing the modal
  const [open, setOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [editOpen, setEditOpen] = useState(false); // For editing user
  const [selectedUserId, setSelectedUserId] = useState(null); // To track which user is selected

  // Fetch data from the backend on component mount
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/getAllUsers`);
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddUser = async () => {
    // Check if all fields are filled
    if (!fname || !lname || !username || !password || !type) {
      setSnackbarMessage('All fields must be filled!');
      setSnackbarOpen(true);
      return; // Prevent further execution
    }

    try {
      const newUser = {
        fname,
        lname,
        username,
        password,
        type
      };

      // Make a POST request to register a new user
      await axios.post(`http://localhost:8080/register`, newUser);

      // Fetch updated user list
      fetchData();

      // Clear form fields and close modal
      setFirstName('');
      setLastName('');
      setUsername('');
      setPassword('');
      setType('');
      handleClose();
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
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
    setPassword('');
    setType('');
  };

  const handleUpdateUser = async () => {
    if (!fname || !lname || !username || !password || !type) {
      setSnackbarMessage('All fields must be filled!');
      setSnackbarOpen(true);
      return; // Prevent further execution
    }

    try {
      const updatedUser = {
        fname,
        lname,
        username,
        password,
        type
      };

      // Make a PUT request to update the user
      await axios.put(`http://localhost:8080/updateUser/${selectedUserId}`, updatedUser);

      // Fetch updated user list
      fetchData();
      handleEditClose(); // Close edit dialog
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleDeleteUser = async () => {
    try {
      // Make a DELETE request to delete the user
      await axios.delete(`http://localhost:8080/deleteUser/${selectedUserId}`);

      // Fetch updated user list
      fetchData();
      handleCloseDialog();
      handleEditClose(); // Close edit dialog
    } catch (error) {
      console.error("Error deleting user:", error);
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

        <Grid container alignItems="center" justifyContent="center">
      {/* Left Icon */}
      <Grid item>
      <Typography variant="caption" color="blue">Users</Typography> 
        <IconButton>
          <PersonIcon sx={{ color: 'blue' }} />
        </IconButton>
      </Grid>

      {/* Switch */}
      <Grid item>
        <Switch
          checked={showDeleted}
          onChange={() => setShowDeleted(!showDeleted)}
          sx={{
            '& .MuiSwitch-switchBase': {
              color: 'blue',
            },
            '& .MuiSwitch-switchBase.Mui-checked': {
              color: 'red', 
            },
            '& .MuiSwitch-switchBase + .MuiSwitch-track': {
              backgroundColor: 'blue', 
            },
            '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
              backgroundColor: 'red',
            },
          }}
        />
      </Grid>

      {/* Right Icon */}
      <Grid item>
        <IconButton>
          <DeleteIcon sx={{ color: 'red' }} />
        </IconButton>
        <Typography variant="caption" color="red">Deleted Users</Typography> 
      </Grid>
    </Grid>

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
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.type}</TableCell>
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
            <DialogContentText>
              Please fill in the details of the new user.
            </DialogContentText>
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
            <DialogContentText>
              Please edit the details of the user.
            </DialogContentText>
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
            {/* <TextField
              margin="dense"
              label="Type"
              type="text"
              fullWidth
              variant="outlined"
              value={type}
              required
              onChange={(e) => setType(e.target.value)}
            /> */}
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
              onClick={handleUpdateUser} 
              color="primary" 
              variant="contained"
              sx={{
                marginLeft: 1,
                marginBottom: 2,
                width: '100px',
              }}
            >
              Update
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
          </DialogActions>
        </Dialog>

        <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Delete Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this user? This action cannot be undone.
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

        {/* Snackbar for showing messages */}
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={handleSnackbarClose}
          message={snackbarMessage}
        />

        <Copyright sx={{ pt: 4 }} />
      </Container>
    </Box>
  );
}
