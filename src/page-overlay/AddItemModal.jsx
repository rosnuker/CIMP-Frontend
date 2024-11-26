import React, { useEffect, useState } from "react";
import { Modal, Box, Button, TextField, Typography, Divider,
  InputAdornment,Autocomplete,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import axios from "axios";

const AddItemModal = ({
  showAddItemModal,
  handleCloseModal,
  handleChange,
  formData,
  combinedSubmit,
  formatNumber,
  handleBlur
}) => {

  const address = getIpAddress();
      
    function getIpAddress() {
      const hostname = window.location.hostname;
  
      const indexOfColon = hostname.indexOf(':');
  
      if(indexOfColon !== -1) {
        return hostname.substring(0, indexOfColon);
      }
  
      return hostname;
    }
  const [O_accPer, setO_accPer] = useState([])

  useEffect(() => {
    fetchO_accPer();
  }, []);

  const fetchO_accPer = async () => {
    try {
      const response = await axios.get(`http://${address}:42069/fetchAccPers`) 
      const uniqueOptions_accPer = [...new Set(response.data)] // Remove duplicates
      setO_accPer(uniqueOptions_accPer)
    } catch (error) {
      console.error("Error fetching options:", error)
    }
  }

  const handleAutocompleteChange = (fieldName) => (event, value) => {
    handleChange({ target: { name: fieldName, value } });
  };

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
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          borderRadius: 3,
          boxShadow: 24,
          p: 4,
          width: "80%",
          maxWidth: "1200px",
          maxHeight: "90vh",
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            textAlign: "center",
            fontWeight: "bold",
            color: "maroon",
            backgroundColor: "yellow",
            paddingY: 1,
            marginBottom: 3,
          }}
        >
          ADD ITEM
        </Typography>
        <Divider sx={{ marginBottom: 2 }} />

        {/* Accountability Information */}
        {/* <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 2 }}>
          Accountability Information
        </Typography>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid size={2.6}>
            <Autocomplete
              options={O_accPer}
              value={formData.accPerson}
              onChange={(event, newValue) => {
                handleChange({
                  target: { name: 'accPerson', value: newValue || '' }
                });
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  id="accPerson"
                  name="accPerson"
                  label="Accountable Person"
                  variant="outlined"
                />
              )}
            />
          </Grid>
          <Grid size={2.6}>
            <Autocomplete
              freeSolo
              options={[
                "Alumni Affairs Office",
                "CASE-Dean's Office",
                "CCS-Dean's Office",
                "CCS-IT / CREATE / NEXUSS",
                "CCS-MakerSpace",
                "CMBA-Dean's Office",
                "CMBA-DHTM",
                "CON",
                "CON-Dean's Office",
                "CORE-MARKETING",
                "CEA-ARCH",
                "CEA-CE",
                "CEA-CE / PCO",
                "CEA-CHE",
                "CEA-DEMP",
                "CEA-ECE",
                "CEA-EE",
                "CEA-EM",
                "CEA-ME",
                "CV-FIC",
                "ETEEAP",
                "Executive Office",
                "FAO",
                "GUIDANCE",
                "HRD",
                "ISD",
                "JHS",
                "LRAC",
                "MEDICAL-DENTAL CLINIC",
                "MIS-ISD",
                "MSDO",
                "MSDO - ATO",
                "NLO",
                "OAS",
                "OPC",
                "QAO",
                "RDCO",
                "SAFETY & SECURITY",
                "SSO",
                "SHS",
                "TSG",
                "URO",
                "URO-College",
                "URO-ELEM",
                "URO-HS",
                "URO-SHS",
              ]}
              value={formData.department}
              onChange={handleAutocompleteChange("department")}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  id="department"
                  name="department"
                  //placeholder="Required*"
                  //required
                  label="Department"
                  variant="outlined"
                />
              )}
            />
          </Grid>
          <Grid size={2.6}>
            <TextField
              fullWidth
              id="designation"
              name="designation"
              value={formData.designation}
              onChange={handleChange}
              //placeholder="Required*"
              //required
              label="Designation"
              variant="outlined"
            />
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} /> */}

        {/* Location Information */}
        <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 2 }}>
          Location Information
        </Typography>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid size={2.6}>
            <TextField
              fullWidth
              name="location.building"
              id="location.building"
              value={formData.location.building}
              onChange={handleChange}
              placeholder="Required*"
              required
              label="Inventory Location"
              variant="outlined"
            />
          </Grid>
          <Grid size={2.6}>
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
        </Grid>

        <Divider sx={{ my: 3 }} />

        {/* Invoice Information Section */}
        <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 2 }}>
          Invoice Information
        </Typography>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid size={2.6}>
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
          <Grid xs={12} md={4} sx={{ width: { xs: '100%', md: '20%' } }}>
            <TextField
              fullWidth
              id="invoiceDate"
              type="date"
              slotProps={{
                inputLabel: {
                  shrink: true
                }
              }}
              name="invoiceDate"
              value={formData.invoiceDate}
              onChange={handleChange}
              placeholder="Required*"
              pattern="[0-9]*"
              title="Please input valid year, e.g., 2024"
              required
              label="Invoice Date"
              //variant="outlined"
            />
          </Grid>
          <Grid size={2.6}>
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
        </Grid>

        <Divider sx={{ my: 3 }} />

        {/* Item Information Section */}
        <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 2 }}>
          Item Information
        </Typography>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid size={2.6}>
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
          <Grid size={2.6}>
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
          <Grid size={2.6}>
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
          <Grid size={2.6}>
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
          <Grid size={2.6}>
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
              sx={{ mt: 2 }}
            />
          </Grid>
          <Grid size={2.6}>
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
              sx={{ mt: 2 }}
            />
          </Grid>
          <Grid size={2.6}>
            <TextField
              fullWidth
              name="description.model"
              id="description.model"
              value={formData.description.model}
              onChange={handleChange}
              placeholder="Required*"
              required
              label="Model"
              variant="outlined"
              sx={{ mt: 2 }}
            />
          </Grid>
          <Grid size={2.6}>
            <FormControlLabel
                control={
                    <Checkbox
                        name="isConsumable"
                        checked={formData.isConsumable}
                        onChange={handleChange}
                    />
                }
                label="Consumable"
                sx={{ mt: 2.5 }}
            />
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        {/* Cost Information Section */}
        <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 2 }}>
          Cost Information
        </Typography>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid size={2.6}>
    {/* <TextField
      fullWidth
      name="unitCost"
      id="unitCost"
      value={formatNumber(formData.unitCost)} // Format the displayed value
      onChange={handleChange}
      placeholder="Required*"
      pattern="[0-9]+([.][0-9]+)?"
      title="Please enter a valid number, e.g., 12.34"
      required
      label="Unit Cost"
      variant="outlined"
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">₱</InputAdornment>
          ),
        },
      }}
    /> */}

<TextField
  fullWidth
  name="unitCost"
  id="unitCost"
  value={formData.unitCost} // Do not format during typing
  onChange={handleChange}
  onBlur={handleBlur} // Format after losing focus
  placeholder="Required*"
  pattern="[0-9]+([.][0-9]+)?"
  title="Please enter a valid number, e.g., 12.34"
  required
  label="Unit Cost"
  variant="outlined"
  slotProps={{
    input: {
      startAdornment: (
        <InputAdornment position="start">₱</InputAdornment>
      ),
    },
  }}
/>
  </Grid>
          <Grid size={2.6}>
  {/* <TextField
    fullWidth
    name="totalCost"
    id="totalCost"
    value={new Intl.NumberFormat('en-PH', {
      minimumFractionDigits: 2, // Ensure two decimal places
      maximumFractionDigits: 2,
    }).format(formData.totalCost)}
    onChange={handleChange}
    placeholder="Required*"
    pattern="[0-9]+([.][0-9]+)?"
    title="Please enter a valid number, e.g., 12.34"
    required
    label="Total Cost"
    variant="outlined"
    disabled
    InputProps={{
      startAdornment: <InputAdornment position="start">₱</InputAdornment>,
    }}
  /> */}
  <TextField
  fullWidth
  name="totalCost"
  id="totalCost"
  value={formatNumber(formData.totalCost)} // Format the displayed value with commas
  onChange={handleChange}
  placeholder="Required*"
  pattern="[0-9]+([.][0-9]+)?"
  title="Please enter a valid number, e.g., 12.34"
  required
  label="Total Cost"
  variant="outlined"
  disabled
  InputProps={{
    startAdornment: <InputAdornment position="start">₱</InputAdornment>,
  }}
/>

</Grid>

        </Grid>

        <Divider sx={{ my: 3 }} />

        {/* Description Information Section */}
        <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 2 }}>
          Description Information
        </Typography>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid size={2.6}>
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
          <Grid size={2.6}>
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
          <Grid size={2.6}>
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

        <Grid container spacing={2} sx={{ mt: 5 }}>
          <Grid xs={12} sm={6} md={4} offset={{ md: "auto" }}>
          <Button
              type="button"
              variant="contained"
              sx={{
                borderRadius: 2,
                px: 5,
                mr: 2,
                backgroundColor: "#e0e0e0",
                color: "#fafafa",
                "&:hover": {
                  backgroundColor: "#9e9e9e",
                },
              }}
              onClick={handleCloseModal}
            >
              Back
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              sx={{
                borderRadius: 2,
                px: 5,
                backgroundColor: "#2196f3",
                color: "#fafafa",
                "&:hover": {
                  backgroundColor: "#1565c0",
                },
              }}
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export default AddItemModal;
