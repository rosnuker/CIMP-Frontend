import React from "react";
import { Modal, Box, Button, TextField, Grid, Typography, Divider } from "@mui/material";

const AddItemModal = ({ showAddItemModal, handleCloseModal, handleChange, formData, combinedSubmit }) => {
  return (
    <Modal
      open={showAddItemModal}
      onClose={handleCloseModal}
      aria-labelledby="add-item-modal"
      aria-describedby="add-item-modal-description"
    >
      <Box
        component="form"
        onSubmit={combinedSubmit}
        sx={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          borderRadius: 3,
          boxShadow: 24,
          p: 4,
          width: '80%', // Adjusted to give space for the vertical line
          maxWidth: '1200px',
          display: 'flex',
          flexDirection: 'column',
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
          ADD ITEM
        </Typography>
        <Divider sx={{ marginBottom: 2 }} />

        <Box sx={{ display: 'flex' }}>
          {/* Left Column */}
          <Grid container spacing={2} sx={{ flex: 1, pr: 1 }}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                id="accPerson"
                name="accPerson"
                value={formData.accPerson}
                onChange={handleChange}
                placeholder="Required*"
                required
                label="Accountable Person"
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                id="invoiceNumber"
                name="invoiceNumber"
                value={formData.invoiceNumber}
                onChange={handleChange}
                placeholder="Required*"
                required
                label="Invoice Number"
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                id="department"
                name="department"
                value={formData.department}
                onChange={handleChange}
                placeholder="Required*"
                required
                label="Department"
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                id="invoiceDate"
                name="invoiceDate"
                value={formData.invoiceDate}
                onChange={handleChange}
                placeholder="Required*"
                pattern="[0-9]*"
                title="Please input valid year, e.g., 2024"
                required
                label="Invoice Date"
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                id="designation"
                name="designation"
                value={formData.designation}
                onChange={handleChange}
                placeholder="Required*"
                required
                label="Designation"
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                name="issueOrder"
                id="issueOrder"
                value={formData.issueOrder}
                onChange={handleChange}
                placeholder="Required*"
                type="number" // Ensure only numbers can be input
                title="Please enter a numerical character (1-9)"
                required
                label="Issue Order"
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                name="location.building"
                id="location.building"
                value={formData.location.building}
                onChange={handleChange}
                placeholder="Required*"
                required
                label="Location Building"
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                 fullWidth
                 name="unitCost"
                 id="unitCost"
                 value={formData.unitCost}
                 onChange={handleChange}
                 placeholder="Required*"
                 pattern="[0-9]+([.][0-9]+)?"
                 title="Please enter a valid number, e.g., 12.34"
                 required
                 label="Unit Cost"
                 variant="outlined"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                name="location.room"
                id="location.room"
                value={formData.location.room}
                onChange={handleChange}
                placeholder="Required*"
                required
                label="Location Room"
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                name="totalCost"
                id="totalCost"
                value={formData.totalCost ? `₱ ${formData.totalCost.toLocaleString()}` : ""}
                onChange={handleChange}
                placeholder="Required*"
                pattern="[0-9]+([.][0-9]+)?"
                title="Please enter a valid number, e.g., 12.34"
                required
                label="Total Cost"
                variant="outlined"
                InputProps={{
                readOnly: true, 
                }}
              />
            </Grid>
          </Grid>

          {/* Vertical Line */}
          <Box
            sx={{
              width: '2px',
              backgroundColor: 'grey',
              height: 'auto',
              mx: 2,
            }}
          />

          {/* Right Column */}
          <Grid container spacing={2} sx={{ flex: 1, pl: 1 }}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                name="unitOfMeasurement"
                id="unitOfMeasurement"
                value={formData.unitOfMeasurement}
                onChange={handleChange}
                placeholder="Required*"
                required
                label="Unit of Measurement"
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                name="description.serialNumber"
                id="description.serialNumber"
                value={formData.description.serialNumber}
                onChange={handleChange}
                placeholder="Required*"
                required
                label="Serial Number"
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                name="quantity"
                id="quantity"
                value={formData.quantity}
                onChange={handleChange}
                placeholder="Required*"
                pattern="[0-9]*"
                title="Please enter a numerical character (1-9)"
                required
                label="Quantity"
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                name="description.name"
                id="description.name"
                value={formData.description.name}
                onChange={handleChange}
                placeholder="Required*"
                required
                label="Description Name"
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                id="lifespan"
                name="lifespan"
                value={formData.lifespan}
                onChange={handleChange}
                placeholder="Required*"
                required
                label="Lifespan"
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                name="description.model"
                id="description.model"
                value={formData.description.model}
                onChange={handleChange}
                placeholder="Required*"
                required
                label="Description Model"
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                name="supplier"
                id="supplier"
                value={formData.supplier}
                onChange={handleChange}
                placeholder="Required*"
                required
                label="Supplier"
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                name="description.type"
                id="description.type"
                value={formData.description.type}
                onChange={handleChange}
                placeholder="Required*"
                required
                label="Description Type"
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                name="remarks"
                id="remarks"
                value={formData.remarks}
                onChange={handleChange}
                placeholder="Required*"
                required
                label="Remarks"
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                name="description.other"
                id="description.other"
                value={formData.description.other}
                onChange={handleChange}
                placeholder="Required*"
                required
                label="Description Other"
                variant="outlined"
              />
            </Grid>
          </Grid>
        </Box>

        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={12} display="flex" justifyContent="right">
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              sx={{ borderRadius: 2, px: 5, backgroundColor: '#2196f3',
                color: '#fafafa',
                '&:hover': {
                  backgroundColor: '#1565c0',
                },
              }}
            >
              Add
            </Button>
            <Button
              type="button"
              variant="contained"
              sx={{ borderRadius: 2, px: 5, ml: 2, backgroundColor: '#e0e0e0',
                color: '#fafafa',
                '&:hover': {
                  backgroundColor: '#9e9e9e',
                },
              }}
              onClick={handleCloseModal}
            >
              Back
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export default AddItemModal;
