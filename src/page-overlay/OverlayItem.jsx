import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Box, Typography, TextField, Button, Paper, Divider, InputAdornment, Autocomplete } from "@mui/material";
import Grid from "@mui/material/Grid2";

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
    handleInputChange(fieldName, value);
  };
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

              <Typography
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
                    freeSolo
                    options={[
                      "Dr. Aliac, Chris Jordan G.",
                      "Engr. Bacalso, Concordia C.",
                      "Mr. Bañares, Niño James",
                      "Engr. Bathan, Melvin E.",
                      "Mrs. Boholst, Rainera C.",
                      "Dr. Caudor, Vanessa A.",
                      "Dr. Chong, Rachel M.",
                      "Mr. Corbeta, Nendell Hanz R.",
                      "Mr. Cortez, Butch M.",
                      "Dr. Cuerda, Flordeliza M.",
                      "Mrs. Diano, Rafaeliza P.",
                      "Mr. Escario, John Gregory B.",
                      "Dr. Feliscuzo, Larmie S.",
                      "Engr. Granaderos, Anna Marie A.",
                      "Engr. Jaim, Mary Ann G.",
                      "Mrs. Jereza, Ma. Raina Romana V.",
                      "Mr. Laviste, Ralph P.",
                      "Atty. Mata, Hanna Mae M.",
                      "Engr. Navares, Alein B.",
                      "Dr. Pacaña, Arsenio C.",
                      "Engr. Pacaña, Jonathan B.",
                      "Engr. Rago, Erlyn Ivy O.",
                      "Engr. Rama, Jurydel G.",
                      "Atty. Sevilla, Janzen Joseph G.",
                      "Dr. Suerte, Pablito G.",
                      "Dr. Tacdoro, Arnie Ernesta M.",
                      "Engr. Teves, Nicarter V.",
                      "Engr. Tindoy, Rolando A.",
                      "Atty. Valencia, Corazon E.",
                      "Dr. Villacastin, Luni N.",
                      "Engr. Villamor, Bernard Nicolas E.",
                      "Mrs. Villamor, Ma. Socorro E.",
                      "Mrs. Abellanosa, Melissa C.",
                      "Mrs. Chua, Florabel H.",
                      "Mrs. Chua, Ma. Socorro B.",
                      "Mr. Daytia, George Osley Salon",
                      "Mr. Delantar, Mitch Aristarchris A.",
                      "Mrs. Dinampo, Violanda F.",
                      "Engr. Galgo, Mae Jessica B.",
                      "Ms. Ilagan, Liza P.",
                      "Mr. Linao, Noel F.",
                      "Engr. Ocan, Chum Keji A.",
                      "Engr. Pacaña, Suzette B.",
                      "Mrs. Rafols, Charyl A.",
                      "Mr. Rago, Gensbergh G.",
                      "Mrs. Rico, Madelline E.",
                      "Engr. Solis, Alona M.",
                      "Mr. Telamo, Melchor V.",
                      "Mrs. Tiu, Rhea Antonette T.",
                      "Mr. Torreon, John Rey L.",
                      "Mrs. Ares, Shirley S.",
                      "Mrs. Villamor, Ma. May S.",
                      "Ms. Migallos, Consuelo R.",
                      "Mrs. Ong, Irene A.",
                      "Ms. Amanence, Shenley Jean A.",
                      "Ms. Batusin, Mae Therese B.",
                      "Mr. Cañamo, Mardit B.",
                      "Ms. Sinangote, Yobhel M.",
                      "Mr. Quiñanola Jr., Jaime I.",
                      "Mr. Sanchez, Jose Clyde C.",
                      "Mrs. Go, Milliscent G.",
                      "Mr. Junas, Ralph John B.",
                      "Mrs. Lim, Ines J.",
                      "Mr. Tingal, Teody Mark D.",
                      "Ms. Lumibaw, Sophia Zane Deniz M.",
                      "Engr. Aguilar, Dioscoro Jr. R.",
                      "Mr. Kwong, Ildebrando P.",
                      "Mrs. Pitos, Edmalin J.",
                      "Mr. Treyes, August Greg T.",
                      "Ms. Baraquil, Shiela E.",
                      "Mr. Abapo, Bryan Gil B.",
                      "Mr. Baraga, Rizalito L.",
                      "Ms. Cajipe, Rosemarie Blanche A.",
                      "Mr. Lastimosa, Harold C.",
                      "Mrs. Lumen, Glacy-May B.",
                      "Mrs. Papasin, Maribel C.",
                      "Ms. Malaga, Melma A.",
                      "Mrs. De Guzman, Julieta S.",
                      "Mrs. Rojas, Jennierose S.",
                      "Mr. Alduezo, Errol C.",
                      "Mrs. Alduezo, Jardine A.",
                      "Mr. Gargaran, Jan Marlowe S.",
                      "Mrs. Abaila, Myra A.",
                      "Mr. Cabreros, Ashley Cabonelas",
                      "Mrs. Quiñanola, Merly B.",
                      "Mr. Rago, William, Jr. O.",
                      "Mrs. Morcilla, Josephine R.",
                      "Mrs. Faculin, Candy H.",
                      "Ms. Omboy, Rhea E.",
                      "Mrs. Perocho, Irma Balanquit",
                      "Mrs. Abendan, Jennelyn B.",
                      "Mrs. Nufable, Jennifer G.",
                      "Mr. Torres, Chrisjay S.",
                      "Mrs. Dela Cerna, Cheryl C.",
                      "Mr. Alingasa, Gener P.",
                      "Mrs. Cabucos, Imma Concepcion S.",
                      "Mrs. Caminade, Catherine V.",
                      "Mr. Cornejo, Albert James H.",
                      "Ms. Dominguez, Gamaliel M.",
                      "Mrs. Encorporado, Andrea Leah B.",
                      "Mrs. Geronimo, Lehra G.",
                      "Miss. Ho, Nizirisa M.",
                      "Ms. Ayapana, Jahmaila",
                      "Mrs. Lumagas, Soledad L.",
                      "Ms. Manayaga, Mary Car A.",
                      "Mrs. Moselina, Amor G.",
                      "Mr. Muñoz, Richard W.",
                      "Mrs. Narca, Rosafe E.",
                      "Mrs. Pozon, Glenda A.",
                      "Mrs. Restauro, Ma. Eleanor R.",
                      "Ms. Roa, Donna Bella D.",
                      "Ms. Romero, Yasmin Violeta B.",
                      "Mrs. Ruiz, Bronwyn A.",
                      "Mr. Contado, Shan Philip",
                      "Mrs. Villatondo, Lyn R.",
                      "Ms. Alao, Arianne Kay S.",
                      "Mr. Amper, Rogelio Jr. A.",
                      "Ms. Bercero, Zera Clarita Maai",
                      "Ms. Canonigo, Rica S.",
                      "Ms. Catubig, Jahna Joy C.",
                      "Ms. Curambao, Imari A.",
                      "Ms. Garcia, Alyssa Zuleima V.",
                      "Ms. Lequigan, Juliana L.",
                      "Mr. Macasero, Kim Anthony T.",
                      "Ms. Manlapaz, Trisha Marie B.",
                      "Ms. Tagaca, Lyndie V.",
                      "Ms. Toriales, Crisleen Gyll B.",
                      "Ms. Villar, Kathryn Melissa M.",
                      "Ms. Watin, Cydy Ann A.",
                      "Ms. Yap, Gilda A.",
                      "Mrs. Yaranon, Emily D.",
                      "Ms. Limosnero, Kate Maloon",
                      "Mrs. Bacalso, Cyril E.",
                      "Ms. Galan, Michelle T.",
                      "Ms. Quiambao, Alegria C.",
                      "Ms. Suazo, Daryl Joy A.",
                      "Mr. Amolong, Manuel",
                      "Mr. Musa, Ryan O.",
                      "Ms. Vender, Ma. Archien A.",
                      "Ms. Aparri, Jesthine Kate A.",
                      "Mrs. Estrada, Rowela J.",
                      "Ms. Lebumfacil, Lexie Claire",
                      "Ms. Luay, Joanna Mae E.",
                      "Ms. Mirasol, Janice S.",
                      "Mrs. Ricardel, Bebeth D.",
                      "Mrs. Rivera, Mayrelen N.",
                      "Mrs. Sosas, Alma N.",
                      "Mrs. Sumagaysay, Risalina A.",
                      "Dr. Tausa, Roquito Neil D.",
                      "Ms. Villaver, Maria Teresita R.",
                      "Mrs. Lopez, Imelda D.",
                      "Mrs. Etcuban, Roche B.",
                      "Mrs. Albuera, Catherine II",
                      "Mrs. Basalo, Grace M.",
                      "Mrs. Cañete, Genevieve L.",
                      "Dr. Creus, Ma. Arlene P.",
                      "Dr. Lumayno, Maria Luz M.",
                      "Dr. Quirante, Alan R.",
                      "Dr. Rebosura, Cheyenne Kate Pueblos",
                      "Mrs. Saberon, Rosario Ophelia O.",
                      "Mrs. Ybas, Laarne B.",
                      "Mr. Tanaleon, Jonefer O.",
                      "Mr. Abando, Rosilo E.",
                      "Mr. Arias, Jovany T.",
                      "Mrs. Marquez, Jeny F.",
                      "Mrs. Genson, Ma. Gina T.",
                      "Mrs. Telamo, Merian C.",
                      "Mr. Allego, Francisco Rey N.",
                      "Mr. Anog, Jefferson Niño",
                      "Mr. Ayacaide, Fredo N.",
                      "Mr. Branzuela, Ariel B.",
                      "Mr. Caballes, Emelio Jr. T.",
                      "Mr. Cabaluna, Rennedy R.",
                      "Mr. Cabangca, Edwin E.",
                      "Mr. Caña, Ramel Roque D.",
                      "Mr. Carillo Jr., Leodegario A.",
                      "Mr. Deniega, Rudy T.",
                      "Mr. Gapay, Wendell G.",
                      "Mr. Gelig, Elmer B.",
                      "Mr. Go, Alvin V.",
                      "Mr. Inso, George A.",
                      "Mr. Jacaban, Godofredo Jr. P.",
                      "Mr. Llagoso, Leomides A.",
                      "Mr. Mansueto, Tyrone Rolando T.",
                      "Mr. Mata, Irvin T.",
                      "Mr. Nayra, Dominick V.",
                      "Mr. Olivar, Ramonito N.",
                      "Ar. Ortiz, Clarisse Inez H.",
                      "Mrs. Pedroza, Edgin O.",
                      "Mrs. Pensona, Marissa R.",
                      "Mr. Pozon, Ruel N.",
                      "Mr. Quijano, Bernard N.",
                      "Mr. Sescon, Manuelito V.",
                      "Mrs. Tahum, Tina Marie R.",
                      "Mr. Tañeca, Ronnie D.",
                      "Mr. Tek-Ing, Rolando D.",
                      "Mrs. Ulzoron, Claudine T.",
                      "Mr. Valle, Randy C.",
                      "Mr. Villaluna, Ariston B.",
                      "Engr. Arañas, Ronelo C.",
                      "Engr. Bendijo, Bernadette Joy R.",
                      "Ms. Restauro, Jebee H.",
                      "Mrs. Picardal, Marie Cris S.",
                      "Mrs. Lumontad, Genevieve T.",
                      "Mrs. Teves, Elfie Marie L.",
                      "Engr. Laña, Marie Rose G.",
                      "Mr. Cabije, Dexter E.",
                      "Mr. Ferolino, Brian M.",
                      "Mr. Ilagan, Angelo P.",
                      "Engr. Luspoc, Celso E.",
                      "Mr. Sopsop, Gabriel L.",
                      "Mr. Montebon, Marlon Brandon P.",
                      "Mr. Alicabo, Jims Achilles G.",
                      "Mrs. Angus, Janice S.",
                      "Ms. Celada, Jennibeth A.",
                      "Mr. Cena, Rainer A.",
                      "Mrs. Golez, Mary Antonette B.",
                      "Mrs. Gubalane, Geraldine C.",
                      "Ms. Lopez, Melissa E.",
                      "Mr. Mangubat, James N.",
                      "Mr. Millor, Arniel P.",
                      "Mr. Restauro Jr., Cipriano V.",
                      "Mr. Reyes, Arman R.",
                      "Ms. Riel, Emily O.",
                      "Mrs. Rio, Rachel B.",
                      "Mrs. Simbajon, Joyce B.",
                      "Mrs. Tan, Maricris O.",
                      "Mr. Teves, Joseph Dante A.",
                      "Ms. Abellana, Aileen Mae E.",
                      "Mr. Cayampat, Lhudel M.",
                      "Mrs. Infornon, Maria Beylen I.",
                      "Ms. Napari, Avelita O.",
                      "Mrs. Samodio, Bemaxminda R.",
                      "Ms. Temanel, Pamela Dawn Q.",
                      "Ms. Cuizon, Claire Angelie T.",
                    ]}
                    onChange={handleAutocompleteChange("accPerson")}
                    value={selectedItem.accPerson || ""}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        fullWidth
                        id="accPerson"
                        name="accPerson"
                        value={selectedItem.accPerson || ""}
                        onChange={(e) => handleInputChange("accPerson", e.target.value)}
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

              <Divider sx={{ my: 3 }} />

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
                              minimumFractionDigits: 2, // Enforce two decimal places
                              maximumFractionDigits: 2,
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
                    label="Description Model"
                    value={selectedItem.description?.model || ""}
                    onChange={(e) =>
                      handleInputChange("description.model", e.target.value)
                    }
                    variant="outlined"
                  />
                </Grid>
                <Grid size={2.6}>
                  <TextField
                    fullWidth
                    label="Description Serial Number"
                    value={selectedItem.description?.serialNumber || ""}
                    onChange={(e) =>
                      handleInputChange(
                        "description.serialNumber",
                        e.target.value
                      )
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
                    sx={{ mt: 2 }} 
                  />
                </Grid>
              </Grid>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
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
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                  >
                    Update
                  </Button>
              </Box>
            </form>
          </Paper>
        </Box>
      )}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Confirm Changes</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to confirm?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="warning" onClick={handleDelete}>
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
