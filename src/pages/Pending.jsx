import { useEffect, useState } from "react";
import axios from "axios";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

export default function Pending() {
  const [pends, setPends] = useState([]);

  const fetchPending = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/request/getPending`);
      setPends(response.data); 
      console.log(response.data); // Log the response data directly
    } catch (error) {
      console.error("Error fetching options:", error);
    }
  };

  useEffect(() => {
    fetchPending();
  }, []);

  const handleApproving = () => {
    axios.put(`http://localhost:8080/request/update`,{
        params: {
            rid: "", //need butangan sa gi click sa row kamo na bahala frontend gods
            status: 'approved'
        }
    })
    .then(result => {
        
      })
      .catch(error => {
        console.log(error)
        alert("No Data Found!")

      })
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Request ID</TableCell>
            <TableCell>Property Tag</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {pends.map((pend) => (
            <TableRow key={pend.rid}> 
              <TableCell>{pend.rid}</TableCell>
              <TableCell>
                {pend.item ? (
                  <div>
                    <p>{pend.item.iid}</p>
                  </div>
                ) : (
                  <div>None</div>
                )}
              </TableCell>
              <TableCell>{pend.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
