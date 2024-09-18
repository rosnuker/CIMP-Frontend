import { Box, Container, Paper, Toolbar, Typography, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from "@mui/material";
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
  const [openDialog, setOpenDialog] = useState(false); // State for dialog

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

      console.log("Fetched Data: ", result.data); // Log the data structure for debugging
      setDepItem(result.data); 
      setOpenDialog(true); // Open the dialog with fetched data
      //alert(JSON.stringify(result.data)); 
    } catch (error) {
      console.error(error);
      alert("Service error");
    } finally {
      setLoading(false);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false); // Close the dialog
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
