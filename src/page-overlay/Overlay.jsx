import React from 'react';
import { Box, Typography, Grid, Paper, Button, Divider } from '@mui/material';

const Overlay = ({ showOverlay, selectedItem, handleCloseOverlay }) => {
  if (!showOverlay || !selectedItem) return null;

  const renderDetail = (label, value) => (
    <Grid item xs={12} sm={6} md={2} key={label}>
      <Typography variant="body2" component="div" sx={{ fontWeight: 600 }}>
        {label}:
      </Typography>
      <Box
        sx={{
          padding: '8px 12px',
          backgroundColor: 'background.paper',
          borderRadius: 2,
          border: 1,
          borderColor: 'grey.300',
          mt: 0.5,
        }}
      >
        {value || 'No data available'}
      </Box>
    </Grid>
  );

  const details = [
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
  ];

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 1300,
      }}
    >
      <Paper sx={{ padding: 4, maxWidth: 1200, width: '90%' }}>
        <Typography
          variant="h6"
          sx={{
            textAlign: 'center',
            fontWeight: 'bold',
            color: 'maroon',
            backgroundColor: 'yellow',
            paddingY: 1,
            marginBottom: 3,    
          }}
      >
          FULL INFORMATION
        </Typography>
        <Divider sx={{ marginBottom: 2 }} />
        <Grid container spacing={2}>
          {details.map(({ label, value }) => renderDetail(label, value))}
        </Grid>
        <Button
          onClick={handleCloseOverlay}
          variant="contained"
          sx={{ marginTop: 3, 
                marginLeft: 'auto', 
                display: 'block',
                backgroundColor: '#e0e0e0',   
                color: '#fafafa', 
                '&:hover': {
                backgroundColor: '#9e9e9e', 
            },
              }}
        > 
          Cancel
        </Button>
      </Paper>
    </Box>
  );
};

export default Overlay;
