import { useEffect, useState } from "react";
import axios from "axios";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

export default function Approved() {
  const [appr, setAppr] = useState([]);

  const fetchApproved = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/request/getApproved`);
      setAppr(response.data); 
      console.log(response.data); // Log the response data directly
    } catch (error) {
      console.error("Error fetching options:", error);
    }
  };

  useEffect(() => {
    fetchApproved();
  }, []);

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
          {appr.map((item) => (
            <TableRow key={item.rid}> 
              <TableCell>{item.rid}</TableCell>
              <TableCell>
                {item.item ? (
                  <div>
                    <p>{item.item.iid}</p>
                  </div>
                ) : (
                  <div>None</div>
                )}
              </TableCell>
              <TableCell>{item.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
