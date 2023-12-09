import { Alert, Button, Snackbar } from '@mui/material'
import React, { useState } from 'react'

export default function ToastMessage({ open , message}) {
    const [openToast,setOpenToast] = useState(open);
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenToast(false);
    };

    return (
        <Snackbar
            open={openToast}
            autoHideDuration={3000}
            onClose={handleClose}
        >
            <Alert onClose={handleClose} severity="success" elevation={6} variant="filled">
                {message}
            </Alert>
        </Snackbar>

    )
}
