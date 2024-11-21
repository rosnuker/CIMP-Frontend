import axios from "axios";
import { useEffect, useState } from "react";
import PrintIcon from '@mui/icons-material/Print';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { Container, Box, Button, Select, MenuItem, InputLabel, 
FormControl, Toolbar, Table, TableBody, TableCell, 
TableContainer, TableHead, TableRow, Paper, Typography, Dialog, DialogActions, DialogContent, Divider, DialogTitle, TextField } from '@mui/material';
import Overlay from '../page-overlay/Overlay';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import * as XLSX from 'xlsx';
import { useSnackbar } from '../components/SnackbarContext';

export default function Filter( {user, setUser} ) {
    const showSnackbar = useSnackbar();
    const [selectedItem, setSelectedItem] = useState({});
    const [showOverlay, setShowOverlay] = useState(false);
    const [queryResults, setQueryResults] = useState([])
    const [open, setOpen] = useState(false);
  
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
    const [O_issueOrder, setO_issueOrder] = useState([])
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
    const [issueOrder, setIssueOrder] = useState("");
    const [head1, setHead1] = useState('');
    const [pos1, setPos1] = useState('');
    const [acc1, setAcc1] = useState('');
    const [des1, setDes1] = useState('');
    const columns = ["PROPERTY TAG", "ACCOUNTABLE PERSON", "DEPARTMENT", "DESIGNATION", "INVOICE NUMBER", "INVOICE DATE", "ISSUE ORDER NUMBER", "LIFESPAN", "QUANTITY", "REMARKS", "STATUS", "SUPPLIER", "TOTAL COST", "UNIT COST", "UNIT OF MEASURE"];
    
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

    const handleIssueOrder = event => {
      setIssueOrder(event.target.value)
    }
  
    const handleSum = event => {
      setO_sum(event.target.value)
    }
  
    const handleFilter = () => {
      const params = {
          accountablePerson: acc_per || null,
          department: department || null,
          designation: designation || null,
          unitOfMeasurement: uom || null,
          status: status || null,
          supplier: supplier || null,
          building: building || null,
          room: room || null,
          name: name || null,
          model: model || null,
          type: type || null,
          invoiceDate: invoicedate || null,
          lifespan: lifespan || null,
          issueOrder: issueOrder || null
      };
  
      axios
      .get(`http://${address}:8080/item/filter`, { params })
      .then(result => {
          setQueryResults(result.data);
      })
      .catch(error => {
          console.log(error);
          alert("No Data found!");
      });
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

    useEffect(() => {
      fetchO_issueOrder();
    }, []);
  
    const fetchO_issueOrder = async () => {
      try {
        const response = await axios.get(`http://${address}:8080/item/issueOrder`) 
        const uniqueOptions_issueOrder = [...new Set(response.data)] // Remove duplicates
        setO_issueOrder(uniqueOptions_issueOrder)
      } catch (error) {
        console.error("Error fetching options:", error)
      }
    }

    useEffect(() => {
      fetchO_sum();
    }, []);
  
    const fetchO_sum = () => {

      const params = {
        accountablePerson: acc_per || null,
        department: department || null,
        designation: designation || null,
        unitOfMeasurement: uom || null,
        status: status || null,
        supplier: supplier || null,
        building: building || null,
        room: room || null,
        name: name || null,
        model: model || null,
        type: type || null,
        invoiceDate: invoicedate || null,
        lifespan: lifespan || null,
        issueOrder: issueOrder || null
      };

      axios
      .get(`http://${address}:8080/item/sum`, { params })
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
      if(queryResults.length === 0) {
        showSnackbar('There are no item(s) to print!', 'error');
      } else {
        const printableContent = generatePrintableTable();
        const printWindow = window.open('', '_blank');
        printWindow.document.write(printableContent);
        printWindow.document.close();
        printWindow.print();
      }
      handleClose();
    }
    
    const getCurrentDate = () => {
      const date = new Date();
      return date.toLocaleDateString('en-PH', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
      });
  };
    
  //   const formatNumberWithCommas = (num) => {
  //     return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  // };

  const handleExportToExcel = () => {
    const exportData = generateExportDataForExcel();
    const filename = 'test_export.xlsx';

    const userConfirmed = window.confirm("Do you want to download the Excel file?");

    if (userConfirmed) {
      const workbook = XLSX.utils.book_new();
      const worksheet = XLSX.utils.aoa_to_sheet([]);

      const headerRows = generateHeaderRows();
      XLSX.utils.sheet_add_aoa(worksheet, headerRows, { origin: { r: 0, c: 0 } });

      const startRow = headerRows.length;

      XLSX.utils.sheet_add_aoa(worksheet, [columnHeaders], { origin: { r: startRow, c: 0 } });

      XLSX.utils.sheet_add_json(worksheet, exportData, { header: columnHeaders, skipHeader: true, origin: { r: startRow + 1, c: 0 } });

      const columnWidths = calculateColumnWidths(exportData);
      applyColumnWidths(worksheet, columnWidths);

      XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

      XLSX.writeFile(workbook, filename);

      console.log("Export successful");
    } else {
      console.log("Export canceled by user");
    }
  };

  const generateExportDataForExcel = () => {
    return queryResults
      .filter(item => !item.deleted)
      .map(item => ({
        "Property Tag": item.iid || '',
        "Accountable Person": item.accPerson ? `${item.accPerson.fname || ''} ${item.accPerson.lname || ''}` : '',
        "Department": item.department || '',
        "Designation": item.designation || '',
        "Invoice Number": item.invoiceNumber || '',
        "Invoice Date": item.invoiceDate || '',
        "Issue Order Number": item.issueOrder || '',
        "Lifespan": item.lifespan || '',
        "Quantity": item.quantity || '',
        "Remarks": item.remarks || '',
        "Status": item.status || '',
        "Supplier": item.supplier || '',
        "Total Cost": item.totalCost || '',
        "Unit Cost": item.unitCost || '',
        "Unit of Measurement": item.unitOfMeasurement || '',
        "Item Name": item.description ? item.description.name : '',
        "Item Model": item.description ? item.description.model : '',
        "Item Serial Number": item.description ? item.description.serialNumber : '',
        "Item Type": item.description ? item.description.type : '',
        "Item Other Description": item.description ? item.description.other : '',
        "Location Building": item.location ? item.location.building : '',
        "Location Room": item.location ? item.location.room : ''
      }));
  };

  const columnHeaders = [
    'Property Tag',
    'Accountable Person',
    'Department',
    'Designation',
    'Invoice Number',
    'Invoice Date',
    'Issue Order Number',
    'Lifespan',
    'Quantity',
    'Remarks',
    'Status',
    'Supplier',
    'Total Cost',
    'Unit Cost',
    'Unit of Measurement',
    'Item Name',
    'Item Model',
    'Item Serial Number',
    'Item Type',
    'Item Other Description',
    'Location Building',
    'Location Room'
  ];


  const calculateColumnWidths = (data) => {
    const widths = {};

    columnHeaders.forEach(header => {
      widths[header] = header.length;
    });

    data.forEach(row => {
      columnHeaders.forEach(header => {
        const value = row[header] ? row[header].toString() : '';
        widths[header] = Math.max(widths[header] || 0, value.length);
      });
    });

    return widths;
  };

  const applyColumnWidths = (worksheet, widths) => {
    worksheet['!cols'] = columnHeaders.map(header => ({
      wch: (widths[header] || 10) + 2
    }));
  };

  const generateHeaderRows = () => {
    return [
      ['CIT U INVENTORY MANAGEMENT PORTAL'],
      ['2024'],
      []
    ];
  };
  
  const generatePrintableTable = () => {
    const currentDate = getCurrentDate();
    let printableContent = `
        <style>
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

    .property-custodian {
        border-top: 2px solid #000;
        margin-top: 15px;
        margin-bottom: 10px;
        width: 60%;
        margin-left: 0;
    }

    .finance-director {
        border-top: 2px solid #000;
        margin-top: 15px;
        margin-bottom: 10px;
        width: 70%;
        margin-left: auto;
        margin-right: auto;
    }

    .accountable-person {
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
      
    <h2>
        <span class="institute">CEBU INSTITUTE OF TECHNOLOGY - UNIVERSITY</span>   
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
        NO.&nbsp${queryResults[0].issueOrder}
        <br />
        <br />
         <span>Date: ${currentDate}</span>
    </div>
</div>

<div class="issued-section">
    <div class="issued-left">Issued by: TINA</div>
    <div class="department-container">
    <div>${queryResults[0].department}</div>
        <div class="department-line"></div>
        <div class="department-text">Department</div>
    </div>
</div>

<div class="details-section">
    <div class="details-item">Purchased From:</div> 
    <div class="details-item">Invoice Date:&nbsp${queryResults[0].invoiceDate}</div>
    <div class="details-item">Inv No.&nbsp&nbsp&nbsp&nbsp${queryResults[0].invoiceNumber}&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</div> <!-- Display only one invoice number --> 
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
                <td>${item.unitCost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                <td>${item.totalCost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
            </tr>
        `;
    });
    printableContent += `
            <tr style ="height:29px">
              <td></td><td></td><td></td><td></td>
            </tr>
            <tr>
              <td></td>
              <td>>>>nothing follows<<<  </td>
              <td></td><td></td>
            </tr>
            <tr style ="height:30px">
              <td></td><td></td><td></td><td></td>
            </tr>
            <tr style ="height:30px">
              <td></td>
              <td colspan="2">I/We acknowledge to have received from the Property Custodian's Office</td>
              <td></td>
            </tr>
            <tr style ="height:30px">
              <td></td>
              <td colspan="2"> the above listed property which will be used for the &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp FAO    </td>
              <td></td>
            </tr>
            <tr style ="height:30px">
              <td></td>
              <td colspan="2">and for which I/We am/ are accountable</td>
             <td>${O_sum.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
            </tr>
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
      <div>Engr. Nicarter V. Teves</div>
        <div class="property-custodian"></div>
        Property Custodian
    </div>
    <div class="footer-item">
    <div>${head1}</div>
        <div class="finance-director"></div>
        ${pos1}
    </div>
    <div class="footer-item">
      <div>${acc1}</div>
        <div class="accountable-person"></div>
        <div>${des1}</div>
    </div>
</div>
    `;

    return printableContent;
  }
  
  // <div>${queryResults[0].acc_per ? `${queryResults[0].acc_per.fname} ${queryResults[0].acc_per.lname}` : ""}</div>
  
    const handleRowClick = (item) => {
      setSelectedItem(item);
      setShowOverlay(true);
    };
  
  
    const handleCloseOverlay = () => {
      setShowOverlay(false);
      setSelectedItem({}); // Reset selectedItem to an empty object
    };

    const handleClickOpenPrint = () => {
      setOpen(true);
    };
  
    // Function to handle closing the modal
    const handleClose = () => {
      setOpen(false);
      setHead1('');
      setPos1('');
      setAcc1('');
      setDes1('');
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
            <Select
            value={acc_per}
            onChange={handleaccPer} 
            label="Accountable Person"
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
            <Select
            value={department} 
            onChange={handleDep} 
            label="Department"
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: 400, 
                  overflow: 'auto',
                },
              },
            }}>
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
            <Select 
            value={designation}
            onChange={handleDes} 
            label="Designation"
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: 400, 
                  overflow: 'auto',
                },
              },
            }}>
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
            <Select
            value={uom}
            onChange={handleUom} 
            label="Uom"
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: 400, 
                  overflow: 'auto',
                },
              },
            }}>
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
            <Select 
            value={status}
            onChange={handleStat} 
            label="Status"
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: 400, 
                  overflow: 'auto',
                },
              },
            }}>
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
            <Select 
            value={supplier}
            onChange={handleSupp} 
            label="Supplier"
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: 400, 
                  overflow: 'auto',
                },
              },
            }}>
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
            <InputLabel>Inventory Location</InputLabel>
            <Select 
            value={building}
            onChange={handleBuilding} 
            label="Location Building"
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: 400, 
                  overflow: 'auto',
                },
              },
            }}>
              <MenuItem value="">Inventory Location</MenuItem>
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
            <Select 
            value={room}
            onChange={handleRoom} 
            label="Location Room"
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: 400, 
                  overflow: 'auto',
                },
              },
            }}>
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
            <Select
            value={name} 
            onChange={handleName} 
            label="Description Name"
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: 400, 
                  overflow: 'auto',
                },
              },
            }}>
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
            <Select 
            value={model}
            onChange={handleModel} 
            label="Description Model"
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: 400, 
                  overflow: 'auto',
                },
              },
            }}>
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
            <Select 
            value={type}
            onChange={handleType} 
            label="Description Type"
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: 400, 
                  overflow: 'auto',
                },
              },
            }}>
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
            <Select 
            value={invoicedate}
            onChange={handleInvoice} 
            label="Invoice Date"
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: 400, 
                  overflow: 'auto',
                },
              },
            }}>
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
            <Select 
            value={lifespan}
            onChange={handleLifespan} 
            label="Lifespan"
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: 400, 
                  overflow: 'auto',
                },
              },
            }}>
              <MenuItem value="">Lifespan</MenuItem>
              {O_lifespan.map((O_lifespans, index) => (
                <MenuItem key={index} value={O_lifespans}>
                  {O_lifespans}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Issue Order */}
          <FormControl sx={{ minWidth: 190 }}>
            <InputLabel>Issue Order</InputLabel>
            <Select 
            value={issueOrder}
            onChange={handleIssueOrder} 
            label="Issue Order"
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: 400, 
                  overflow: 'auto',
                },
              },
            }}>
              <MenuItem value="">Issue Order</MenuItem>
              {O_issueOrder.map((O_issueOrders, index) => (
                <MenuItem key={index} value={O_issueOrders}>
                  {O_issueOrders}
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
          onClick={handleClickOpenPrint}
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
        <Button
          variant="outlined"
          sx={{
            color: 'black',
            borderColor: '#f8c702',
            backgroundColor: '#f8c702',
            ml: 0.6,
            '&:hover': {
              backgroundColor: '#e0b600',
              borderColor: '#e0b600',
            },
          }}
          onClick={handleExportToExcel}
        >
          Export to Excel <FileDownloadIcon />
        </Button>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <Typography
          component="label"
          id="sumLabel"
          onChange={handleSum}
          sx={{ fontWeight: 'bold', fontFamily: 'Arial, sans-serif', mt: 0.7 }}
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
          {queryResults.length === 0 ? (
            <TableRow>
              <TableCell colSpan={columns.length} style={{ textAlign: 'center', padding: '20px' }}>
                There are no item(s) to show
              </TableCell>
            </TableRow>
          ) : (
            queryResults.map((item) => (
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
            ))
          )}
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
         {/* Dialog (Modal) */}
         <Dialog open={open} onClose={handleClose}>
      <DialogTitle>
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
              Enter Additional Details
            </Typography>
            <Divider sx={{ marginBottom: 2 }} />
          </DialogTitle>
        <DialogContent>  
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Head"
            value={head1}
            onChange={(e) => setHead1(e.target.value)} 
            type="text"
            fullWidth
            variant="outlined"
          />
          <TextField
            margin="dense"
            id="email"
            label="Position"
            value={pos1}
            onChange={(e) => setPos1(e.target.value)} 
            type="email"
            fullWidth
            variant="outlined"
          />
          <TextField
            margin="dense"
            id="phone"
            label="Accountable Person"
            type="tel"
            fullWidth
            variant="outlined"
            //value={acc_per}
            //onChange={handleaccPer} 
            value={acc1}
            onChange={(e) => setAcc1(e.target.value)}
          />
          <TextField
            margin="dense"
            id="address"
            label="Designation"
            type="text"
            fullWidth
            variant="outlined"
            //value={designation}
            //onChange={handleDes}
            value={des1}
            onChange={(e) => setDes1(e.target.value)} 
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}
              variant="contained"
              sx={{
                marginRight: 1,
                marginBottom: 2,
                marginRight: 43,
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
            variant="outlined"
            onClick={handlePrintTable}
            sx={{
              marginRight: 3,
              marginBottom: 2,
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
        </DialogActions>
      </Dialog>
      </>
    ); 
  }
