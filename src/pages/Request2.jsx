import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@mui/material";
import PrintIcon from '@mui/icons-material/Print';
import { Container, Box, Toolbar, TextField, InputAdornment, IconButton, TableContainer, TableHead, TableRow, Paper, Table, TableBody, TableCell, } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Overlay from '../page-overlay/Overlay';
import * as XLSX from 'xlsx';

export default function Request2() {
    const [search, setSearch] = useState("");
    const [queryResults, setQueryResults] = useState([]);
    const [selectedItem, setSelectedItem] = useState({});
    const [showOverlay, setShowOverlay] = useState(false);
    const [requets, setRequets] = useState([]); // Changed initial value to empty array
    const [itemId, setItemId] = useState("");
    const [quantity, setQuantity] = useState(""); // New state for quantity

    const address = getIpAddress();

    function getIpAddress() {
        const hostname = window.location.hostname;
        const indexOfColon = hostname.indexOf(':');
        return indexOfColon !== -1 ? hostname.substring(0, indexOfColon) : hostname;
    }

    const handleSearch = event => {
        setSearch(event.target.value);
    }

    const handleFetchSearch = () => {
        axios.get(`http://${address}:8080/item/search`, {
            params: { search }
        })
            .then(result => setQueryResults(result.data))
            .catch(error => {
                console.log(error);
                alert("service error");
            });
    }

    useEffect(() => {
        const fetchItemsData = async () => {
            try {
                const response = await axios.get(`http://${address}:8080/item/getAllItems`);
                setQueryResults(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchItemsData();
    }, []);

    const columnHeaders = [
        'Property Tag',
        'Invoice Number',
        'Issue Order Number',
        'Serial Number',
        'Quantity'
    ];

    const renderTableHeader = () => (
        <TableRow style={{ position: 'sticky', top: 0 }}>
            {columnHeaders.map((header) => (
                <TableCell key={header} style={{ padding: '16px', fontWeight: 'bold', color: 'black', backgroundColor: '#eeeeee' }}>
                    {header}
                </TableCell>
            ))}
        </TableRow>
    );

    const handleRowClick = (item) => {
        setSelectedItem(item);
        setShowOverlay(true);
        setItemId(item.iid);
    };

    const handleCloseOverlay = () => {
        setShowOverlay(false);
        setSelectedItem({});
    };

    const handleAdd = () => {
        if (itemId && quantity) {
            setRequets(prevRequests => [...prevRequests, { itemId, quantity }]);
            setItemId(""); // Clear the itemId after adding
            setQuantity(""); // Clear the quantity after adding
        } else {
            alert("Please enter both item ID and quantity.");
        }
    };

    return (
        <>
            <Box
                component="main"
                sx={{
                    backgroundColor: (theme) => theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900],
                    flexGrow: 1,
                    height: '100vh',
                    overflow: 'auto',
                }}
            >
                <Toolbar />
                <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                    <Box sx={{ ml: 0, mt: 7 }}>
                        <TextField
                            variant="outlined"
                            placeholder="Search"
                            onChange={handleSearch}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={handleFetchSearch}>
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
                                                style={{ backgroundColor: 'white' }}
                                                onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'gray'}
                                                onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'white'}
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
                                                <TableCell>{item.quantity}</TableCell>
                                            </TableRow>
                                        ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                </Container>
                <Container>
                    <TextField
                        variant="outlined"
                        value={itemId}
                        onChange={(e) => setItemId(e.target.value)}
                        placeholder="Item ID"
                    />
                    <TextField
                        variant="outlined"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        placeholder="Quantity"
                        type="number" // Optional, if you want to restrict to numbers
                    />
                    <Button onClick={handleAdd}>Add</Button>
                </Container>

                <Container>
                    <h3>Requests</h3>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Item ID</TableCell>
                                    <TableCell>Quantity</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {requets.map((request, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{request.itemId}</TableCell>
                                        <TableCell>{request.quantity}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Container>

            </Box>
        </>
    );
}
