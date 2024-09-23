import { Box, Container, Paper, Toolbar, Typography, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Button } from "@mui/material";
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

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
  const [selectedYear, setSelectedYear] = useState("");

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
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
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
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
                <InputLabel id="year-select-label">Select Year</InputLabel>
                <Select
                  labelId="year-select-label"
                  value={selectedYear}
                  onChange={handleYearChange}
                >
                  {uniqueYears.map((year, index) => (
                    <MenuItem key={index} value={year}>
                      {year}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <Paper
                sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  height: 240,
                }}
              >
                <Bar data={chartData} options={chartOptions} />
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

            <Grid item xs={12}>
              <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                {/* Additional content can go here */}
              </Paper>
            </Grid>
          </Grid>
          <Copyright sx={{ pt: 4 }} />
        </Container>
      </Box>

      {/* Dialog for displaying department items */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Department Items</DialogTitle>
        <DialogContent>
          {depItem && depItem.length > 0 ? (
            depItem.map((selectedItem, index) => (
              <div key={index} style={{ marginBottom: '16px' }}>
                {[ 
                  { label: 'Property Tag', value: selectedItem.iid },
                  { label: 'Account Person', value: selectedItem.accPerson },
                  { label: 'Department', value: selectedItem.department },
                  { label: 'Designation', value: selectedItem.designation },
                  { label: 'Invoice Date', value: selectedItem.invoiceDate },
                  { label: 'Invoice Number', value: selectedItem.invoiceNumber },
                  { label: 'Issue Order', value: selectedItem.issueOrder },
                  { label: 'Supplier', value: selectedItem.supplier },
                  { label: 'Lifespan', value: selectedItem.lifespan },
                  { label: 'Unit of Measurement', value: selectedItem.unitOfMeasurement },
                  { label: 'Quantity', value: selectedItem.quantity },
                  { label: 'Unit Cost', value: `₱ ${selectedItem.unitCost.toLocaleString()}` },
                  { label: 'Total Cost', value: `₱ ${selectedItem.totalCost.toLocaleString()}` },
                  { label: 'Status', value: selectedItem.status },
                  { label: 'Remarks', value: selectedItem.remarks },
                  { label: 'Building', value: selectedItem.location?.building },
                  { label: 'Room', value: selectedItem.location?.room },
                  { label: 'Description Name', value: selectedItem.description?.name },
                  { label: 'Model', value: selectedItem.description?.model },
                  { label: 'Type', value: selectedItem.description?.type },
                  { label: 'Serial Number', value: selectedItem.description?.serialNumber },
                  { label: 'Other', value: selectedItem.description?.other },
                ].map((field, fieldIndex) => (
                  <TextField
                    key={fieldIndex}
                    label={field.label}
                    value={field.value || 'N/A'}
                    fullWidth
                    InputProps={{
                      readOnly: true,
                    }}
                    variant="outlined"
                    margin="dense"
                    style={{ marginBottom: '8px' }}
                  />
                ))}
              </div>
            ))
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
