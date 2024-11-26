import React, { useEffect, useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Box, Typography, TextField, Button, Paper, Divider, InputAdornment, Autocomplete, FormControlLabel, Checkbox } from "@mui/material";
import Grid from "@mui/material/Grid2";
import axios from "axios";
import AssignUserButton from "../components/AssignUserButton";

const OverlayItem = ({
  showOverlay,
  selectedItem,
  setSelectedItem,
  handleUpdate,
  handleQuantityChange,
  handleUnitCostChange,
  handleCloseOverlay,
  handleOpenDialog,
  handleCloseDialog,
  openDialog,
  handleDelete,
  formatNumber,
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

  const handleInputChange = (key, value) => {
    setSelectedItem((prevSelectedItem) => {
      const keys = key.split(".");
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

  const handleAutocompleteChange = (fieldName) => (event, value) => {
    if (!value || value.trim() === "") {
      handleInputChange(fieldName, { fname: "", lname: "" });
    } else {
      const [fname, ...lnameParts] = value.split(" ");
      const lname = lnameParts.join(" ");
      handleInputChange(fieldName, { fname, lname });
    }
  };
  
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleCloseOverlay();
    }
  };

  const getAccountablePersonLabel = () => {
    const { accPerson } = selectedItem;
    return accPerson && accPerson.fname && accPerson.lname
      ? `${accPerson.fname} ${accPerson.lname}`
      : "";
  };

  return (
    <>
      {showOverlay && selectedItem && (
        <Box
          onClick={handleBackdropClick}
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1300,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <Paper
            onClick={(e) => e.stopPropagation()}
            sx={{
              padding: 4,
              maxWidth: 1200,
              width: "90%",
              backgroundColor: "background.paper",
              borderRadius: 2,
              maxHeight: "90vh",
              overflowY: "auto",
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
              Edit Item
            </Typography>
            <Divider sx={{ marginBottom: 2 }} />

            {/* Form Section */}
            <form onSubmit={handleUpdate}>
              {/* Accountability Information */}

              {/* <Typography
                variant="subtitle1"
                sx={{ fontWeight: "bold", mb: 2 }}
              >
                Accountability Information
              </Typography>
              <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                <Grid size={2.6}>
                  <Autocomplete
                    options={O_accPer}
                    onChange={handleAutocompleteChange("accPerson")}
                    value={getAccountablePersonLabel() || null}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        fullWidth
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
              onChange={handleAutocompleteChange("department")}
              value={selectedItem.department || ""}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  id="department"
                  name="department"
                  //placeholder="Required*"
                  //required
                  value={selectedItem.department || ""}
                  onChange={(e) => handleInputChange("department", e.target.value)}
                  label="Department"
                  variant="outlined"
                />
              )}
            />
          </Grid>
                <Grid size={2.6}>
                  <TextField
                    fullWidth
                    label="Designation"
                    value={selectedItem.designation || ""}
                    onChange={(e) =>
                      handleInputChange("designation", e.target.value)
                    }
                    variant="outlined"
                    //required
                  />
                </Grid>
              </Grid>

              <Divider sx={{ my: 3 }} /> */}

              {/* Location Information */}
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: "bold", mb: 2 }}
              >
                Location Information
              </Typography>
              <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                <Grid size={2.6}>
                  <TextField
                    fullWidth
                    label="Inventory Location"
                    value={selectedItem.location?.building || ""}
                    onChange={(e) =>
                      handleInputChange("location.building", e.target.value)
                    }
                    variant="outlined"
                  />
                </Grid>
                <Grid size={2.6}>
                  <TextField
                    fullWidth
                    label="Location Room"
                    value={selectedItem.location?.room || ""}
                    onChange={(e) =>
                      handleInputChange("location.room", e.target.value)
                    }
                    variant="outlined"
                  />
                </Grid>
              </Grid>

              <Divider sx={{ my: 3 }} />

              {/* Invoice Information */}
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: "bold", mb: 2 }}
              >
                Invoice Information
              </Typography>
              <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                <Grid size={2.6}>
                  <TextField
                    fullWidth
                    label="Invoice Number"
                    value={selectedItem.invoiceNumber || ""}
                    onChange={(e) =>
                      handleInputChange("invoiceNumber", e.target.value)
                    }
                    variant="outlined"
                    required
                  />
                </Grid>
                <Grid size={2.6}>
                  <TextField
                    fullWidth
                    label="Invoice Date"
                    type="text"
                    value={selectedItem.invoiceDate || ""}
                    onChange={(e) =>
                      handleInputChange("invoiceDate", e.target.value)
                    }
                    variant="outlined"
                    required
                    // InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid size={2.6}>
                  <TextField
                    fullWidth
                    label="Issue Order"
                    type="number"
                    value={selectedItem.issueOrder || ""}
                    onChange={(e) =>
                      handleInputChange("issueOrder", e.target.value)
                    }
                    variant="outlined"
                    required
                  />
                </Grid>
              </Grid>

              <Divider sx={{ my: 3 }} />

              <Typography
                variant="subtitle1"
                sx={{ fontWeight: "bold", mb: 2 }}
              >
                Item Information
              </Typography>
              <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                <Grid size={2.6}>
                  <TextField
                    fullWidth
                    label="Unit of Measurement"
                    value={selectedItem.unitOfMeasurement || ""}
                    onChange={(e) =>
                      handleInputChange("unitOfMeasurement", e.target.value)
                    }
                    variant="outlined"
                    required
                  />
                </Grid>
                <Grid size={2.6}>
                  <TextField
                    fullWidth
                    label="Quantity"
                    type="number"
                    value={selectedItem.quantity || ""}
                    onChange={handleQuantityChange}
                    variant="outlined"
                    required
                  />
                </Grid>
                <Grid size={2.6}>
                  <TextField
                    fullWidth
                    label="Lifespan"
                    value={selectedItem.lifespan || ""}
                    onChange={(e) =>
                      handleInputChange("lifespan", e.target.value)
                    }
                    variant="outlined"
                    required
                  />
                </Grid>

                <Grid size={2.6}>
                  <TextField
                    fullWidth
                    label="Supplier"
                    value={selectedItem.supplier || ""}
                    onChange={(e) =>
                      handleInputChange("supplier", e.target.value)
                    }
                    variant="outlined"
                    required
                  />
                </Grid>

                <Grid size={2.6}>
                  <TextField
                    fullWidth
                    id="remarks"
                    value={selectedItem.remarks}
                    onChange={(e) =>
                      handleInputChange("remarks", e.target.value)
                    }
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
                    label="Serial Number*"
                    value={selectedItem.description?.serialNumber || ""}
                    onChange={(e) =>
                      handleInputChange(
                        "description.serialNumber",
                        e.target.value
                      )
                    }
                    variant="outlined"
                    sx={{ mt: 2 }}
                  />
                </Grid>
                <Grid size={2.6}>
                  <TextField
                    fullWidth
                    label="Model*"
                    value={selectedItem.description?.model || ""}
                    onChange={(e) =>
                      handleInputChange("description.model", e.target.value)
                    }
                    variant="outlined"
                    sx={{ mt: 2 }}
                  />
                </Grid>
                <Grid size={2.6}>
                  <FormControlLabel
                      control={
                          <Checkbox
                              name="isConsumable"
                              checked={selectedItem.consumable || false} // Default to false if undefined
                              onChange={(e) => handleInputChange("consumable", e.target.checked)}
                          />
                      }
                      label="Consumable"
                      sx={{ mt: 2.5 }}
                  />
                </Grid>
              </Grid>

              <Divider sx={{ my: 3 }} />

                  {/* Cost and Description Information */}
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: "bold", mb: 2 }}
                  >
                    Cost Information
                  </Typography>
                  <Grid
                    container
                    rowSpacing={1}
                    columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                  >
                    
                    <Grid size={2.6}>
                      <TextField
                          fullWidth
                          label="Unit Cost"
                          value={formatNumber(selectedItem.unitCost || "")}
                          onChange={handleUnitCostChange}
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
                    <TextField
                      fullWidth
                      label="Total Cost"
                      value={
                        selectedItem.totalCost
                          ? new Intl.NumberFormat('en-PH', {
                              style: 'currency',
                              currency: 'PHP',
                              minimumFractionDigits: 0, // Enforce two decimal places
                              maximumFractionDigits: 20,
                            }).format(selectedItem.totalCost)
                          : ""
                      }
                      onChange={(e) =>
                        handleInputChange("totalCost", e.target.value)
                      }
                      variant="outlined"
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
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: "bold", mb: 2 }}
              >
                Description Details
              </Typography>
              <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                <Grid size={2.6}>
                  <TextField
                    fullWidth
                    label="Description Name"
                    value={selectedItem.description?.name || ""}
                    onChange={(e) =>
                      handleInputChange("description.name", e.target.value)
                    }
                    variant="outlined"
                  />
                </Grid>
                <Grid size={2.6}>
                  <TextField
                    fullWidth
                    label="Description Type"
                    value={selectedItem.description?.type || ""}
                    onChange={(e) =>
                      handleInputChange("description.type", e.target.value)
                    }
                    variant="outlined"
                  />
                </Grid>
                <Grid size={2.6}>
                  <TextField
                    fullWidth
                    label="Description Other"
                    value={selectedItem.description?.other || ""}
                    onChange={(e) =>
                      handleInputChange("description.other", e.target.value)
                    }
                    variant="outlined"
                  />
                </Grid>
              </Grid>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center", // Align items vertically centered
                  marginTop: 3,
                }}
              >
                <Box>
                  <Button
                    onClick={handleCloseOverlay}
                    variant="contained"
                    sx={{
                      marginRight: 2,
                      backgroundColor: "#e0e0e0",
                      color: "#fafafa",
                      "&:hover": {
                        backgroundColor: "#9e9e9e",
                      },
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="button"
                    onClick={handleOpenDialog}
                    variant="contained"
                    color="error"
                  >
                    Delete
                  </Button>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <AssignUserButton item={selectedItem} accPerson={selectedItem.accPerson} handleCloseOverlay={handleCloseOverlay} />
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={selectedItem.status !== "TO BE ASSIGNED"}
                    sx={{ marginLeft: 2 }} // Add margin to the left of the Update button
                  >
                    Update
                  </Button>
                </Box>
              </Box>
            </form>
          </Paper>
        </Box>
      )}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Delete Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this item? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={handleCloseDialog}
            sx={{
              backgroundColor: "#e0e0e0",
              color: "#fafafa",
              "&:hover": {
                backgroundColor: "#9e9e9e",
              },
            }}
          >
            Cancel
          </Button>
          <Button variant="contained" color="error" onClick={handleDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default OverlayItem;
