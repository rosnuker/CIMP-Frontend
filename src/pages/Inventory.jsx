import React, { useState, useEffect } from "react";
import AddIcon from '@mui/icons-material/Add';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Toolbar, Container, Typography } from "@mui/material";
import axios from "axios";
import AddItemModal from "../page-overlay/AddItemModal";
import OverlayItem from '../page-overlay/OverlayItem';
import { useSnackbar } from "../components/SnackbarContext";

export default function Inventory( { user, setUser } ) {
	const showSnackbar = useSnackbar();
	const [id, setId] = useState("");
	const [queryResults, setQueryResults] = useState([]);
	const [LqueryResults, setLQueryResults] = useState([]);
	const columns = ["PROPERTY TAG", "ACCOUNTABLE PERSON", "DEPARTMENT", "DESIGNATION", "ITEM NAME", "INVOICE NUMBER", "INVOICE DATE", "ISSUE ORDER NUMBER", "QUANTITY", "REMARKS", "STATUS", "SUPPLIER", "TOTAL COST", "UNIT COST", "LIFESPAN", "CONSUMABLE"];
	
	const address = getIpAddress();
	
	function getIpAddress() {
		const hostname = window.location.hostname;

		const indexOfColon = hostname.indexOf(':');

		if(indexOfColon !== -1) {
			return hostname.substring(0, indexOfColon);
		}

		return hostname;
	}

	const [openDialog, setOpenDialog] = useState(false);
	const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

	const [formData, setFormData] = useState({
		accPerson: "",
		invoiceNumber: "",
		invoiceDate: "",
		issueOrder: "",
		lifespan: "",
		quantity: "",
		remarks: "",
		status: "",
		supplier: "",
		totalCost: "",
		unitCost: "",
		unitOfMeasurement: "",
		description: {
			name: "",
			model: "",
			serialNumber: "",
			type: "",
			other: "",
		},
		location: {
			building: "",
			room: "",
		},
		isConsumable: false,
	});

	const formatNumber = (num) => {
		if (!num) return '';
		const [whole, decimal] = num.toString().split('.');
		return whole.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + (decimal ? '.' + decimal : '');
	};
	
	const formatNumberWithCommas = (numberString) => {
		return numberString.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	};
	
	const cleanNumberString = (numberString) => {
		if (typeof numberString === 'string') {
			return numberString.replace(/,/g, '');
		}
		return numberString;
	};
	
	const handleChange = (event) => {
		const { name, value, type } = event.target;
	
		const finalValue = type === 'checkbox' ? event.target.checked : value;
	
		const rawValue = typeof finalValue === 'string' ? finalValue.replace(/,/g, '') : finalValue;
	
		if (name === "quantity" || name === "unitCost") {
			const quantity = name === "quantity" ? rawValue : formData.quantity.replace(/,/g, '');
			const unitCost = name === "unitCost" ? rawValue : formData.unitCost.replace(/,/g, '');
	
			const parsedQuantity = parseFloat(quantity) || 0;
			const parsedUnitCost = parseFloat(unitCost) || 0;
			const totalCost = parsedQuantity * parsedUnitCost;
	
			setFormData((prevState) => ({
				...prevState,
				[name]: formatNumberWithCommas(rawValue),
				totalCost: totalCost.toFixed(2),
			}));
		} else if (name.includes(".")) {
			const [parentKey, childKey] = name.split(".");
			setFormData((prevState) => ({
				...prevState,
				[parentKey]: {
					...prevState[parentKey],
					[childKey]: rawValue,
				},
			}));
		} else {
			setFormData((prevState) => ({
				...prevState,
				[name]: finalValue,
			}));
		}
	};
	
	
	const handleBlur = (event) => {
		const { name, value } = event.target;
	
		if (name === "unitCost" || name === "quantity") {
			const formattedValue = formatNumber(value);
			setFormData((prevState) => ({
				...prevState,
				[name]: formattedValue,
			}));
		} else if (name === "totalCost") {
			const formattedTotalCost = formatNumber(formData.totalCost);
			setFormData((prevState) => ({
				...prevState,
				totalCost: formattedTotalCost,
			}));
		}
	};
	
	  
	const handleSubmit = () => {
		const cleanedQuantity = cleanNumberString(formData.quantity);
		const cleanedUnitCost = cleanNumberString(formData.unitCost);
		
		const totalCost = parseFloat(cleanedQuantity) * parseFloat(cleanedUnitCost);
		
		axios.post(`http://${address}:42069/item/insertItem?fullName=${formData.accPerson}`, {
			invoiceNumber: formData.invoiceNumber,
			invoiceDate: formData.invoiceDate,
			issueOrder: formData.issueOrder,
			lifespan: formData.lifespan,
			quantity: cleanedQuantity,
			remarks: formData.remarks,
			status: "TO BE ASSIGNED",
			supplier: formData.supplier,
			totalCost: totalCost.toFixed(2),
			unitCost: cleanedUnitCost,
			unitOfMeasurement: formData.unitOfMeasurement,
			description: {
				name: formData.description.name,
				model: formData.description.model,
				serialNumber: formData.description.serialNumber,
				type: formData.description.type,
				other: formData.description.other,
			},
			location: {
				building: formData.location.building,
				room: formData.location.room,
			},
			consumable: formData.isConsumable,
		})
		.then(response => {
			const newId = response.data.iid;
			const newName = response.data.description.name; 
			setQueryResults(response.data);
			setId(newId);

			showSnackbar('Data added!', 'success');

			axios.post(`http://${address}:42069/addLog`, {
				description: `Added an Item: [${newId}] - ${newName}`,
				type: "ADD"
			}, {
				params: {
					uid: user.uid,
					iid: newId 
				}
			})
			.then(response => {
				setLQueryResults(response.data);
				setShowAddItemModal(false);
				setLoader(Math.random()*1000);
			})
			.catch(error => {
				console.error("Error adding log:", error);
			});

			setFormData({
				accPerson: "",
				invoiceNumber: "",
				invoiceDate: "",
				issueOrder: "",
				lifespan: "",
				quantity: "",
				remarks: "",
				status: "",
				supplier: "",
				totalCost: "",
				unitCost: "",
				unitOfMeasurement: "",
				description: {
					name: "",
					model: "",
					serialNumber: "",
					type: "",
					other: "",
				},
				location: {
					building: "",
					room: "",
				},
				isConsumable: false,
			});
		})
		.catch(error => {
			console.error("Error inserting data:", error);
			showSnackbar('Error inserting data!', 'error');
		});
	};

	const combinedSubmit = (event) => {
		event.preventDefault();
		handleSubmit();
	}

	const [data, setData] = useState([]);
	const [selectedItem, setSelectedItem] = useState({});
	const [showOverlay, setShowOverlay] = useState(false);
	const [showAddItemModal, setShowAddItemModal] = useState(false);
	const [loader, setLoader] = useState(null);

	const handleOpenModal = () => setShowAddItemModal(true);
	const handleCloseModal = () => {
		setShowAddItemModal(false);
		setFormData({
			accPerson: "",
			invoiceNumber: "",
			invoiceDate: "",
			issueOrder: "",
			lifespan: "",
			quantity: "",
			remarks: "",
			status: "",
			supplier: "",
			totalCost: "",
			unitCost: "",
			unitOfMeasurement: "",
			description: {
				name: "",
				model: "",
				serialNumber: "",
				type: "",
				other: "",
			},
			location: {
				building: "",
				room: "",
			},
			isConsumable: false,
		});
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(
					`http://${address}:42069/item/getAllItems`
				);
				setData(response.data);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		fetchData();
	}, [loader]);

	const handleRowClick = (item) => {
		setSelectedItem(item);
		setShowOverlay(true);
	};

    const handleDelete = (event) => {
		event.preventDefault();
		const itemId = selectedItem.iid;
		if (!itemId) {
		  console.error('No item ID found to delete');
		  return;
		}
	
		axios.delete(`http://${address}:42069/item/deleteItem/${itemId}`)
		.then(response => {
			if (response.status === 200) {

			axios.post(`http://${address}:42069/addLog`, {
				type: "DELETE",
				description: `Deleted an Item: [${selectedItem.iid}] - ${selectedItem.description.name}`
			}, {
				params: {
					uid: user.uid,
					iid: itemId
				}
			})
			.then(response => {
				console.log(response.data);
				
			})
			.catch(error => {
				console.error("Error adding log:", error);
			});
			
			console.log('Item deleted successfully');
			setLoader(Math.random()*1000);
			handleCloseDialog();
			handleCloseOverlay();
			
			} else {
			console.error('Failed to delete item');
			}
		})
		.catch(error => {
			console.error('Error occurred during deletion:', error);
		});
	  };


	  const [updated, setUpdated] = useState(null); 

	  const handleUpdate = async (event) => {
		event.preventDefault();
	
		try {
			if (selectedItem) {

				const url = `http://${address}:42069/item/updateItem/${selectedItem.iid}`;
				await axios.put(url, selectedItem);

				const originalItem = data.find(item => item.iid === selectedItem.iid);

				const changedProperties = [];
				for (const key in selectedItem) {
					if (selectedItem.hasOwnProperty(key) && selectedItem[key] !== originalItem[key]) {
						changedProperties.push(key);
					}
				}

				let description;
				if (changedProperties.length > 0) {
					description = "Updated " + changedProperties.join(", ") + ` of: [${selectedItem.iid}] - ${selectedItem.description.name}`;
				} else {
					description = "Updated nothing";
				}
	
				await axios.post(`http://${address}:42069/addLog`, {
					type: "UPDATE",
					description: description
				}, {
					params: {
						uid: user.uid,
						iid: selectedItem.iid
					}
				})
				.then(response => {
					console.log("Log added successfully:", response.data);
				})
				.catch(error => {
					console.error("Error adding log:", error);
				});
	
				setShowOverlay(false);
				const response = await axios.get(
					`http://${address}:42069/item/getAllItems`
				);
				setData(response.data);
	
				setUpdated(selectedItem);
			}
		} catch (error) {
			console.error("Error updating item:", error);
		}
	};
	
	const handleCloseOverlay = () => {
		setShowOverlay(false);
		setSelectedItem({});
		setLoader(Math.random() * 1000);
	};

	const handleQuantityChange = (e) => {
		const quantity = e.target.value;
		const unitCost = selectedItem.unitCost || 0;
		const totalCost = quantity * unitCost;
		setSelectedItem({ ...selectedItem, quantity, totalCost });
	};

	const handleUnitCostChange = (e) => {
		const value = e.target.value.replace(/,/g, '');
		const unitCost = value;
		const quantity = selectedItem.quantity || 0;
		const totalCost = quantity * (unitCost ? parseFloat(unitCost) : 0);
		
		setSelectedItem({ ...selectedItem, unitCost, totalCost });
	};
	
    return(
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
		<div style={{ display: 'flex', justifyContent: 'flex-end' }}>
		<Button
			type="button"
			variant="contained"
			sx={{ borderRadius: 2, fontFamily: "Poppins", backgroundColor: '#8c383e',   
			color: '#fafafa', 
			'&:hover': {
			backgroundColor: 'darkred', 
		}, }}
			onClick={handleOpenModal}
			startIcon={<AddIcon />}
		>
			<span
				style={{
				position: "relative",
				right: "5px",
				top: "0.5px",
					}}
				>
				
				</span>
			Add Item
		</Button>
		</div>
				
		<TableContainer component={Paper} style={{ maxHeight: '530px', marginLeft: '1px', marginRight: '4px', marginTop: '20px' }}>
			<Table size="small" stickyHeader aria-label="customized table">
			<TableHead>
				<TableRow style={{ position: 'sticky', top: 0, backgroundColor: '#eeeeee', zIndex: 1 }}>
				{columns.map((column) => (
					<TableCell
					key={column}
					style={{ padding: '10px', fontWeight: '600', color: 'black', backgroundColor: '#eeeeee' }}
					>
					{column}
					</TableCell>
				))}
				</TableRow>
			</TableHead>
			<TableBody>
				{data.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={columns.length} style={{ textAlign: 'center', padding: '20px' }}>
                    <Typography variant="body1">There are no item(s) to show</Typography>
                  </TableCell>
                </TableRow>
              ) : (data.map((item) => (
				!item.deleted && (
					<TableRow
					key={item.iid}
					onClick={() => handleRowClick(item)}
					style={{
						backgroundColor: 'white',
						transition: 'background-color 0.3s ease',
					}}
					onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'gray'}
					onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'white'}
					>
					<TableCell>{item.iid}</TableCell>
					<TableCell>{item.accPerson ? `${item.accPerson.fname} ${item.accPerson.lname}` : "N/A"}</TableCell>
					<TableCell>{item.accPerson ? item.accPerson.department : "N/A"}</TableCell>
					<TableCell>{item.accPerson ? item.accPerson.designation : "N/A"}</TableCell>
					<TableCell>{item.description.name}</TableCell>
					<TableCell>{item.invoiceNumber}</TableCell>
					<TableCell>{item.invoiceDate}</TableCell>
					<TableCell>{item.issueOrder}</TableCell>
					<TableCell>{item.quantity + " " + item.unitOfMeasurement}</TableCell>
					<TableCell>{item.remarks}</TableCell>
					<TableCell>{item.status}</TableCell>
					<TableCell>{item.supplier}</TableCell>
					<TableCell>₱{item.totalCost.toLocaleString()}</TableCell>
					<TableCell>₱{item.unitCost.toLocaleString()}</TableCell>
					<TableCell>{item.lifespan}</TableCell>
					<TableCell>{item.consumable ? 'YES' : 'NO'}</TableCell>
					</TableRow>
				)
				))
			)}
			</TableBody>
			</Table>
		</TableContainer>

		<AddItemModal
				showAddItemModal={showAddItemModal}
				handleCloseModal={handleCloseModal}
				formData={formData}
				handleChange={handleChange}
				combinedSubmit={combinedSubmit}
				formatNumber={formatNumber}
				handleBlur={handleBlur}
		/>
		<Button onClick={() => handleRowClick(item)}></Button>
		<OverlayItem
			showOverlay={showOverlay}
			selectedItem={selectedItem}
			setSelectedItem={setSelectedItem}
			handleUpdate={handleUpdate}
			handleQuantityChange={handleQuantityChange}
			handleUnitCostChange={handleUnitCostChange}
			handleCloseOverlay={handleCloseOverlay}
			handleOpenDialog={handleOpenDialog}
			handleCloseDialog={handleCloseDialog}
			openDialog={openDialog}
			handleDelete={handleDelete}
			formatNumber={formatNumber}
		/>   
		</Container>
		</Box>	
	</>
	);
}
