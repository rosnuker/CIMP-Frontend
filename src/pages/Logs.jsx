import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Box, TextField, Typography, Button, Select, MenuItem, InputLabel, 
FormControl, Toolbar, InputAdornment, IconButton, Table, TableBody, TableCell, 
TableContainer, TableHead, TableRow, Paper, TablePagination} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from "react-router-dom";

export default function LogsHistory({ user, setUser }) {
  const [queryResults, setQueryResults] = useState([]);
  const [specific, setSpecific] = useState("");
  const [month, setMonth] = useState("");
  const [O_year, setOYear] = useState([]);
  const [year, setYear] = useState("");
  const [day, setDay] = useState("");
  const [O_type, setOType] = useState([]);
  const [type, setType] = useState("");
  const [bef, setBef] = useState("");
  const [aft, setAft] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
    // Pagination 
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  
  const address = getIpAddress();

  function getIpAddress() {
    const hostname = window.location.hostname;
    const indexOfColon = hostname.indexOf(':');
    if (indexOfColon !== -1) {
      return hostname.substring(0, indexOfColon);
    }
    return hostname;
  }

  const handleBef = (event) => setBef(event.target.value);
  const handleAft = (event) => setAft(event.target.value);
  const handleSpecific = (event) => setSpecific(event.target.value);

  useEffect(() => {
    fetchType();
    fetchYear();
  }, []);

  useEffect(() => {
    const fetchLogsData = async () => {
      try {
        const response = await axios.get(`http://${address}:8080/getAllLogs`);
        setQueryResults(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchLogsData();
  }, [address]);

  const fetchType = async () => {
    try {
      const response = await axios.get(`http://${address}:8080/item/logstype`);
      const uniqueOptions_type = [...new Set(response.data)];
      setOType(uniqueOptions_type);
    } catch (error) {
      console.error("Error fetching options:", error);
    }
  };

  const fetchYear = async () => {
    try {
      const response = await axios.get(`http://${address}:8080/item/logsyear`);
        const uniqueOptions_year = [...new Set(response.data)];
      setOYear(uniqueOptions_year);
    } catch (error) {
      console.error("Error fetching options:", error);
    }
  };

  const convertTo12HourFormat = (time) => {
    const [hours, minutes] = time.split(':').map(Number);
    const period = hours >= 12 ? 'PM' : 'AM';
    const hours12 = hours % 12 || 12;
    const minutesStr = minutes < 10 ? `0${minutes}` : `${minutes}`;
    return `${hours12}:${minutesStr} ${period}`;
  };

  const handleFilter = () => {
    axios
      .get(`http://${address}:8080/item/searchLogs`, {
        params: { month, year, day, type, bef, aft }
      })
      .then(result => {
        setQueryResults(result.data);
      })
      .catch(error => {
        console.log(error);
        alert("No Data found!");
      });
  };

  const handleSearch = () => {
    if (specific === "") {
      alert("Empty textfield");
    } else {
      axios
        .get(`http://${address}:8080/item/logsSpeci`, {
          params: { num: specific }
        })
        .then(result => {
          setQueryResults(result.data);
        })
        .catch(error => {
          console.log(error);
          alert("No Data found!");
        });
    }
  };

  const toggleFilter = () => {
    setIsFilterOpen(prevState => !prevState);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  const columnHeaders = [ 'Log Id', 'Date', 'Time', 'Property Tag', 'Type', 'User', 'Description' ];

  const renderTableHeader = () => (
    <TableRow style={{ position: 'sticky', top: 0 }}>
      {columnHeaders.map((header) => (
        <TableCell key={header} style={{ padding: '16px', fontWeight: 'bold', color: 'black', backgroundColor: '#eeeeee' }}>
          {header}
        </TableCell>
      ))}
    </TableRow>
  );

  return (
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
          <Box sx={{ mt: 7 }}>
            <FormControl sx={{ m: 1, minWidth: 160 }}>
              <InputLabel>Choose Month</InputLabel>
              <Select
                id="month"
                name="choose-month"
                value={month}
                onChange={(event) => setMonth(event.target.value)}
                label="Choose Month"
                sx={{ bgcolor: 'gray.800', color: 'black' }}
              >
                <MenuItem value="">
                  <em>Choose Month</em>
                </MenuItem>
                {[...Array(12).keys()].map((i) => (
                  <MenuItem key={i + 1} value={i + 1}>
                    {new Date(0, i).toLocaleString('default', { month: 'long' })}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl sx={{ m: 1, minWidth: 160 }}>
              <InputLabel>Choose Day</InputLabel>
              <Select
                id="days"
                name="choose-day"
                value={day}
                onChange={(event) => setDay(event.target.value)}
                label="Choose Day"
                sx={{ bgcolor: 'gray.800', color: 'black' }}
              >
                <MenuItem value="">
                  <em>Choose Day</em>
                </MenuItem>
                <MenuItem value="1">1</MenuItem>
            <MenuItem value="2">2</MenuItem>
            <MenuItem value="3">3</MenuItem>
            <MenuItem value="4">4</MenuItem>
            <MenuItem value="5">5</MenuItem>
            <MenuItem value="6">6</MenuItem>
            <MenuItem value="7">7</MenuItem>
            <MenuItem value="8">8</MenuItem>
            <MenuItem value="9">9</MenuItem>
            <MenuItem value="10">10</MenuItem>
            <MenuItem value="eleven">11</MenuItem>
            <MenuItem value="twelve">12</MenuItem>
            <MenuItem value="thirteen">13</MenuItem>
            <MenuItem value="fourteen">14</MenuItem>
            <MenuItem value="fifteen">15</MenuItem>
            <MenuItem value="sixteen">16</MenuItem>
            <MenuItem value="seventeen">17</MenuItem>
            <MenuItem value="eighteen">18</MenuItem>
            <MenuItem value="nineteen">19</MenuItem>
            <MenuItem value="twenties">20</MenuItem>
            <MenuItem value="twenty one">21</MenuItem>
            <MenuItem value="twenty two">22</MenuItem>
            <MenuItem value="twenty three">23</MenuItem>
            <MenuItem value="twenty four">24</MenuItem>
            <MenuItem value="twenty five">25</MenuItem>
            <MenuItem value="twenty six">26</MenuItem>
            <MenuItem value="twenty seven">27</MenuItem>
            <MenuItem value="twenty eight">28</MenuItem>
            <MenuItem value="twenty nine">29</MenuItem>
            <MenuItem value="thirties">30</MenuItem>
            <MenuItem value="thirty one">31</MenuItem>
              </Select>
            </FormControl>

            <FormControl sx={{ m: 1, minWidth: 160 }}>
              <InputLabel>Choose Year</InputLabel>
              <Select
                id="years"
                name="choose-year"
                value={year}
                onChange={(event) => setYear(event.target.value)}
                label="Choose Year"
                sx={{ bgcolor: 'gray.800', color: 'black' }}
              >
                <MenuItem value="">
                  <em>Choose Year</em>
                </MenuItem>
                {O_year.map((year, index) => (
                  <MenuItem key={index} value={year}>{year}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl sx={{ m: 1, minWidth: 160 }}>
              <InputLabel>Choose Type</InputLabel>
              <Select
                id="types"
                name="choose-type"
                value={type}
                onChange={(event) => setType(event.target.value)}
                label="Choose Type"
                sx={{ bgcolor: 'gray.800', color: 'black' }}
              >
                <MenuItem value="">
                  <em>Choose Type</em>
                </MenuItem>
                {O_type.map((type, index) => (
                  <MenuItem key={index} value={type}>{type}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Box sx={{ mt: 3 }}>
            <TextField
              variant="outlined"
              placeholder="Search Property Tag"
              onChange={handleSpecific}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleSearch}>
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

            <Button
              variant="contained"
              color="warning"
              sx={{ bgcolor: '#ffc107', '&:hover': { bgcolor: '#ffb300' }, fontWeight: 'bold', ml: 2 }}
              onClick={handleFilter}
            >
              Filter
            </Button>

            <FormControl sx={{ ml: 2, mb: 5 }}>
              <TextField
                id="before"
                type="time"
                onChange={handleBef}
                variant="outlined"
                label="Start Time"
                slotProps={{
                  input: {
                    min: "09:00",
                    max: "18:00",
                  },
                  inputLabel: {
                    shrink: true, 
                  },
                }}
                sx={{ width: 150, height: 40 }}
              />
            </FormControl>

            <FormControl sx={{ ml: 2 }}>
              <TextField
                id="after"
                type="time"
                onChange={handleAft}
                label="End Time"
                slotProps={{
                  input: {
                    min: "09:00",
                    max: "18:00",
                  },
                  inputLabel: {
                    shrink: true, 
                  },
                }}
                sx={{ width: 150 }}
              />
            </FormControl>

            <TableContainer component={Paper} style={{ maxHeight: '340px', marginLeft: '1px', marginRight: '4px' }}>
              <Table size="small" stickyHeader aria-label="logs table">
                <TableHead>
                  {renderTableHeader()}
                </TableHead>
                <TableBody>
                {queryResults.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((res) => (
                    <TableRow
                      key={res.logid}
                      style={{
                        backgroundColor: 'white',
                      }}
                      onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'gray'}
                      onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'white'}
                    >
                      <TableCell>{res.logid}</TableCell>
                      <TableCell>{res.date}</TableCell>
                      <TableCell>{convertTo12HourFormat(res.time)}</TableCell>
                      <TableCell>{res.item ? <p>{res.item.iid}</p> : <div>None</div>}</TableCell>
                      <TableCell>{res.type}</TableCell>
                      <TableCell>{res.user ? <p>{res.user.lname}, {res.user.fname}</p> : <div>None</div>}</TableCell>
                      <TableCell>{res.description}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={queryResults.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
          </Box>
        </Container>
      </Box>
    </>
  );
}
