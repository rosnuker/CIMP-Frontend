import React, { useEffect, useState } from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import axios from 'axios';

const UserSelectionModal = ({ open, onClose, onSelectUser }) => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
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
        const fetchUsers = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`http://${address}:42069/fetchAccPers`);
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            } finally {
                setLoading(false);
            }
        };

        if (open) {
            fetchUsers();
        }
    }, [open]);

    return (
        <Dialog open={open} onClose={onClose} PaperProps={{
            style: {
                maxWidth: '600px', // Set max width of the modal
                width: '100%', // Make the modal responsive
            },
        }}>
            <DialogTitle>Select a User</DialogTitle>
            <DialogContent>
                <Autocomplete
                    options={users}
                    onChange={(event, newValue) => {
                        if (newValue) {
                            onSelectUser(newValue);
                        }
                    }}
                    loading={loading}
                    renderInput={(params) => (
                        <TextField {...params} label="Select a User" variant="outlined" />
                    )}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default UserSelectionModal;
