import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState} from "react";
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';


export default function FormDialog({title, open, onClose, children}) {

    return (
        <div>
            <Dialog open={open}
            >
                <DialogTitle>
                    {title}
                    <IconButton
                        aria-label="close"
                        onClick={onClose}
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
                    <DialogContentText>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque consectetur dignissimos dolorem
                        eveniet exercitationem explicabo fugit in minus quos similique!
                    </DialogContentText>
                    {children}
                </DialogContent>
            </Dialog>
        </div>
    );
}

