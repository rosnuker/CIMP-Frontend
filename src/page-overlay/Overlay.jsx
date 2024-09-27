import React from 'react';
import { Box, Typography, TextField, Button, Paper, Divider, } from '@mui/material';
import Grid from "@mui/material/Grid2";

const OverlayItem = ({ showOverlay, selectedItem, handleCloseOverlay }) => {
  
const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleCloseOverlay(); // close the modal
    }
  };

  return (
    <>

    {showOverlay && selectedItem && (
      <Box
        onClick={handleBackdropClick}
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
         onClick={(e) => e.stopPropagation()} 
          sx={{
            padding: 4,
            maxWidth: 1200,
            width: '90%',
            backgroundColor: 'background.paper',
            borderRadius: 2,
            maxHeight: '90vh',
            overflowY: 'auto',
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
            FULL INFORMATION
          </Typography>
          <Divider sx={{ marginBottom: 2 }} />
              
              {/* Accountability Information */}

                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 2 }}>
                  Accountability Information
                </Typography>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid size={2.6}>
                <TextField
                  label="Accountable Person"
                  value={selectedItem.accPerson || ''}
                  slotProps={{
                    input: {
                      readOnly: true,
                    },
                  }}
                />
              </Grid>
              <Grid size={2.6}>
                <TextField
                  label="Department"
                  value={selectedItem.department || ''}
                  slotProps={{
                    input: {
                      readOnly: true,
                    },
                  }}
                />
              </Grid>
              <Grid size={2.6}>
                <TextField
                  label="Designation"
                  value={selectedItem.designation || ''}
                  slotProps={{
                    input: {
                      readOnly: true,
                    },
                  }}
                />
              </Grid>
              </Grid>

              <Divider sx={{ my: 3 }} />

              {/* Location Information */}

                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 2 }}>
                  Location Information
                </Typography>
              <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
              <Grid size={2.6}>
                <TextField
                  label="Inventory Location"
                  value={selectedItem.location?.building || ''}
                  slotProps={{
                    input: {
                      readOnly: true,
                    },
                  }}
                />
              </Grid>
              <Grid size={2.6}>
                <TextField
                  label="Location Room"
                  value={selectedItem.location?.room || ''}
                  slotProps={{
                    input: {
                      readOnly: true,
                    },
                  }}
                />
              </Grid>
              </Grid>
              
             <Divider sx={{ my: 3 }} />

              {/* Invoice Information */}

                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 2 }}>
                  Invoice Information
                </Typography>
              <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
              <Grid size={2.6}>
                <TextField
                  label="Invoice Number"
                  value={selectedItem.invoiceNumber || ''}
                  slotProps={{
                    input: {
                      readOnly: true,
                    },
                  }}
                />
              </Grid>
              <Grid size={2.6}>
                <TextField
                  label="Invoice Date"
                  type="text"
                  value={selectedItem.invoiceDate || ''}
                  slotProps={{
                    input: {
                      readOnly: true,
                    },
                  }}
                />
              </Grid>
              <Grid size={2.6}>
                <TextField
                  label="Issue Order"
                  value={selectedItem.issueOrder || ''}
                  slotProps={{
                    input: {
                      readOnly: true,
                    },
                  }}
                />
              </Grid>
              </Grid>

              <Divider sx={{ my: 3 }} />
              
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 2 }}>
                  Item Information
                </Typography>
              <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
              <Grid size={2.6}>
                <TextField
                  label="Unit of Measurement"
                  value={selectedItem.unitOfMeasurement || ''}
                  slotProps={{
                    input: {
                      readOnly: true,
                    },
                  }}
                />
              </Grid>
              <Grid size={2.6}>
                <TextField
                  label="Quantity"
                  value={selectedItem.quantity || ''}
                  slotProps={{
                    input: {
                      readOnly: true,
                    },
                  }}
                />
              </Grid>
              <Grid size={2.6}>
                <TextField
                  label="Lifespan"
                  value={selectedItem.lifespan || ''}
                  slotProps={{
                    input: {
                      readOnly: true,
                    },
                  }}
                />
              </Grid>

              <Grid size={2.6}>
                <TextField
                  label="Supplier"
                  value={selectedItem.supplier || ''}
                  slotProps={{
                    input: {
                      readOnly: true,
                    },
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
              <TextField
                label="Remarks"
                value={selectedItem.remarks}
                slotProps={{
                  input: {
                    readOnly: true,
                  },
                }}
                sx={{ mt: 2 }} 
              />
              </Grid>
              </Grid>

              <Divider sx={{ my: 3 }} />

            {/* Cost and Description Information */}

              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 2 }}>
                Cost Information
              </Typography>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>  
            <Grid size={2.6}>
              <TextField
                label="Unit Cost"
                value={selectedItem.unitCost ? `₱ ${selectedItem.unitCost.toLocaleString()}` : ''}
                slotProps={{
                  input: {
                    readOnly: true,
                  },
                }}
              />
            </Grid>
            <Grid size={2.6}>
              <TextField
                label="Total Cost"
                value={selectedItem.totalCost ? `₱ ${selectedItem.totalCost.toLocaleString()}` : ''}
                slotProps={{
                  input: {
                    readOnly: true,
                  },
                }}
              />
            </Grid>
            </Grid>

             <Divider sx={{ my: 3 }} />

              {/* Description Details */}

                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 2 }}>
                  Description Details
                </Typography>
              <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
              <Grid size={2.6}>
                <TextField
                  label="Description Name"
                  value={selectedItem.description?.name || ''}
                  slotProps={{
                    input: {
                      readOnly: true,
                    },
                  }}
                />
              </Grid>
              <Grid size={2.6}>
                <TextField          
                  label="Description Model"
                  value={selectedItem.description?.model || ''}
                  slotProps={{
                    input: {
                      readOnly: true,
                    },
                  }}
                />
              </Grid>
              <Grid size={2.6}>
                <TextField
                  label="Description Serial Number"
                  value={selectedItem.description?.serialNumber || ''}
                  slotProps={{
                    input: {
                      readOnly: true,
                    },
                  }}
                />
              </Grid>
              <Grid size={2.6}>
              <TextField
                label="Description Type"
                value={selectedItem.description?.type || ''}
                slotProps={{
                  input: {
                    readOnly: true,
                  },
                }}
              />
            </Grid>
              <Grid size={2.6}>
              <TextField
                fullWidth
                label="Description Other"
                value={selectedItem.description?.other || ''}
                slotProps={{
                  input: {
                    readOnly: true,
                  },
                }}
                sx={{ mt: 2 }} 
              />
            </Grid>
              </Grid>
            
             <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 3 }}>
              <Button
                type="button"
                onClick={handleCloseOverlay}
                variant="contained"
              >
                Cancel
              </Button>
            </Box>      
        </Paper>
      </Box>
    )}
  </>
);
};

export default OverlayItem;
