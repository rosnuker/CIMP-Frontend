import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import PrintIcon from '@mui/icons-material/Print';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { Container, Box, TextField, Button, Select, MenuItem, InputLabel, 
FormControl, Toolbar, InputAdornment, IconButton, Table, TableBody, TableCell, 
TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import Overlay from '../page-overlay/Overlay';



export default function Filter( {user, setUser} ) {
    const [selectedItem, setSelectedItem] = useState({});
    const [showOverlay, setShowOverlay] = useState(false);
    const [queryResults, setQueryResults] = useState([])
  
    const [O_accPer, setO_accPer] = useState([])
    const [O_dep, setO_dep] = useState([])
    const [O_des, setO_des] = useState([])
    const [O_uom, setO_uom] = useState([])
    const [O_status, setO_status] = useState([])
    const [O_supp, setO_supp] = useState([])
    const [O_building, setO_building] = useState([])
    const [O_room, setO_room] = useState([])
    const [O_name, setO_name] = useState([])
    const [O_model, setO_model] = useState([])
    const [O_type, setO_type] = useState([])
    const [O_invoicedate, setO_invoicedate] = useState([])
    const [O_lifespan, setO_lifespan] = useState([])
    const [O_sum, setO_sum] = useState([])
  
    const [acc_per, setacc_per] = useState("")
    const [department, setdepartment] = useState("")
    const [designation, setdesignation] = useState("")
    const [status, setstatus] = useState("")
    const [uom, setuom] = useState("")
    const [supplier, setsupplier] = useState("")
    const [building, setbuilding] = useState("")
    const [room, setroom] = useState("")
    const [name, setname] = useState("")
    const [model, setmodel] = useState("")
    const [type, settype] = useState("")
    const [invoicedate, setinvoicedate] = useState("")
    const [lifespan, setlifespan] = useState("")
  
    const columns = ["PROPERTY TAG", "ACCOUNTABLE PERSON", "DEPARTMENT", "DESIGNATION", "INVOICE NUMBER", "INVOICE DATE", "ISSUE ORDER NUMBER", "LIFESPAN", "QUANTITY", "REMAKRS", "STATUS", "SUPPLIER", "TOTAL COST", "UNIT COST", "UNIT OF MEASURE"];
  
    const address = getIpAddress();
      
    function getIpAddress() {
      const hostname = window.location.hostname;
  
      const indexOfColon = hostname.indexOf(':');
  
      if(indexOfColon !== -1) {
        return hostname.substring(0, indexOfColon);
      }
  
      return hostname;
    }
  
    useEffect(() => {
      const fetchItemsData = async () => {
          try {
              const response = await axios.get(
                  `http://${address}:8080/item/getAllItems`
              );
              setQueryResults(response.data);
          } catch (error) {
              console.error("Error fetching data:", error);
          }
      };
  
      fetchItemsData();
    }, []);
  
    const handleaccPer = event => {
      setacc_per(event.target.value)
    }
  
    const handleDep = event => {
      setdepartment(event.target.value)
    }
  
    const handleDes = event => {
      setdesignation(event.target.value)
    }
  
    const handleStat = event => {
      setstatus(event.target.value)
    }
  
    const handleUom = event => {
      setuom(event.target.value)
    }
  
    const handleSupp = event => {
      setsupplier(event.target.value)
    }
  
    const handleBuilding = event => {
      setbuilding(event.target.value)
    }
  
    const handleRoom = event => {
      setroom(event.target.value)
    }
  
    const handleName = event => {
      setname(event.target.value)
    }
  
    const handleType = event => {
      settype(event.target.value)
    }
  
    const handleModel = event => {
      setmodel(event.target.value)
    }
  
    const handleInvoice = event => {
      setinvoicedate(event.target.value)
    }
  
    const handleLifespan = event => {
      setlifespan(event.target.value)
    }
  
    const handleSum = event => {
      setO_sum(event.target.value)
    }
    
    const handleFilter = () => {
        //console.log({ acc_per,department,designation,status,uom,supplier,building,room,name,model,type,invoicedate,lifespan })
  
          axios
          .get(`http://${address}:8080/item/filter`, {
            params: {
              acc_per: acc_per,
              department: department,
              designation: designation,
              status: status,
              uom: uom,
              supplier: supplier,
              building: building,
              room: room,
              name: name,
              model: model,
              type: type,
              invoice_date: invoicedate,
              lifespan: lifespan
            }
          })
          .then(result => {
            setQueryResults(result.data)
          })
          .catch(error => {
            console.log(error)
            alert("No Data found!")
          })
      }
      
      
    useEffect(() => {
        fetchO_accPer();
      }, []);
  
    const fetchO_accPer = async () => {
      try {
        const response = await axios.get(`http://${address}:8080/item/accPer`) 
        const uniqueOptions_accPer = [...new Set(response.data)] // Remove duplicates
        setO_accPer(uniqueOptions_accPer)
      } catch (error) {
        console.error("Error fetching options:", error)
      }
    }
  
    useEffect(() => {
      fetchO_dep();
    }, []);
  
    const fetchO_dep = async () => {
    try {
      const response = await axios.get(`http://${address}:8080/item/dep`) 
      const uniqueOptions_dep = [...new Set(response.data)] // Remove duplicates
      setO_dep(uniqueOptions_dep)
    } catch (error) {
      console.error("Error fetching options:", error)
    }
    }
  
    useEffect(() => {
      fetchO_des();
    }, []);
  
    const fetchO_des = async () => {
    try {
      const response = await axios.get(`http://${address}:8080/item/des`) 
      const uniqueOptions_des = [...new Set(response.data)] // Remove duplicates
      setO_des(uniqueOptions_des)
    } catch (error) {
      console.error("Error fetching options:", error)
    }
    }
  
    useEffect(() => {
      fetchO_uom();
    }, []);
  
    const fetchO_uom = async () => {
    try {
      const response = await axios.get(`http://${address}:8080/item/uom`) 
      const uniqueOptions_uom = [...new Set(response.data)] // Remove duplicates
      setO_uom(uniqueOptions_uom)
    } catch (error) {
      console.error("Error fetching options:", error)
    }
    }
  
    useEffect(() => {
      fetchO_stat();
    }, []);
  
    const fetchO_stat = async () => {
    try {
      const response = await axios.get(`http://${address}:8080/item/status`) 
      const uniqueOptions_stat = [...new Set(response.data)] // Remove duplicates
      setO_status(uniqueOptions_stat)
    } catch (error) {
      console.error("Error fetching options:", error)
    }
    }
  
    useEffect(() => {
      fetchO_supp();
    }, []);
  
    const fetchO_supp = async () => {
    try {
      const response = await axios.get(`http://${address}:8080/item/supplier`) 
      const uniqueOptions_suppp = [...new Set(response.data)] // Remove duplicates
      setO_supp(uniqueOptions_suppp)
    } catch (error) {
      console.error("Error fetching options:", error)
    }
    }
  
    useEffect(() => {
      fetchO_building();
    }, []);
  
    const fetchO_building = async () => {
    try {
      const response = await axios.get(`http://${address}:8080/item/building`) 
      const uniqueOptions_building = [...new Set(response.data)] // Remove duplicates
      setO_building(uniqueOptions_building)
    } catch (error) {
      console.error("Error fetching options:", error)
    }
    }
  
    useEffect(() => {
      fetchO_room();
    }, []);
  
    const fetchO_room = async () => {
    try {
      const response = await axios.get(`http://${address}:8080/item/room`) 
      const uniqueOptions_room = [...new Set(response.data)] // Remove duplicates
      setO_room(uniqueOptions_room)
    } catch (error) {
      console.error("Error fetching options:", error)
    }
    }
  
    useEffect(() => {
      fetchO_name();
    }, []);
  
    const fetchO_name = async () => {
    try {
      const response = await axios.get(`http://${address}:8080/item/name`) 
      const uniqueOptions_name = [...new Set(response.data)] // Remove duplicates
      setO_name(uniqueOptions_name)
    } catch (error) {
      console.error("Error fetching options:", error)
    }
    }
  
    useEffect(() => {
      fetchO_model();
    }, []);
  
    const fetchO_model = async () => {
    try {
      const response = await axios.get(`http://${address}:8080/item/model`) 
      const uniqueOptions_model = [...new Set(response.data)] // Remove duplicates
      setO_model(uniqueOptions_model)
    } catch (error) {
      console.error("Error fetching options:", error)
    }
    }
  
    useEffect(() => {
      fetchO_type();
    }, []);
  
    const fetchO_type = async () => {
    try {
      const response = await axios.get(`http://${address}:8080/item/type`) 
      const uniqueOptions_type = [...new Set(response.data)] // Remove duplicates
      setO_type(uniqueOptions_type)
    } catch (error) {
      console.error("Error fetching options:", error)
    }
    }
  
    useEffect(() => {
      fetchO_invoice();
    }, []);
  
    const fetchO_invoice = async () => {
    try {
      const response = await axios.get(`http://${address}:8080/item/invoice`) 
      const uniqueOptions_invoice = [...new Set(response.data)] // Remove duplicates
      setO_invoicedate(uniqueOptions_invoice)
    } catch (error) {
      console.error("Error fetching options:", error)
    }
    }
  
    useEffect(() => {
      fetchO_lifespan();
    }, []);
  
    const fetchO_lifespan = async () => {
    try {
      const response = await axios.get(`http://${address}:8080/item/lifespan`) 
      const uniqueOptions_lifespan = [...new Set(response.data)] // Remove duplicates
      setO_lifespan(uniqueOptions_lifespan)
    } catch (error) {
      console.error("Error fetching options:", error)
    }
    }
  
    const fetchO_sum = () => {
        axios
        .get(`http://${address}:8080/item/sum`, {
          params: {
            acc_per: acc_per,
            department: department,
            designation: designation,
            status: status,
            uom: uom,
            supplier: supplier,
            building: building,
            room: room,
            name: name,
            model: model,
            type: type,
            invoice_date: invoicedate,
            lifespan: lifespan
          }
        })
        .then(result => {
          setO_sum(result.data)
        })
        .catch(error => {
          console.log(error)
          alert("No Data Found!")
  
          setO_sum("")
        })
    };
  
    const handlePrintTable = () => {
      const printableContent = generatePrintableTable();
      const printWindow = window.open('', '_blank');
      printWindow.document.write(printableContent);
      printWindow.document.close();
      printWindow.print();
    }
  
    const generatePrintableTable = () => {
      let printableContent = `
          <style>
      @media print {
          body {
              width: 5.5in;
              height: 8.5in;
              margin: 0; 
              padding: 10px; 
              page-break-inside: avoid; 
          }
      }
  
      table {
          border-collapse: collapse;
          width: 100%;
      }
  
      th, td {
          border: 1px solid #dddddd;
          text-align: left;
          padding: 8px;
      }
  
      th {
          background-color: #f2f2f2;
      }
  
      .footer-section {
          display: flex;
          justify-content: space-between;
          margin-top: 20px;
          width: 100%;
      }
  
      .footer-item {
          width: 33%;
          text-align: center;
      }
  
      .footer-item:first-child {
          text-align: left;
      }
  
      .footer-item:last-child {
          text-align: right;
      }
  
      .line-1 {
          border-top: 2px solid #000;
          margin-top: 15px;
          margin-bottom: 10px;
          width: 60%;
          margin-left: 0;
      }
  
      .line-2 {
          border-top: 2px solid #000;
          margin-top: 15px;
          margin-bottom: 10px;
          width: 70%;
          margin-left: auto;
          margin-right: auto;
      }
  
      .line-3 {
          border-top: 2px solid #000;
          margin-top: 15px;
          margin-bottom: 10px;
          width: 50%;
          margin-right: 0;
          margin-left: auto;
      }
  
      .header {
          text-align: center;
          margin-bottom: 20px;
      }
      
      .header img {
        width: 120px; 
        display: block;
        margin: 0 auto 10px auto; 
    }
      
      
      .header .institute {
          text-decoration: underline; 
      }
  
      .header .university,
      .header .issue-order {
          display: block;
          margin-top: 5px; 
      }
  
      .header .issue-order {
          font-weight: bold;
          text-decoration: underline; 
      }
  
      .instruction-section {
          display: flex;
          align-items: center; 
          margin-top: 10px;
      }
  
      .instruction-left {
          font-weight: bold;
          margin-right: 5px; 
          white-space: nowrap; 
      }
  
      .instruction-right {
          text-align: left; 
      }
  
      .no-section {
          text-align: right; 
          margin-left: auto; 
          font-weight: bold;
      }
  
      .issued-section {
          display: flex;
          flex-direction: column;
          margin-top: 5px;
      }
  
      .issued-left {
          font-weight: bold;
      }
  
      .department-container {
          display: flex;
          flex-direction: column;
          align-items: flex-end; 
          margin-top: 10px; 
      }
  
      .department-line {
          border-top: 1px solid #000;
          width: 120px; 
          margin-bottom: 5px;
      }
  
      .department-text {
          text-align: center; 
          margin-right: 10px;
      }
  
      .details-section {
          display: flex;
          justify-content: space-between;
          margin-top: 10px;
      }
  
      .details-item {
          width: 33%;
          text-align: center; 
      }
  
      .details-item:first-child {
          text-align: left; 
      }
  
      .details-item:last-child {
          text-align: right; 
      }
  </style>
  
  <div class="header">
        <img src="/src/assets/cit.png" alt="Logo">
      <h2>
          <span class="institute">CEBU INSTITUTE OF TECHNOLOGY</span>
          <span class="university">UNIVERSITY</span>
          <span class="issue-order">ISSUE ORDER</span>
      </h2>
  </div>
  
  <div class="instruction-section">
      <div class="instruction-left">
          STOREKEEPER:
      </div>
      <div class="instruction-right">
          <span>Please issue to the bearer the <br>
          materials and/or supplies<br>
          Listed below:</span>
      </div>
      <div class="no-section">
          NO.
      </div>
  </div>
  
  <div class="issued-section">
      <div class="issued-left">Issued by:</div>
      <div class="department-container">
          <div class="department-line"></div>
          <div class="department-text">Department</div>
      </div>
  </div>
  
  <div class="details-section">
      <div class="details-item">Purchased From:</div>
      <div class="details-item">Date:</div>
      <div class="details-item">Inv No.</div>
  </div>
  
  <table>
      <thead>
          <tr>
              <th>QUANTITY</th>
              <th>ARTICLE / Description</th>
              <th>UNIT COST</th>
              <th>TOTAL COST</th>
          </tr>
      </thead>
      <tbody>
      `;
      queryResults.forEach(item => {
          printableContent += `
              <tr>
                  <td>${item.quantity}</td>
                  <td>${item.description ? item.description.name : 'None'}</td>
                  <td>${item.unitCost}</td>
                  <td>${item.totalCost}</td>
              </tr>
          `;
      });
      printableContent += `
              </tbody>
          </table>
          <div class="footer-section">
      <div class="footer-item">
          Approved by
      </div>
      <div class="footer-item">
          Noted by
      </div>
      <div class="footer-item">
          Received by
      </div>
  </div>
  
  <div class="footer-section">
      <div class="footer-item">
          <div class="line-1"></div>
          Property Custodian
      </div>
      <div class="footer-item">
          <div class="line-2"></div>
          Finance Director
      </div>
      <div class="footer-item">
          <div class="line-3"></div>
          Liaison Officer
      </div>
  </div>
  
          // <p>Total Cost: ${O_sum}</p>
      `;
  
      return printableContent;
    }
  
    const handleRowClick = (item) => {
      setSelectedItem(item);
      setShowOverlay(true);
    };
  
  
    const handleCloseOverlay = () => {
      setShowOverlay(false);
      setSelectedItem({}); // Reset selectedItem to an empty object
    };
  
      return (
          <>
          {/* <Home user={user} setUser={setUser} /> */}
  
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
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4, }}>
            <Box sx={{ ml: 0, mt: 5 }}>
        <Box sx={{ p: 2, mt: 1, display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 2 }}>
         
          {/* Accountable Person */}
          <FormControl sx={{ minWidth: 190 }}>
            <InputLabel>Accountable Person</InputLabel>
            <Select onChange={handleaccPer} label="Accountable Person"
            MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 400, 
                    overflow: 'auto',
                  },
                },
              }}>
              <MenuItem value="">Accountable Person</MenuItem>
              {O_accPer.map((O_accPers, index) => (
                <MenuItem key={index} value={O_accPers}>
                  {O_accPers}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
  
          {/* Department */}
          <FormControl sx={{ minWidth: 190 }}>
            <InputLabel>Department</InputLabel>
            <Select onChange={handleDep} label="Department">
              <MenuItem value="">Department</MenuItem>
              {O_dep.map((O_deps, index) => (
                <MenuItem key={index} value={O_deps}>
                  {O_deps}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
  
          {/* Designation */}
          <FormControl sx={{ minWidth: 190 }}>
            <InputLabel>Designation</InputLabel>
            <Select onChange={handleDes} label="Designation">
              <MenuItem value="">Designation</MenuItem>
              {O_des.map((O_dess, index) => (
                <MenuItem key={index} value={O_dess}>
                  {O_dess}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
  
          {/* UOM */}
          <FormControl sx={{ minWidth: 190 }}>
            <InputLabel>Uom</InputLabel>
            <Select onChange={handleUom} label="Uom">
              <MenuItem value="">Uom</MenuItem>
              {O_uom.map((O_uoms, index) => (
                <MenuItem key={index} value={O_uoms}>
                  {O_uoms}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
  
          {/* Status */}
          <FormControl sx={{ minWidth: 190 }}>
            <InputLabel>Status</InputLabel>
            <Select onChange={handleStat} label="Status">
              <MenuItem value="">Status</MenuItem>
              {O_status.map((O_statuss, index) => (
                <MenuItem key={index} value={O_statuss}>
                  {O_statuss}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
  
          {/* Supplier */}
          <FormControl sx={{ minWidth: 190 }}>
            <InputLabel>Supplier</InputLabel>
            <Select onChange={handleSupp} label="Supplier">
              <MenuItem value="">Supplier</MenuItem>
              {O_supp.map((O_supps, index) => (
                <MenuItem key={index} value={O_supps}>
                  {O_supps}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
  
          {/* Location Building */}
          <FormControl sx={{ minWidth: 190 }}>
            <InputLabel>Location Building</InputLabel>
            <Select onChange={handleBuilding} label="Location Building">
              <MenuItem value="">Location Building</MenuItem>
              {O_building.map((O_buildings, index) => (
                <MenuItem key={index} value={O_buildings}>
                  {O_buildings}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
  
          {/* Location Room */}
          <FormControl sx={{ minWidth: 190 }}>
            <InputLabel>Location Room</InputLabel>
            <Select onChange={handleRoom} label="Location Room">
              <MenuItem value="">Location Room</MenuItem>
              {O_room.map((O_rooms, index) => (
                <MenuItem key={index} value={O_rooms}>
                  {O_rooms}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
  
          {/* Description Name */}
          <FormControl sx={{ minWidth: 190 }}>
            <InputLabel>Description Name</InputLabel>
            <Select onChange={handleName} label="Description Name">
              <MenuItem value="">Description Name</MenuItem>
              {O_name.map((O_names, index) => (
                <MenuItem key={index} value={O_names}>
                  {O_names}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
  
          {/* Description Model */}
          <FormControl sx={{ minWidth: 190 }}>
            <InputLabel>Description Model</InputLabel>
            <Select onChange={handleModel} label="Description Model">
              <MenuItem value="">Description Model</MenuItem>
              {O_model.map((O_models, index) => (
                <MenuItem key={index} value={O_models}>
                  {O_models}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
  
          {/* Description Type */}
          <FormControl sx={{ minWidth: 190 }}>
            <InputLabel>Description Type</InputLabel>
            <Select onChange={handleType} label="Description Type">
              <MenuItem value="">Description Type</MenuItem>
              {O_type.map((O_types, index) => (
                <MenuItem key={index} value={O_types}>
                  {O_types}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
  
          {/* Invoice Date */}
          <FormControl sx={{ minWidth: 190 }}>
            <InputLabel>Invoice Date</InputLabel>
            <Select onChange={handleInvoice} label="Invoice Date">
              <MenuItem value="">Invoice Date</MenuItem>
              {O_invoicedate
                .sort((a, b) => new Date(a) - new Date(b)) // Sort the dates in ascending order
                .map((invoicedate, index) => (
                  <MenuItem key={index} value={invoicedate}>
                    {invoicedate}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
  
          {/* Lifespan */}
          <FormControl sx={{ minWidth: 190 }}>
            <InputLabel>Lifespan</InputLabel>
            <Select onChange={handleLifespan} label="Lifespan">
              <MenuItem value="">Lifespan</MenuItem>
              {O_lifespan.map((O_lifespans, index) => (
                <MenuItem key={index} value={O_lifespans}>
                  {O_lifespans}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'start', ml: 2, mt: 2 }}>
        <Button
          variant="outlined"
          onClick={() => { handleFilter(); fetchO_sum();
          }}
          sx={{
            color: 'black',
            borderColor: '#f8c702',
            backgroundColor: '#f8c702',
            '&:hover': {
              backgroundColor: '#e0b600',
              borderColor: '#e0b600',
            },
          }}
        >
          Filter
          <FilterAltIcon />
        </Button>
        &nbsp;
        <Button
          variant="outlined"
          onClick={handlePrintTable}
          sx={{
            color: 'black',
            borderColor: '#f8c702',
            backgroundColor: '#f8c702',
            '&:hover': {
              backgroundColor: '#e0b600',
              borderColor: '#e0b600',
            },
          }}
        >
          Print
          <PrintIcon />
        </Button>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <Typography
          component="label"
          id="sumLabel"
          onChange={handleSum}
          sx={{ fontWeight: 'bold', fontFamily: 'Arial, sans-serif' }}
        >
          Total Cost: ₱{Number(O_sum).toLocaleString()}
        </Typography>
      </Box>
  
      <TableContainer component={Paper} style={{ maxHeight: '500px', marginLeft: '15px', marginRight: '4px', marginTop: '10px' }}>
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
          {queryResults.map((item) => (
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
                <TableCell>{item.accPerson}</TableCell>
                <TableCell>{item.department}</TableCell>
                <TableCell>{item.designation}</TableCell>
                <TableCell>{item.invoiceNumber}</TableCell>
                <TableCell>{item.invoiceDate}</TableCell>
                <TableCell>{item.issueOrder}</TableCell>
                <TableCell>{item.lifespan}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>{item.remarks}</TableCell>
                <TableCell>{item.status}</TableCell>
                <TableCell>{item.supplier}</TableCell>
                <TableCell>₱{item.totalCost.toLocaleString()}</TableCell>
                <TableCell>₱{item.unitCost.toLocaleString()}</TableCell>
                <TableCell>{item.unitOfMeasurement}</TableCell>
              </TableRow>
            )
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <div>
        <Button onClick={() => handleRowClick(someItem)}> </Button>
            <Overlay
                showOverlay={showOverlay}
                selectedItem={selectedItem}
                handleCloseOverlay={handleCloseOverlay}
            />
        </div>
    </Container>
</Box>
      </>
    ); 
  }
  
  