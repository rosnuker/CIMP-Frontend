import { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from "@mui/material/Grid2";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


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

const defaultTheme = createTheme();

export default function SignIn({ user, setUser }) {

  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
		username: '',
		password: ''
	});

  useEffect(() => {
    if (loginData.username !== '' && loginData.password !== '') {
      login();
    }
  }, [loginData]);

  useEffect(() => {
    if (user) {
      navigate('/app');
    }
  }, [user, navigate]);

  const handleSubmit = (event) => {
    
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    setLoginData({
      username: data.get('username'),
      password: data.get('password'),
    });
  
  };

  async function login() {
    return axios.post('http://localhost:8080/login', {
      username: loginData.username,
			password: loginData.password,
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => {
      if(!(response.status === 200)) {
        throw new Error('There is a problem with the request');
      }
      
      if(response.data !== '') {
        setUser({
          uid: response.data.uid,
          fname: response.data.fname,
          lname: response.data.lname,
          username: response.data.username,
          type: response.data.type,
        });
  
        setLoginData({
          username: '',
          password: '',
        });
      } else {
        document.getElementById("username").value="";
				document.getElementById("password").value="";
				document.getElementById("username").focus();
      }
    }).catch(error => {
      console.log('There was a problem with the fetch operation:', error);
    })
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 25,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar alt="Wildcats Logo" src="./src/assets/cat.jpg" variant="square" sx={{ m: 1, width: 128, height: 128}} />

          <Typography component="h1" variant="h5">
            Welcome Back!
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              sx={{ '& label.Mui-focused': { color: '#8A252C'}, 
              '& .MuiInput-underline:after': { borderBottomColor: "#8A252C"}, 
              '& .MuiFilledInput-underline:after': { borderBottomColor: "#8A252C"}, 
              '& .MuiOutlinedInput-root': { '&.Mui-focused fieldset': {borderColor: "#8A252C"}
              }}}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              sx={{ '& label.Mui-focused': { color: '#8A252C'}, 
              '& .MuiInput-underline:after': { borderBottomColor: "#8A252C"}, 
              '& .MuiFilledInput-underline:after': { borderBottomColor: "#8A252C"}, 
              '& .MuiOutlinedInput-root': { '&.Mui-focused fieldset': { borderColor: "#8A252C" }
              }}}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, bgcolor:"#8A252C", ':hover': {
                bgcolor: '#b2494b'
              } }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid sx={{ ml: 12}}>
                <Link href="#" variant="body2" underline="hover" sx={{ color: "#8A252C" }}>
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}