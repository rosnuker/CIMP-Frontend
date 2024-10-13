import { Box, Container, Paper, Toolbar, Typography, Button, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import { Link } from "react-router-dom";
import axios from 'axios';
import AddIcon from '@mui/icons-material/Add';

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
            // onClick={handleOpenModal} // Uncomment when the function is defined
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
              {data.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={columns.length} style={{ textAlign: 'center', padding: '20px' }}>
                    <Typography variant="body1">There are no User(s) to show</Typography>
                  </TableCell>
                </TableRow>
              ) : (data.map((item) => (
                !item.deleted && (
                  <TableRow
                    key={item.iid}
                    style={{
                      backgroundColor: 'white',
                      transition: 'background-color 0.3s ease',
                    }}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'gray'}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'white'}
                  >
                    <TableCell>{item.firstName}</TableCell>
                    <TableCell>{item.lastName}</TableCell>
                    <TableCell>{item.username}</TableCell>
                    <TableCell>{item.type}</TableCell>
                  </TableRow>
                )
              )))}
            </TableBody>
          </Table>
        </TableContainer>
        <Copyright sx={{ pt: 4 }} />
      </Container>
    </Box>
  );
}
