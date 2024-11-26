import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import axios from 'axios';
import UserSelectionModal from './UserSelectionModal';
import { useSnackbar } from './SnackbarContext';
import ConfirmationDialog from './ConfirmationDialog';

const AssignUserButton = ({ item, handleCloseOverlay }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [hasUser, setHasUser] = useState(false);
    const [confirmationOpen, setConfirmationOpen] = useState(false);
    const [quantity, setQuantity] = useState(0);
    const showSnackbar = useSnackbar();
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
        setHasUser(!!item.accPerson);
    }, [item.accPerson]);

    const handleOpenModal = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const handleSelectUser = async (fullName) => {
        try {
            await axios.post(`http://${address}:42069/item/assignUser/${item.iid}`, null, {
                params: { fullName },
            });

            await axios.post(`http://${address}:42069/request/add`, {}, {
                params: {
                    iid: item.iid,
                }
            });

            showSnackbar('User assigned successfully!', 'success');
            handleCloseModal();
            handleCloseOverlay();
        } catch (error) {
            console.error('Error assigning user:', error);
            showSnackbar('Failed to assign user.', 'error');
        }
    };

    const handleUnassignUser = async () => {
        setConfirmationOpen(true);
    };

    const handleConfirmUnassign = async () => {
        try {
            await axios.post(`http://${address}:42069/item/unassignUser/${item.iid}`);

            // const request = await axios.get(`http://${address}:42069/request/find`, {
            //                 params: {
            //                     itemAccPerId: item.accPerson.uid,
            //                     itemId: item.iid,
            //                     itemName: item.description.name,
            //                     itemQuantity: item.quantity,
            //                     itemUnitOfMeasurement: item.unitOfMeasurement,
            //                     itemTotalCost: item.totalCost,
            //                     itemStatus: item.status,
            //                     itemModel: item.description.model,
            //                     itemSerialNumber: item.description.serialNumber,
            //                     itemConsumable: item.consumable,
            //                     dateReq: item.date_req,
            //                 }
            //             });
            
            // console.log(request.data);

            // await axios.post(`http://${address}:42069/item/unassignUserFromRequest/${request.rid}`);

            showSnackbar('User unassigned successfully!', 'success');
            setHasUser(false);
            handleCloseOverlay();
            setConfirmationOpen(false);
        } catch (error) {
            console.error('Error unassigning user:', error);
            showSnackbar('Failed to unassign user.', 'error');
        }
    };

    return (
        <div>
            {/* {hasUser ? (
                <Button variant="contained" color="error" onClick={handleUnassignUser} >
                    Unassign User
                </Button>
            ) : (
                <Button variant="contained" color="success" onClick={handleOpenModal} >
                    Assign User
                </Button>
            )} */}
            {item.status !== 'RETURNED' && (
                hasUser ? (
                    <Button variant="contained" color="error" onClick={handleUnassignUser} >
                        Unassign User
                    </Button>
                ) : (
                    <Button variant="contained" color="success" onClick={handleOpenModal} >
                        Assign User
                    </Button>
                )
            )}
            <UserSelectionModal
                open={modalOpen}
                onClose={handleCloseModal}
                onSelectUser={handleSelectUser}
            />
            <ConfirmationDialog
                open={confirmationOpen}
                onClose={() => setConfirmationOpen(false)}
                onConfirm={handleConfirmUnassign}
            />
        </div>
    );
};

export default AssignUserButton;