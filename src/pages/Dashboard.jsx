import { Box, Container, Paper, Toolbar, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Button } from "@mui/material";

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

export default function Dashboard() {
  const [department, setDepartments] = useState([]);
  const [depItem, setDepItem] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchDepartment = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/item/dep`);
      const uniqueOptions_department = [...new Set(response.data)]; // Remove duplicates
      setDepartments(uniqueOptions_department);
    } catch (error) {
      console.error("Error fetching options:", error);
    }
  };

  useEffect(() => {
    fetchDepartment();
  }, []);

  const handleDepItems = async (item) => {
    try {
      setLoading(true);
      const result = await axios.get(`http://localhost:8080/item/getByDep`, {
        params: {
          depa: item
        }
      });

      setDepItem(result.data);
      console.log(result.data); 
      alert(JSON.stringify(result.data)); 
    } catch (error) {
      console.error(error);
      alert("Service error");
    } finally {
      setLoading(false); 
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
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 8, lg: 9 }}>
              <Paper
                sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  height: 240,
                }}
              >
                {/* Additional content can be added here */}
              </Paper>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Paper elevation={3} style={{ padding: '16px' }}>
                  {department.map((item, index) => (
                    <Button
                      key={index}
                      variant="contained"
                      color="primary"
                      style={{ margin: '8px' }}
                      onClick={() => handleDepItems(item)}
                      aria-label={`Button for ${item}`}
                      disabled={loading} 
                    >
                      {item}
                    </Button>
                  ))}
                </Paper>
              </Grid>
            </Grid>

            {/* Recent Deposits */}
            <Grid size={{ xs: 12, md: 4, lg: 3 }}>
              <Paper
                sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  height: 240,
                }}
              >
                {/* <Deposits /> */}
              </Paper>
            </Grid>

            {/* Recent Orders */}
            <Grid size={{ xs: 12 }}>
              <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                {/* <Orders /> */}
              </Paper>
            </Grid>
          </Grid>
          <Copyright sx={{ pt: 4 }} />
        </Container>
      </Box>
    </>
  );
}
