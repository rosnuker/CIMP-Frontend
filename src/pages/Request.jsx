import axios from "axios";

import { useState } from "react";
import { Container, Box, Toolbar, Paper, TextField, Typography, Button, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
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

export default function Request( { user, setUser, setSnackbarGreenOpen, setSnackbarRedOpen, setSnackbarMessage } ) {
    const [type, setType] = useState("");
    const [number, setNumber] = useState("");
    const [id, setId] = useState("");
    const [remarks, setRemarks] = useState("");
    const [stat, setStat] = useState("");
    const [other, setOther] =useState("");
    const [LqueryResults, setLQueryResults] = useState([]);
    const address = getIpAddress();
	
	function getIpAddress() {
		const hostname = window.location.hostname;

		const indexOfColon = hostname.indexOf(':');

		if(indexOfColon !== -1) {
			return hostname.substring(0, indexOfColon);
		}

		return hostname;
	}

    const handleOther = (event) => {
        setOther(event.target.value)
    }
     
    const handleRemark = (event) => {
        setRemarks(event.target.value);
    }

    const handleType = (event) => {
        setType(event.target.value);
    }

    const handleId = (event) =>{
        setId(event.target.value);
    }

    const handleNumber = (event) =>{
        setNumber(event.target.value);
    }

    const handleLog = (item) =>{
        if(type === "REQUEST"){
            axios.post(`http://${address}:42069/addLog`, {
            type: type,
            description: "Requested " + number +`x of: "[${item.iid}] - ${item.description.name}" By: ` + remarks
        }, {
            params: {
                uid: user.uid,
                iid: id 
            }
			})
			.then(response => {
				setLQueryResults(response.data);
				console.log(response.data);

			})
			.catch(error => {
				console.error("Error adding log:", error);
			});
        }else if(type === "BORROW"){
            axios.post(`http://${address}:42069/addLog`, {
            type: type,
            description: `Borrowed "[${item.iid}] - ${item.description.name}" By: ` + remarks
        }, {
            params: {
                uid: user.uid,
                iid: id 
            }
			})
			.then(response => {
				setLQueryResults(response.data);
				console.log(response.data);

			})
			.catch(error => {
				console.error("Error adding log:", error);
			});
        }else if(type === "REPAIR") {
            axios.post(`http://${address}:42069/addLog`, {
            type: type,
            description: `"[${item.iid}] - ${item.description.name}" sent for repairs By: ` + remarks
        }, {
            params: {
                uid: user.uid,
                iid: id 
            }
			})
			.then(response => {
				setLQueryResults(response.data);
				console.log(response.data);

			})
			.catch(error => {
				console.error("Error adding log:", error);
			});
        }else if(type === "DISPOSAL") {
            axios.post(`http://${address}:42069/addLog`, {
            type: type,
            description: `"[${item.iid}] - ${item.description.name}" sent for disposal By: ` + remarks
        }, {
            params: {
                uid: user.uid,
                iid: id 
            }
			})
			.then(response => {
				setLQueryResults(response.data);
				console.log(response.data);

			})
			.catch(error => {
				console.error("Error adding log:", error);
			});
        }
        
    }

    const handleQuanti = () =>{
        axios.get(`http://${address}:42069/item/quantiLog`,{
            params: {
                num: id
            }
        })
        .then(result => {
            console.log(result.data);

                if(result.data >= parseInt(number)){
                    axios.put(`http://${address}:42069/item/requestItem`, null, {
                        params: {
                            number: parseInt(number),
                            itemId: id
                        }
                    })
                    .then(result => {
                        // alert("Request Successful!")
                        // setSnackbarMessage(`Reqested ${number}x of: [${result.data.iid}] - ${result.data.description.name} successfully!`);
                        // setSnackbarGreenOpen(true);
                        console.log(result.data);
                        handleLog(result.data);
                    })
                    .catch(error => {
                        console.log(error);
                        // alert("No Data found!");
                        // setSnackbarMessage("No data found!");
                        // setSnackbarRedOpen(true);
                    });
                }else{
                    // alert("Not available")
                    // setSnackbarMessage("Not available!");
                    // setSnackbarRedOpen(true);
                }
        })
    }

    const handleStatus = () =>{
        axios.get(`http://${address}:42069/item/statusLog`, {
            params: {
                type: id
            }
        })
        .then(result => {
            console.log(result.data);
            setStat(result.data);
            
            if(result.data === "AVAILABLE"){
                axios.put(`http://${address}:42069/item/updateStatus`, null, {
                    params: {
                        iid: id,
                        status: type
                    }
                })
                .then(result => {
                    // alert("Request Successful!")
                    console.log(result.data);
                    // if(type === "BORROW") {
                    //     setSnackbarMessage(`Successfully borrowed [${result.data.iid}] - ${result.data.description.name}.`);
                    // } else if(type === "REPAIR") {
                    //     setSnackbarMessage(`[${result.data.iid}] - ${result.data.description.name} sent for repairs successfully!`);
                    // } else if(type === "DISPOSAL") {
                    //     setSnackbarMessage(`[${result.data.iid}] - ${result.data.description.name} sent for disposal successfully!`);
                    // } else {
                    //     setSnackbarMessage(`Requested [${result.data.iid}] - ${result.data.description.name} sucessfully!`);
                    // }
                    // setSnackbarGreenOpen(true);
                    // handleLog(result.data);
                })
                .catch(error => {
                    console.log(error);
                    // alert("No Data found!");
                    // setSnackbarMessage("No data found!");
                    // setSnackbarRedOpen(true);
                });
            } else {
                // alert("Item not available!");
                // setSnackbarMessage("Item not available!");
                // setSnackbarRedOpen(true);
            }
        })
        .catch(error => {
            console.log(error);
            // alert("No Data found!");
            // setSnackbarMessage("No data found!");
            // setSnackbarRedOpen(true);
        });
    }

    const handleRequest = () => {
        if (type === "REQUEST") {
            handleQuanti();
        } else if (type === "BORROW") {
            handleStatus();
        }else if (type === "REPAIR") {
            handleStatus();
        }else if(type === "DISPOSAL"){
            handleStatus();
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
    }}>
    <Toolbar />
        <Container maxWidth="xs" sx={{ mt: 4 }}>
            <Paper elevation={4}>
            <Box sx={{ p: 1, bgcolor: 'maroon', borderTopLeftRadius: 4, borderTopRightRadius: 4 }} />
            <Box sx={{ p: 4, bgcolor: 'white' }}>
            <Box sx={{ mb: 4 }}>
    <Typography variant="h5" fontWeight="bold" textAlign="center">Request</Typography>
            </Box>
            <Box sx={{ mb: 4 }}>
    <FormControl sx={{ m: 1, minWidth: 316 }}>
            <InputLabel>Type of Request</InputLabel>
            <Select
            id="typeRequest" 
            name="TypeOfRequest"
            label="Type of Request"
            value={type}
            onChange={handleType}
            >
    <MenuItem value="">
        <em>Type of Request</em>
            </MenuItem>
                <MenuItem value="REQUEST">Request</MenuItem>
                <MenuItem value="BORROW">Borrow items</MenuItem>
                <MenuItem value="REPAIR">Out for Repair</MenuItem>
                <MenuItem value="DISPOSAL">Out for disposal</MenuItem>
            </Select>
        </FormControl>
    </Box>
                                        
    <Box sx={{ mb: 2 }}>
        <TextField
            fullWidth
            id="propertyTag"
            name="propertyTag"
            label="Property Tag" 
            variant="outlined"
            onChange={handleId}/> 
        </Box>

        <Box sx={{ mb: 2 }}>
        <TextField
            fullWidth
            id="returned-by"
            name="returnedBy"
            label="Returned By" 
            variant="outlined"
            onChange={handleRemark}/>
        </Box>

    <Box sx={{ mb: 2 }}>
        <TextField
            fullWidth
            id="quanTity"
            name="quantity"
            label="Enter Quantity"
            disabled={type === "BORROW" || type === "REPAIR" || type === "DISPOSAL"}
            onChange={handleNumber}/>
        </Box>
                                        
        <Button
            variant="contained"
            color="warning"
            fullWidth
            sx={{
            bgcolor: '#ffc107',
                '&:hover': { bgcolor: '#ffb300' },
                            fontWeight: 'bold',
                            }}
                            onClick={handleRequest}
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
    );
}
