import { Box, Container, Paper, Toolbar, Typography, Dialog, Divider, DialogTitle, DialogContent, DialogActions, Select, MenuItem, FormControl, InputLabel, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Button } from "@mui/material";
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { Pie } from 'react-chartjs-2';


// Register chart.js components
Chart.register(...registerables);

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

export default function Dashboard({ user, setUser }) {
  const [department, setDepartments] = useState([]);
  const [depItem, setDepItem] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [stat1, setStat1] = useState([]);
  const [stat2, setStat2] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");

  const columns = ["PROPERTY TAG", "ACCOUNTABLE PERSON", "DESIGNATION", "DEPARTMENT", "INVOICE NUMBER", "INVOICE DATE",
    "ISSUE ORDER NUMBER", "QUANTITY", "REMAKRS", "STATUS", "SUPPLIER", "TOTAL COST", "UNIT COST", "UNIT OF MEASURE", "LIFESPAN",
    "LOCATION BUILDING", "LOCATION ROOM", "DESCRIPTION NAME", "DESCRIPTION MODEL", "DESCRIPTION TYPE", "SERIAL NUMBER", "DECRIPTION OTHER"];

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

  const fetchStats2 = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/item/getStats2`);
      setStat2(response.data);
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  useEffect(() => {
    fetchStats2();
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

            {/* Department  */}
            <Grid size={4}
              sx={{
                maxWidth: '350px',
                maxHeight: '2px',
              }}>
              <Paper sx={{ p: 1, overflowY: 'auto', height: 658, }}>
                <Typography
                  variant="h6"
                  sx={{
                    textAlign: "center",
                    fontWeight: "Bold",
                    color: "maroon",
                    backgroundColor: "",
                    paddingY: 1,
                    marginBottom: 1,
                  }}
                >
                  DEPARTMENT
                </Typography>
                <Divider sx={{ marginBottom: 2 }} />
                {department.map((item, index) => (
                  <Button
                    key={index}
                    variant="contained"
                    color="primary"
                    sx={{
                      margin: '8px',
                      minWidth: '300px',
                      minHeight: '40px',
                      width: 'auto',
                      height: 'auto',
                      padding: '8px 16px'
                    }}
                    onClick={() => handleDepItems(item)}
                    aria-label={`Button for ${item}`}
                    disabled={loading}
                  >
                    {item}
                  </Button>
                ))}
              </Paper>
            </Grid>


            {/* Recent wako kahibaw */}
            <Grid size={4}>
              <Paper
                sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  height: 250,
                  marginBottom: 1,
                }}
              >
                <Typography
                  variant="h7"
                  sx={{
                    textAlign: "center",
                    fontWeight: "Bold",
                    color: "maroon",
                    paddingY: 1,
                    marginBottom: 1,
                  }}
                >
                  Pie Chart
                </Typography>
                <Pie
                  data={{
                    labels: stat2.map(item => item[0]), // Department names
                    datasets: [{
                      data: stat2.map(item => item[1]), // Counts
                      backgroundColor: ['red', 'blue', 'green', 'yellow'], // Customize as needed
                    }]
                  }}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                  }}
                />
              </Paper>
            </Grid>

            {/* Recent Orders */}

            <Grid size={4}>
              <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', height: 240, }}>
                {/* <Orders /> */}
              </Paper>
            </Grid>
          </Grid>
          <Copyright sx={{ pt: 4 }} />
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
                      <TableCell>{selectedItem.accPerson || 'N/A'}</TableCell>
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
