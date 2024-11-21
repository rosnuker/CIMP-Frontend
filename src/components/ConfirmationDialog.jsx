import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

const ConfirmationDialog = ({ open, onClose, onConfirm }) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Confirm Unassign</DialogTitle>
            <DialogContent>
                Are you sure you want to unassign this user?
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={onConfirm} color="error">
                    Unassign
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmationDialog;