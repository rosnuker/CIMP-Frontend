import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Box, Typography, Grid, TextField, Button, Paper, Divider } from '@mui/material';

const OverlayItem = ({ showOverlay, selectedItem, setSelectedItem, handleUpdate, handleQuantityChange, handleUnitCostChange, handleCloseOverlay, handleOpenDialog, handleCloseDialog, openDialog, handleDelete }) => {

  const handleInputChange = (key, value) => {
    setSelectedItem((prevSelectedItem) => {
      const keys = key.split('.');
      const updatedItem = { ...prevSelectedItem };
      let nestedObject = updatedItem;

      for (let i = 0; i < keys.length - 1; i++) {
        const currentKey = keys[i];
        nestedObject[currentKey] = { ...nestedObject[currentKey] };
        nestedObject = nestedObject[currentKey];
      }

      nestedObject[keys[keys.length - 1]] = value; 
      return updatedItem;
    });
  };

  return (
    <>
      {showOverlay && selectedItem && (
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
            zIndex: 1300,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}
        >
          <Paper
            sx={{
              padding: 4,
              maxWidth: 1200,
              width: '90%',
              backgroundColor: 'background.paper',
              borderRadius: 2,
            }}
          >
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
              Edit Item
            </Typography>
            <Divider sx={{ marginBottom: 2 }} />

            <form onSubmit={handleUpdate}>
              <Grid container spacing={2}>
                {[
                  { label: 'Accountable Person', value: selectedItem.accPerson, key: 'accPerson' },
                  { label: 'Department', value: selectedItem.department, key: 'department' },
                  { label: 'Designation', value: selectedItem.designation, key: 'designation' },
                  { label: 'Invoice Number', value: selectedItem.invoiceNumber, key: 'invoiceNumber' },
                  { label: 'Invoice Date', value: selectedItem.invoiceDate, key: 'invoiceDate' },
                  { label: 'Issue Order', value: selectedItem.issueOrder, key: 'issueOrder', },
                  { label: 'Lifespan', value: selectedItem.lifespan, key: 'lifespan' },
                  { label: 'Quantity', value: selectedItem.quantity, key: 'quantity', onChange: handleQuantityChange },
                  { label: 'Remarks', value: selectedItem.remarks, key: 'remarks' },
                  { label: 'Status', value: selectedItem.status, key: 'status' },
                  { label: 'Supplier', value: selectedItem.supplier, key: 'supplier' },
                  { label: 'Total Cost', value: selectedItem.totalCost ? `₱ ${selectedItem.totalCost.toLocaleString()}` : '', key: 'totalCost', readOnly: true },
                  { label: 'Unit Cost', value: selectedItem.unitCost ? `₱ ${selectedItem.unitCost.toLocaleString()}` : '', key: 'unitCost', onChange: handleUnitCostChange },
                  { label: 'Unit of Measurement', value: selectedItem.unitOfMeasurement, key: 'unitOfMeasurement' },
                  { label: 'Description Name', value: selectedItem.description?.name, key: 'description.name' },
                  { label: 'Description Model', value: selectedItem.description?.model, key: 'description.model' },
                  { label: 'Description Serial Number', value: selectedItem.description?.serialNumber, key: 'description.serialNumber' },
                  { label: 'Description Type', value: selectedItem.description?.type, key: 'description.type' },
                  { label: 'Description Other', value: selectedItem.description?.other, key: 'description.other' },
                  { label: 'Location Building', value: selectedItem.location?.building, key: 'location.building' },
                  { label: 'Location Room', value: selectedItem.location?.room, key: 'location.room' },
                ].map(({ label, value, key, onChange, readOnly }) => (
                  <Grid item xs={12} sm={6} md={2} key={key}>
                    <TextField
                      fullWidth
                      label={label}
                      value={value || ''}
                      onChange={onChange || ((e) => handleInputChange(key, e.target.value))}
                      InputProps={{ readOnly: readOnly || false }}
                      variant="outlined"
                      required={!readOnly}
                      sx={{
                        backgroundColor: 'background.paper',
                        borderRadius: 2,
                        // marginTop: 2,
                        borderColor: 'grey.300',
                      }}
                    />
                  </Grid>
                ))}
              </Grid>

              <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 3 }}>
                <Box>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{ marginRight: 2 }}
                  >
                    Update
                  </Button>
                  <Button
                    onClick={handleCloseOverlay}
                    variant="contained"
                    sx={{
                      marginRight: 2,
                      backgroundColor: '#e0e0e0',   
                      color: '#fafafa', 
                      '&:hover': {
                        backgroundColor: '#9e9e9e',
                      },
                    }}
                  >
                    Cancel
                  </Button>
                </Box>
                <Button
                  type="button"
                  onClick={handleOpenDialog}
                  variant="contained"
                  color="error"
                >
                  Delete
                </Button>
              </Box>
            </form>
          </Paper>
        </Box>
      )}

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Confirm Changes</DialogTitle>
        <DialogContent>
          <DialogContentText>Are you sure you want to confirm?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="warning"
            onClick={handleDelete}
          >
            Confirm
          </Button>
          <Button
            variant="outlined"
            color="warning"
            onClick={handleCloseDialog}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default OverlayItem;
