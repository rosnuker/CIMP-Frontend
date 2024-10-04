import { Box, Container, Grid, IconButton, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Toolbar, Button } from "@mui/material";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { useEffect, useState } from "react";
import axios from "axios";

export default function UserDashboard({ user, setUser }) {
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(null);
	
  const columns = ["PROPERTY TAG", "NAME", "INVOICE NUMBER", "INVOICE DATE", "ISSUE ORDER NUMBER", "QUANTITY", "REMARKS", "SUPPLIER", "TOTAL COST", "UNIT COST", "LIFESPAN", "STATUS", "ACTIONS", "ACTIONS"];
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
					`http://${address}:8080/item/accPerson/${user.uid}`
				);
				setData(response.data);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		fetchData();
	}, [loader]);

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
                        style={{ padding: '10px', fontWeight: '600', color: 'black', backgroundColor: '#eeeeee' }}
                      >
                        {column}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((item) => (
                    !item.deleted && (
                      <TableRow
                        key={item.iid}
                        style={{
                          backgroundColor: 'white',
                          transition: 'background-color 0.3s ease',
                        }}
                        // onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'gray'}
                        // onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'white'}
                      >
                        <TableCell>{item.iid}</TableCell>
                        <TableCell>{item.description.name}</TableCell>
                        <TableCell>{item.invoiceNumber}</TableCell>
                        <TableCell>{item.invoiceDate}</TableCell>
                        <TableCell>{item.issueOrder}</TableCell>
                        <TableCell>{item.quantity} {item.unitOfMeasurement}</TableCell>
                        <TableCell>{item.remarks}</TableCell>
                        <TableCell>{item.supplier}</TableCell>
                        <TableCell>₱{item.totalCost.toLocaleString()}</TableCell>
                        <TableCell>₱{item.unitCost.toLocaleString()}</TableCell>
                        <TableCell>{item.lifespan}</TableCell>
                        <TableCell>{item.status}</TableCell>
                        <TableCell>
                          <Button variant="contained" color="success" startIcon={<CheckCircleOutlineIcon />}
                          sx={{ width: '110px' }} 
                           >
                            Approve
                          </Button>
                      </TableCell>
                      <TableCell>
                          <Button variant="contained" color="error" startIcon={<RemoveCircleOutlineIcon />}>
                            Reject
                          </Button>
                      </TableCell>
                      </TableRow>
                    )
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Container>
        </Box>	
    </>
  );
}
