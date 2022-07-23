import React from 'react';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import {Button} from "@mui/material";
import DialogContentText from "@mui/material/DialogContentText";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

function ConfirmDialog({title, content, openConfirmDialog, onCancelConfirmDialog, onSubmitConfirmDialog}) {
    return (
        <Dialog
            open={openConfirmDialog}
            onClose={onCancelConfirmDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {title}
                <IconButton
                    aria-label="close"
                    onClick={onCancelConfirmDialog}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {content}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onSubmitConfirmDialog} autoFocus>OK</Button>
                <Button onClick={onCancelConfirmDialog}>Cancel</Button>
            </DialogActions>
        </Dialog>
    );
}

export default ConfirmDialog;
