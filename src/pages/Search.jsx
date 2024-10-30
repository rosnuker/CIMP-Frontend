import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@mui/material";
import PrintIcon from '@mui/icons-material/Print';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { Container, Box, Toolbar, TextField, InputAdornment, IconButton, TableContainer, TableHead, TableRow, Paper, Table, TableBody, TableCell, } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Overlay from '../page-overlay/Overlay';
import * as XLSX from 'xlsx';

export default function Search( {user, setUser} ) {

    const [search, setSearch] = useState("");
    const [queryResults, setQueryResults] = useState([])
    const [selectedItem, setSelectedItem] = useState({});
    const [showOverlay, setShowOverlay] = useState(false);
    
    const address = getIpAddress();
	
	function getIpAddress() {
		const hostname = window.location.hostname;

		const indexOfColon = hostname.indexOf(':');

		if(indexOfColon !== -1) {
			return hostname.substring(0, indexOfColon);
		}

		return hostname;
	}

    const handleSearch = event =>{
        setSearch(event.target.value);
    }

    const handleFetchSearch = () =>{
        axios.get(`http://${address}:8080/item/search`,{
            params: {
                search: search
            }
        })
        .then(result => {
            setQueryResults(result.data)
         })
         .catch(error => {
            console.log(error)
            alert("service error")
         })
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
    
    // const generateExportDataForExcel = () => {
    //     return queryResults
    //         .filter(item => !item.deleted)
    //         .map(item => ({
    //             "Property Tag": item.iid || '', 
    //             "Invoice Number": item.invoiceNumber || '',
    //             "Issue Order Number": item.issueOrder || '',
    //             "Serial Number": item.description ? item.description.serialNumber : 'None'
    //         }));
    // };
    const generateExportDataForExcel = () => {
      return queryResults
          .filter(item => !item.deleted)
          .map(item => ({
              "Property Tag": item.iid || '',
              "Accountable Person": item.accPerson.fname + " " + item.accPerson.lname || '',
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
      
    const columnHeaders = [
      'Property Tag',
      'Invoice Number',
      'Issue Order Number',
      'Serial Number'
    ];


  

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
          </style>
          <table>
              <thead>
                  <tr>
                      <th>Property Tag</th>
                      <th>Accountable Person</th>
                      <th>Department</th>
                      <th>Designation</th>
                      <th>Invoice Number</th>
                      <th>Invoice Date</th>
                      <th>Issue Order Number</th>
                      <th>Lifespan</th>
                      <th>Quantity</th>
                      <th>Remarks</th>
                      <th>Status</th>
                      <th>Supplier</th>
                      <th>Total Cost</th>
                      <th>Unit Cost</th>
                      <th>Unit of Measurement</th>
                      <th>Item Name</th>
                      <th>Item Model</th>
                      <th>Serial Number</th>
                      <th>Item Type</th>
                      <th>Other Description</th>
                      <th>Location Building</th>
                      <th>Location Room</th>
                  </tr>
              </thead>
              <tbody>
      `;
      queryResults.forEach(item => {
          printableContent += `
              <tr>
                  <td>${item.iid || ''}</td>
                  <td>${item.accPerson.fname + " " + item.accPerson.lname || ''}</td>
                  <td>${item.department || ''}</td>
                  <td>${item.designation || ''}</td>
                  <td>${item.invoiceNumber || ''}</td>
                  <td>${item.invoiceDate || ''}</td>
                  <td>${item.issueOrder || ''}</td>
                  <td>${item.lifespan || ''}</td>
                  <td>${item.quantity || ''}</td>
                  <td>${item.remarks || ''}</td>
                  <td>${item.status || ''}</td>
                  <td>${item.supplier || ''}</td>
                  <td>${item.totalCost || ''}</td>
                  <td>${item.unitCost || ''}</td>
                  <td>${item.unitOfMeasurement || ''}</td>
                  <td>${item.description ? item.description.name : ''}</td>
                  <td>${item.description ? item.description.model : ''}</td>
                  <td>${item.description ? item.description.serialNumber : ''}</td>
                  <td>${item.description ? item.description.type : ''}</td>
                  <td>${item.description ? item.description.other : ''}</td>
                  <td>${item.location ? item.location.building : ''}</td>
                  <td>${item.location ? item.location.room : ''}</td>
              </tr>
          `;
      });
      printableContent += `
              </tbody>
          </table>
      `;
      return printableContent;
  };
  
  

      const renderTableHeader = () => (
        <TableRow style={{ position: 'sticky', top: 0 }}>
          {columnHeaders.map((header) => (
            <TableCell key={header} style={{ padding: '16px', fontWeight: 'bold', color: 'black', backgroundColor: '#eeeeee', }}> 
              {header} 
            </TableCell> //color sa table header
          ))}
        </TableRow>
      );

    const handleRowClick = (item) => {
        setSelectedItem(item);
        setShowOverlay(true);
      };
    
      const handleCloseOverlay = () => {
        setShowOverlay(false);
        setSelectedItem({}); // Reset selectedItem to an empty object
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
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4, }}>
          <Box sx={{ ml: 0, mt: 7 }}>
      <TextField
        variant="outlined"
        placeholder="Search"
        onChange={handleSearch}
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleFetchSearch}>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
        sx={{
          backgroundColor: 'grey.600',
          borderRadius: 'round',
          '& .MuiOutlinedInput-root': {
            padding: '0 8px',
          },
          '& .MuiInputBase-input': {
            padding: '8px',
            fontSize: '0.875rem',
          },
        }}
      />
      {/*}<Button 
        variant="contained"
        sx={{
            bgcolor: '#ffc107',
            color: 'black', // Set text color to black
            '&:hover': { bgcolor: '#ffb300' },
            fontWeight: 'normal',
            ml: 2,
            }}
      onClick={handleExportToExcel}
      > 
        Export to Excel <FileDownloadIcon />
      </Button>
    <Button
        variant="contained"
        sx={{
            bgcolor: '#ffc107',
            color: 'black', // Set text color to black
            '&:hover': { bgcolor: '#ffb300' },
            fontWeight: 'normal',
            ml: 2,
            }}
        onClick={handlePrintTable}
        >
          Print <PrintIcon />
        </Button>{*/}
        
    <TableContainer component={Paper} style={{ maxHeight: '340px', marginLeft: '1px', marginRight: '4px', marginTop: '30px' }}>
        <Table size="small" stickyHeader aria-label="logs table">
            <TableHead>
        {renderTableHeader()}
            </TableHead>
        <TableBody>
          {queryResults.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} style={{ textAlign: 'center', padding: '20px' }}>
                There are no item(s) to show
              </TableCell>
            </TableRow>
          ) : (
            queryResults.map((item) => 
              !item.deleted && (
                <TableRow
                  key={item.iid}
                  onClick={() => handleRowClick(item)}
                  style={{
                    backgroundColor: 'white',
                    // transition: 'background-color 0.3s ease', // optional transition effect on hover
                  }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'gray'} // hover
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'white'} // revert 
                >
                  <TableCell>{item.iid}</TableCell>
                  <TableCell>{item.invoiceNumber}</TableCell>
                  <TableCell>{item.issueOrder}</TableCell>
                  <TableCell>
                    {item.description ? (
                      <div>
                        <p>{item.description.serialNumber}</p>
                      </div>
                    ) : (
                      <div>None</div>
                    )}
                  </TableCell>
                </TableRow>
              )
            )
          )}
            </TableBody>
                </Table>
                </TableContainer>
            <Overlay
                showOverlay={showOverlay}
                selectedItem={selectedItem}
                handleCloseOverlay={handleCloseOverlay}
                />
                </Box>    
            </Container>
          </Box>       
        </>
    );
}
