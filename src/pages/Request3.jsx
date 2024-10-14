import { useEffect, useState } from "react";
import axios from "axios";
import { 
  Table, TableBody, TableCell, TableContainer, 
  Container, TableHead, TableRow, Paper, 
  Typography, Button, Box, Toolbar, Tabs, Tab 
} from '@mui/material';

export default function Request3() {
  const [data, setData] = useState([]);
  const [fullNames, setFullNames] = useState({});
  const [loader, setLoader] = useState(null);
  const [currentTab, setCurrentTab] = useState(0);
  const [counts, setCounts] = useState({});

  const columns = ["REQUEST ID", "ITEM ID", "NAME", "ACCOUNTABLE PERSON", "STATUS", "ACTIONS"];
  const statuses = ["TO BE RETURNED", "REJECTED", "APPROVED"];
  const address = getIpAddress();

  function getIpAddress() {
    const hostname = window.location.hostname;
    const indexOfColon = hostname.indexOf(':');
    return indexOfColon !== -1 ? hostname.substring(0, indexOfColon) : hostname;
  }

  const fetchFullName = async (uid) => {
    try {
      const response = await fetch(`http://${address}:8080/${uid}/full-name`);
      if (!response.ok) throw new Error('Network response was not ok');
      return await response.text();
    } catch (error) {
      console.error('Error fetching full name:', error);
      return '';
    }
  };

  const fetchReturn = async () => {
    try {
      const responses = await Promise.all(statuses.map(status => 
        axios.get(`http://${address}:8080/request/byItemStatus`, { params: { status } })
      ));

      const allData = responses.flatMap(response => response.data);
      setData(allData);
      
      const newCounts = {};
      allData.forEach(item => {
        newCounts[item.status] = (newCounts[item.status] || 0) + 1;
      });
      setCounts(newCounts);

    } catch (error) {
      console.error("Error fetching options:", error);
    }
  };

  useEffect(() => {
    fetchReturn();
  }, [loader]);

  useEffect(() => {
    const loadFullNames = async () => {
      const names = {};
      for (const item of data) {
        const fullName = await fetchFullName(item.itemAccPerId);
        names[item.itemAccPerId] = fullName;
      }
      setFullNames(names);
    };
    loadFullNames();
  }, [data]);

  const handleApproving = async (rid) => {
    try {
      await axios.put(`http://${address}:8080/request/approve-return/${rid}`);
      setLoader(Math.random() * 1000);
    } catch (error) {
      console.log(error);
      alert("No Data Found!");
    }
  };

  const filteredData = data.filter(item => item.status === statuses[currentTab]);

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
          <Tabs
            value={currentTab}
            onChange={(event, newValue) => setCurrentTab(newValue)}
            textColor="inherit"
            variant="fullWidth"
            sx={{ 
                '& .MuiTabs-indicator': {
                  backgroundColor: '#8a252c',
                },
              }}
          >
            {statuses.map((status, index) => (
              <Tab 
                label={`${status} (${counts[status] || 0})`} 
                key={index}
                sx={{ 
                    color: '#8a252c',
                    fontWeight: 'bold',
                 }}
              />
            ))}
          </Tabs>
          
          <TableContainer component={Paper} style={{ maxHeight: '550px', overflowY: 'auto' }}>
            <Table>
              <TableHead>
                <TableRow style={{ position: 'sticky', top: 0, backgroundColor: '#eeeeee', zIndex: 1 }}>
                  {columns.map((column) => (
                    <TableCell key={column} style={{ padding: '10px', fontWeight: '600', color: 'black', backgroundColor: '#eeeeee' }}>
                      {column}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredData.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      <Typography variant="body1" color="textSecondary">
                        No requests available.
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredData.map((item) => (
                    <TableRow key={item.rid}>
                      <TableCell>{item.rid}</TableCell>
                      <TableCell>{item.itemId}</TableCell>
                      <TableCell>{item.itemName}</TableCell>
                      <TableCell>{fullNames[item.itemAccPerId] || 'Loading...'}</TableCell>
                      <TableCell>{item.status}</TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => handleApproving(item.rid)}
                          style={{ backgroundColor: 'green', color: 'white' }}
                        >
                          Accept
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </Box>
    </>
  );
}
