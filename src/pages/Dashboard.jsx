import { Box, Container, Paper, Toolbar, Typography, Dialog, Divider, DialogTitle, DialogContent, DialogActions, Select, MenuItem, ButtonGroup, FormControl, InputLabel, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@mui/material";
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';


// Register chart.js components
Chart.register(...registerables);

export default function Dashboard({ user, setUser }) {
  const [department, setDepartments] = useState([]);
  const [depItem, setDepItem] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [stat1, setStat1] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");

  const columns = ["PROPERTY TAG", "ACCOUNTABLE PERSON", "DESIGNATION", "DEPARTMENT", "INVOICE NUMBER", "INVOICE DATE",
    "ISSUE ORDER NUMBER", "QUANTITY", "REMAKRS", "STATUS", "SUPPLIER", "TOTAL COST", "UNIT COST", "UNIT OF MEASURE", "LIFESPAN",
    "LOCATION BUILDING", "LOCATION ROOM", "DESCRIPTION NAME", "DESCRIPTION MODEL", "DESCRIPTION TYPE", "SERIAL NUMBER", "DECRIPTION OTHER"];

    const [toBeAssigned, setToBeAssigned] = useState("");
    const fetchToBeAssigned = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/item/getToBeAssigned`);
        setToBeAssigned(response.data);
        
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };
  
    useEffect(() => {
      fetchToBeAssigned();
    }, []);

    const [frequent, setFrequent] = useState([]);
    const fetchFrequent = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/item/frequentlyOrdered`);
        setFrequent(response.data);
        
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    useEffect(() => {
      fetchFrequent();
    }, []);

    const [waiting, setWaiting] = useState([]);
    const fetchWaiting = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/item/waiting`);
        setWaiting(response.data);
        
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    useEffect(() => {
      fetchWaiting();
    }, []);

    const [returned, setReturned] = useState([]);
    const fetchReturned = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/item/toBeReturned`);
        setReturned(response.data);
        
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    useEffect(() => {
      fetchReturned();
    }, []);



    const fetchStats = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/request/getStats`);
      setStat1(response.data);
      if (response.data.length > 0) {
        setSelectedYear(response.data[0][0]); // Set initial selected year
      }
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchDepartment = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/item/dep`);
      const uniqueOptions_department = [...new Set(response.data)];
      setDepartments(uniqueOptions_department);
    } catch (error) {
      console.error("Error fetching departments:", error);
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
      setOpenDialog(true);
    } catch (error) {
      console.error(error);
      alert("Service error");
    } finally {
      setLoading(false);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const calculateAverages = (data) => {
    const monthTotals = {};
    const monthCounts = {};

    data.forEach(([year, month, days]) => {
      const key = `${year}-${month}`;
      if (!monthTotals[key]) {
        monthTotals[key] = 0;
        monthCounts[key] = 0;
      }
      monthTotals[key] += days;
      monthCounts[key] += 1;
    });

    // Add all months, even if no data
    const allMonthsData = monthNames.map((month, index) => {
      const key = `${selectedYear}-${index + 1}`;
      const average = monthTotals[key] ? (monthTotals[key] / monthCounts[key]).toFixed(2) : 0;
      return [month, average];
    });

    return allMonthsData;
  };

  const uniqueYears = [...new Set(stat1.map(item => item[0]))];
  const filteredData = stat1.filter(item => item[0] === selectedYear);
  const averageData = calculateAverages(filteredData);

  const chartData = {
    labels: averageData.map(stat => stat[0]),
    datasets: [
      {
        label: 'Average Days to Get Approved',
        data: averageData.map(stat => stat[1]),
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)',
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    scales: {
      x: {
        ticks: {
          autoSkip: false,
        },
        grid: {
          display: true,
        },
      },
      y: {
        beginAtZero: true,
      },
    },
    elements: {
      bar: {
        barPercentage: 0.5,
        categoryPercentage: 0.8,
      },
    },
  };

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
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
          {/* Select Year Dropdown */}
          <FormControl sx={{ m: 1, minWidth: 160, }}>
            <InputLabel>Select Year</InputLabel>
            <Select
              id="year-select-label"
              name="select-year"
              label="Select Year"
              value={selectedYear}
              onChange={handleYearChange}
              sx={{ bgcolor: 'gray.800', color: 'black' }}
            >
              {uniqueYears.map((year, index) => (
                <MenuItem key={index} value={year}>
                  {year}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* statistics */}
          <Grid container spacing={2}>
            <Grid size={8}>
              <Paper
                sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  height: { xs: 240, sm: 400, md: 400 }, // Adjustable height
                  width: { xs: '100%', sm: '90%', md: '762px' }, // Adjustable width
                }}
              >
                <Bar data={chartData} options={chartOptions} />
              </Paper>
            </Grid>

            {/* Department List */}
            <Grid size={4}
              sx={{
                maxWidth: '300px',
                maxHeight: '2px',
              }}>
              <Paper sx={{ p: 1, overflowY: 'auto', height: 657, ml: 5, }}>
              <ButtonGroup
                orientation="vertical"
                aria-label="Vertical department button group"
                variant="contained"
                color="white"
              >
                <Typography
                  variant="h6"
                  sx={{
                    textAlign: "center",
                    fontWeight: "bold",
                    color: "maroon",
                    py: 1,
                    mb: 1,
                  }}
                >
                  DEPARTMENT
                </Typography>
                <Divider sx={{ marginBottom: 2 }} />
                {loading ? (
                  <Typography
                    sx={{
                      textAlign: 'center',
                      color: 'gray',
                      padding: 2,
                    }}
                  >
                    Loading departments...
                  </Typography>
                ) : department.length === 0 ? (
                  <Typography
                    sx={{
                      textAlign: 'center',
                      color: 'gray',
                      padding: 2,
                    }}
                  >
                    No departments are currently available.
                  </Typography>
                ) : (
                  department.map((item, index) => (
                    <Button
                      key={index}
                      sx={{
                        minWidth: '300px',
                        minHeight: '40px',
                        backgroundColor: '#8c383e',
                        color: 'white',
                        '&:hover': {
                          backgroundColor: '#732c33',
                        },
                      }}
                      onClick={() => handleDepItems(item)}
                      aria-label={`Button for ${item}`}
                      disabled={loading}
                    >
                      {item}
                    </Button>
                  ))
                )}
              </ButtonGroup>
                 </Paper>
               </Grid>

            {/* Frequently Ordered Items */}
            <Grid container spacing={2} justifyContent="center">
              <Grid item xs={12} sm={6} md={4}>
                <Paper
                  sx={{
                    p: 3, 
                    display: 'flex', 
                    flexDirection: 'column', 
                    height: 240, 
                    width: 305, 
                    backgroundColor: '#f9f9f9', 
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', 
                    borderRadius: '12px'
                  }}
                >
                  <Typography
                    variant="h7"
                    sx={{
                      textAlign: "center",
                      fontWeight: "Bold",
                      color: "maroon",
                      borderBottom: '1px solid #ddd',
                      marginBottom: 1,
                    }}
                  >
                    <ShoppingBagIcon sx={{ mb: -0.6, mr: 0.6 }} /> 
                    Frequently Ordered Items
                  </Typography>
                  {frequent.length === 0 ? (
                    <Typography
                      sx={{
                        textAlign: 'center',
                        fontSize: '1rem',
                        color: 'gray',
                        padding: 2,
                      }}
                    >
                      No frequently ordered item(s) are available.
                    </Typography>
                  ) : (
                    frequent.map((order, index) => (
                      <Typography
                        key={index}
                        sx={{
                          paddingBottom: 1,
                          fontSize: '1rem',
                          color: 'maroon',
                          fontWeight: 500,
                          display: 'flex',
                          justifyContent: 'space-between',
                        }}
                      >
                        <span style={{ color: 'black' }}>{order[0]}</span>
                        <span style={{ color: 'maroon' }}>({order[1]})</span>
                      </Typography>
                    ))
                  )}
                </Paper>
              </Grid>
            </Grid>

            {/* Recent Orders */}

            <Grid size={4}>
              <Paper 
              sx={{ 
              p: 3, 
              display: 'flex', 
              flexDirection: 'column', 
              height: 240, 
              width: 440, 
              backgroundColor: '#f9f9f9', 
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', 
              borderRadius: '12px' 
              }}>
              <Typography
                  variant="h6"
                  sx={{
                    textAlign: "center",
                    fontWeight: "Bold",
                    color: "maroon",
                    borderBottom: '1px solid #ddd',
                    marginBottom: 2,
                    mt: -1,
                  }}
                >
                <NotificationsActiveIcon sx={{ mb: -0.6, mr: 0.6 }} /> 
                  Reminders
                </Typography>
                <Typography sx={{ paddingBottom: 1, fontSize: '1rem', color: 'black', }}><strong>
                  Items to be assigned: <span style={{ color: 'maroon' }}>{toBeAssigned}</span></strong>
                  <p></p>
                </Typography>
                <Typography sx={{ paddingBottom: 1, fontSize: '1rem', color: 'black ' }}><strong>
                  Items to be accepted/denied by Accountable Person: <span style={{ color: 'maroon' }}>{waiting}</span></strong>
                  <p></p>
                </Typography>
                <Typography sx={{ fontSize: '1rem', color: 'black' }}><strong>
                  Items to be returned: <span style={{ color: 'maroon' }}>{returned}</span></strong>
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Dialog for displaying department items */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="lg" fullWidth>
        <DialogTitle sx={{ textAlign: 'center', fontWeight: 'bold', color: 'black' }}>
          Departmental Information
        </DialogTitle>
        <DialogContent>
          {depItem && depItem.length > 0 ? (
            <TableContainer component={Paper}>
              <Table size="small" stickyHeader aria-label="Departmental table">
                <TableHead>
                  <TableRow style={{ position: 'sticky', top: 0, backgroundColor: '#1976d2', color: '#ffffff', zIndex: 1 }}>
                    {columns.map((column, index) => (
                      <TableCell
                        key={index}
                        style={{ color: 'black', fontWeight: 'bold', backgroundColor: '#eeeeee' }}
                      >
                        {column}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {depItem.map((selectedItem, index) => (
                    <TableRow
                      key={index}
                      style={{
                        backgroundColor: 'white',
                        transition: 'background-color 0.3s ease',
                      }}
                      onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#e0e0e0'}
                      onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'white'}
                    >
                      <TableCell>{selectedItem.iid || 'N/A'}</TableCell>
                      <TableCell>{selectedItem.accPerson ? `${selectedItem.accPerson.fname} ${selectedItem.accPerson.lname}` : "N/A"}</TableCell>
                      <TableCell>{selectedItem.designation || 'N/A'}</TableCell>
                      <TableCell>{selectedItem.department || 'N/A'}</TableCell>
                      <TableCell>{selectedItem.invoiceNumber || 'N/A'}</TableCell>
                      <TableCell>{selectedItem.invoiceDate || 'N/A'}</TableCell>
                      <TableCell>{selectedItem.issueOrder || 'N/A'}</TableCell>
                      <TableCell>{selectedItem.quantity || 'N/A'}</TableCell>
                      <TableCell>{selectedItem.remarks || 'N/A'}</TableCell>
                      <TableCell>{selectedItem.status || 'N/A'}</TableCell>
                      <TableCell>{selectedItem.supplier || 'N/A'}</TableCell>
                      <TableCell>{`₱ ${selectedItem.unitCost?.toLocaleString() || 'N/A'}`}</TableCell>
                      <TableCell>{`₱ ${selectedItem.totalCost?.toLocaleString() || 'N/A'}`}</TableCell>
                      <TableCell>{selectedItem.unitOfMeasurement || 'N/A'}</TableCell>
                      <TableCell>{selectedItem.lifespan || 'N/A'}</TableCell>
                      <TableCell>{selectedItem.location?.building || 'N/A'}</TableCell>
                      <TableCell>{selectedItem.location?.room || 'N/A'}</TableCell>
                      <TableCell>{selectedItem.description?.name || 'N/A'}</TableCell>
                      <TableCell>{selectedItem.description?.model || 'N/A'}</TableCell>
                      <TableCell>{selectedItem.description?.type || 'N/A'}</TableCell>
                      <TableCell>{selectedItem.description?.serialNumber || 'N/A'}</TableCell>
                      <TableCell>{selectedItem.description?.other || 'N/A'}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Typography>No items available</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
