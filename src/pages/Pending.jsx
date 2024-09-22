import { useEffect, useState } from "react";
import axios from "axios";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Button } from '@mui/material';

export default function Pending() {
  const [pends, setPends] = useState([]);
const columns = ["REQUEST ID", "DATE REQUESTED", "STATUS", "ITEM ID"];
  const fetchPending = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/request/getPending`);
      setPends(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching options:", error);
    }
  };

  useEffect(() => {
    fetchPending();
  }, []);

  const handleApproving = async (rid) => {
    try {
      await axios.put(`http://localhost:8080/request/update`, null, {
        params: {
          rid: rid,
          status: 'approved'
        }
      });
      fetchPending(); // Refresh the list after approval
    } catch (error) {
      console.log(error);
      alert("No Data Found!");
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table>
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
          {pends.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} align="center">
                <Typography variant="body1" color="textSecondary">
                  No pending requests available.
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            pends.map((pend) => (
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
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleApproving(pend.rid)}
                    disabled={pend.status !== 'pending'}
                  >
                    Approve
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
