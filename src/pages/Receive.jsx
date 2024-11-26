import axios from "axios";

import { useState } from "react";
import { Box, Container, Toolbar, Typography, Paper, TextField, Button } from "@mui/material";
import { Link } from "react-router-dom";


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://cit.edu/">
        FAIM
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function Receive( {user, setUser, setSnackbarGreenOpen, setSnackbarRedOpen, setSnackbarMessage } ) {

    const [id, setId] = useState("");
    const [remarks, setRemarks] = useState("");
    const [other, setOther] = useState("");
    const [queryResults, setQueryResults] = useState([]);
    const [LqueryResults, LsetQueryResults] = useState([]);
    const address = getIpAddress();
	
	function getIpAddress() {
		const hostname = window.location.hostname;

		const indexOfColon = hostname.indexOf(':');

		if(indexOfColon !== -1) {
			return hostname.substring(0, indexOfColon);
		}

		return hostname;
	}
    
    const handleId = event => {
        setId(event.target.value)
    }
    const handleRemarks = event => {
        setRemarks(event.target.value)
    }
    const handleOther = event => {
        setOther(event.target.value)
    }


    const handleReceive = () => {
        axios.put(`http://${address}:42069/item/updateStatus`, null, {
            params: {
                iid: id,
                status: "AVAILABLE"
            }
        })
        .then(result => {
            // alert("Item Received");
            // setSnackbarMessage(`"[${result.data.iid}] - ${result.data.description.name}" received from ` + remarks);
            // setSnackbarGreenOpen(true);
            console.log(result.data);
            handleLog(result.data);
        })
        .catch(error => {
            console.log(error);
            // alert("No Data found!");
            // setSnackbarMessage("No data found.");
            // setSnackbarRedOpen(true);
        });
    }

    const handleLog = (item) => {
        axios.post(`http://${address}:42069/addLog`, {
            type: "RECEIVE",
            description: `Received "[${item.iid}] - ${item.description.name}" From: ` + remarks + " | Remarks: " + other
        }, {
            params: {
                uid: user.uid,
                iid: id
            }
        })
        .then(result => {
            LsetQueryResults(result.data)
            console.log(LqueryResults);
        })
        .catch(error => {
            console.error("Error adding log:", error);
        });
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
        <Container maxWidth="xs" sx={{ mt: 10 }}>
        <Paper elevation={4}>
            <Box sx={{ p: 1, bgcolor: 'maroon', borderTopLeftRadius: 4, borderTopRightRadius: 4 }} />
            <Box sx={{ p: 6, bgcolor: 'white' }}>
            <Box sx={{ mb: 4 }}>
        <Typography variant="h5" fontWeight="bold" textAlign="center">Receive</Typography>
            </Box>
    <Box sx={{ mb: 2 }}>
        <TextField
            fullWidth
            id="ptag" 
            label="Property Tag" 
            variant="outlined"
            onChange={handleId}
            />                            
            </Box>
        <Box sx={{ mb: 2 }}>
            <TextField
            fullWidth
            id="Returned" 
            label="Returned By" 
            variant="outlined"
            onChange={handleRemarks}
            />
            </Box>
        <Box sx={{ mb: 2 }}>
            <TextField
            fullWidth
            id="OtherRemarks" 
            label="Other Remarks" 
            variant="outlined"
            onChange={handleOther}
            />
            </Box>
        <Button
            variant="contained"
            color="warning"
            fullWidth
            sx={{ bgcolor: '#ffc107',
                '&:hover': { bgcolor: '#ffb300' },
                fontWeight: 'bold',
                }}
                onClick={handleReceive}
                >
                    Receive
                        </Button>
                    </Box>
                <Box sx={{ p: 1, bgcolor: 'maroon', borderBottomLeftRadius: 4, borderBottomRightRadius: 4 }} /> 
            </Paper>
        </Container>
    <Copyright sx={{ pt: 4 }} />
</Box>  
      </>
    )
}
