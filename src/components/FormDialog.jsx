import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function FormDialog({title, open, children}) {
    // const [open, setOpen] = React.useState(false);
    //
    // const handleClickOpen = () => {
    //     setOpen(true);
    // };
    //
    // const handleClose = () => {
    //     setOpen(false);
    // };

    return (
        <div>

            <Dialog open={open}
                    // onClose={handleClose}
            >
                <DialogTitle>{title}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque consectetur dignissimos dolorem
                        eveniet exercitationem explicabo fugit in minus quos similique!
                    </DialogContentText>
                    {children}
                </DialogContent>
                {/*<DialogActions>*/}
                {/*    <Button onClick={handleClose}>Cancel</Button>*/}
                {/*    <Button onClick={handleClose}>Subscribe</Button>*/}
                {/*</DialogActions>*/}
            </Dialog>
        </div>
    );
}

