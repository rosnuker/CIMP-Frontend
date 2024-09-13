import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@mui/material";
import PrintIcon from '@mui/icons-material/Print';
import { Container, Box, Toolbar, TextField, InputAdornment, IconButton, TableContainer, TableHead, TableRow, Paper, Table, TableBody, TableCell, } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Overlay from '../page-overlay/Overlay';

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

export default function Search( {user, setUser} ) {

    const [search, setSearch] = useState("");
    const [queryResults, setQueryResults] = useState([])
    const [selectedItem, setSelectedItem] = useState({});
    const [showOverlay, setShowOverlay] = useState(false);
    
    const address = getIpAddress();
	
	function getIpAddress() {
		const hostname = window.location.hostname;

		const indexOfColon = hostname.indexOf(':');

		if(indexOfColon !== -1) {
			return hostname.substring(0, indexOfColon);
		}

		return hostname;
	}

    const handleSearch = event =>{
        setSearch(event.target.value);
    }

    const handleFetchSearch = () =>{
        axios.get(`http://${address}:8080/item/search`,{
            params: {
                search: search
            }
        })
        .then(result => {
            setQueryResults(result.data)
         })
         .catch(error => {
            console.log(error)
            alert("service error")
         })
    }

    useEffect(() => {
        const fetchItemsData = async () => {
            try {
                const response = await axios.get(
                    `http://${address}:8080/item/getAllItems`
                );
                setQueryResults(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
    
        fetchItemsData();
      }, []);

    const handlePrintTable = () => {
        const printableContent = generatePrintableTable();
        const printWindow = window.open('', '_blank');
        printWindow.document.write(printableContent);
        printWindow.document.close();
        printWindow.print();
    }

    const generatePrintableTable = () => {
        let printableContent = `
            <style>
                table {
                    border-collapse: collapse;
                    width: 100%;
                }
                th, td {
                    border: 1px solid #dddddd;
                    text-align: left;
                    padding: 8px;
                }
                th {
                    background-color: #f2f2f2;
                }
            </style>
            <table>
                <thead>
                    <tr>
                        <th>Quantity</th>
                        <th>Unit</th>
                        <th>Description</th>
                        <th>Remarks</th>
                        
                    </tr>
                </thead>
                <tbody>
        `;
        queryResults.forEach(item => {
            printableContent += `
                <tr>
                    <td>${item.quantity}</td>
                    <td>${item.unitOfMeasurement}</td>
                    <td>${item.description ? item.description.name : 'None'}</td>
                    <td>${item.remarks}</td>
                </tr>
            `;
        });
        printableContent += `
                </tbody>
            </table>
        `;
        return printableContent;
    }

    const columnHeaders = [
        'Property Tag',
        'Invoice Number',
        'Issue Order Number',
        'Serial Number'
      ];

      const renderTableHeader = () => (
        <TableRow style={{ position: 'sticky', top: 0 }}>
          {columnHeaders.map((header) => (
            <TableCell key={header} style={{ padding: '16px', fontWeight: 'bold', color: 'black', backgroundColor: '#eeeeee', }}> 
              {header} 
            </TableCell> //color sa table header
          ))}
        </TableRow>
      );

    // const handleRowClick = (item) => {
    //     setSelectedItem(item);
    //     setShowOverlay(true);
    //     //setQueryResults(item);
    //     //const url = `/viewAll?${createSearchParams({ id: item.iid }).toString()}`;
      
    //       // Programmatically navigate to the URL
    //       //window.open(url, '_blank');
    //   };

    //   const handleCloseOverlay = () => {
    //     setShowOverlay(false);
    //     setSelectedItem({}); // Reset selectedItem to an empty object
    //   };

    const handleRowClick = (item) => {
        setSelectedItem(item);
        setShowOverlay(true);
      };
    
      const handleCloseOverlay = () => {
        setShowOverlay(false);
        setSelectedItem({}); // Reset selectedItem to an empty object
      };

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
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4, }}>
          <Box sx={{ ml: 0, mt: 7 }}>
      <TextField
        variant="outlined"
        placeholder="Search"
        onChange={handleSearch}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton 
              onClick={handleFetchSearch}
              >
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
        sx={{
          backgroundColor: 'grey.600',
          borderRadius: 'round',
          '& .MuiOutlinedInput-root': {
            padding: '0 8px',
          },
          '& .MuiInputBase-input': {
            padding: '8px',
            fontSize: '0.875rem',
          },
        }}
      />
    <Button
        variant="contained"
        sx={{
            bgcolor: '#ffc107',
            color: 'black', // Set text color to black
            '&:hover': { bgcolor: '#ffb300' },
            fontWeight: 'normal',
            ml: 2,
            }}
        onClick={handlePrintTable}
        >
            Print <PrintIcon />
        </Button>
        
    <TableContainer component={Paper} style={{ maxHeight: '340px', marginLeft: '1px', marginRight: '4px', marginTop: '30px' }}>
        <Table size="small" stickyHeader aria-label="logs table">
            <TableHead>
        {renderTableHeader()}
            </TableHead>
        <TableBody>
        {queryResults.map((item) => 
        !item.deleted && (
            <TableRow
                key={item.iid}
                onClick={() => handleRowClick(item)}                
                style={{
                backgroundColor: 'white',
            //  transition: 'background-color 0.3s ease', // optional nlang ni transition effect sa hover
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'gray'} // hover
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'white'} // Revert 
                >
                <TableCell>{item.iid}</TableCell>
                <TableCell>{item.invoiceNumber}</TableCell>
                <TableCell>{item.issueOrder}</TableCell>
                <TableCell>
                    {item.description ? (
                <div>
                    <p>{item.description.serialNumber}</p>
                </div>
                    ) : (
                <div>None</div>
                )}
                </TableCell>
            </TableRow>
                ))}
            </TableBody>
                </Table>
                </TableContainer>
            <Overlay
                showOverlay={showOverlay}
                selectedItem={selectedItem}
                handleCloseOverlay={handleCloseOverlay}
                />
                </Box>    
            </Container>
          </Box>       
        </>
    );
}
