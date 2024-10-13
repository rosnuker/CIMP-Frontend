import React, { useState, useEffect } from 'react';
import { Box, Container, Paper, Toolbar, Typography, Button, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Divider  } from "@mui/material";
import { Link } from "react-router-dom";
import axios from 'axios';
import AddIcon from '@mui/icons-material/Add';

function Copyright(props) 
{
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

export default function AdminDashboard({ user, setUser, data = [] }) 
{
  const columns = ["FIRST NAME", "LAST NAME", "USERNAME", "TYPE"];
  const [users, setUsers] = useState([]);

  // Fetch data from the backend on component mount
  useEffect(() => 
  {
    fetchData();
  }, []);

  const fetchData = async () => 
  {
    try 
    {
      const response = await axios.get(`http://localhost:8080/getAllUsers`);
      setUsers(response.data);
    } 
    catch (error) 
    {
      console.error("Error fetching data:", error);
    }
  };

  const handleOpenModal = () => 
  {
    console.log("Open Add User Modal");
    // Placeholder for opening a modal or dialog to add a new user
  };

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
              ) : (users.map((user) => (
                !user.deleted && (
                  <TableRow
                    key={user.uid}
                    style={{
                      backgroundColor: 'white',
                      transition: 'background-color 0.3s ease',
                    }}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'gray'}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'white'}
                  >
                    <TableCell>{user.fname}</TableCell>
                    <TableCell>{user.lname}</TableCell>
                    <TableCell>{user.username}</TableCell>
                    <TableCell>{user.type}</TableCell>
                  </TableRow>
                )
              )))}
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
            <TextField autoFocus margin="dense" label="First Name" type="text" fullWidth variant="outlined" />
            <TextField margin="dense" label="Last Name" type="text" fullWidth variant="outlined" />
            <TextField margin="dense" label="Username" type="text" fullWidth variant="outlined" />
            <TextField margin="dense" label="Type" type="text" fullWidth variant="outlined" />
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
                // onClick={handleAddUser} 
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
        <Copyright sx={{ pt: 4 }} />
      </Container>
    </Box>
  );
}
