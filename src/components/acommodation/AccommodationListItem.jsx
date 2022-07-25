import React, {useState} from 'react';
import {Collapse, Divider, List, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Typography from "@mui/material/Typography";
import ConfirmDialog from "../common/ConfirmDialog";
import FormDialog from "../common/FormDialog";
import AccommodationForm from "./AccommodationForm";

const AccommodationListItem = ({accommodation, deleteAccommodation, updateAccommodation, accommodationCollapseClick, collapseState}) => {
    const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
    const [openEditAccommodationForm, setOpenEditAccommodationForm] = useState(false);

    const handleClick = () => {
        accommodationCollapseClick(accommodation._id);
    };
    const handleDelete = () => {
        deleteAccommodation(accommodation._id);
        setOpenConfirmDialog(false);
    }
    return (
        <>
            <ListItemButton>
                <ListItemIcon onClick={handleClick}>
                    {collapseState ? <ExpandLess/> : <ExpandMore/>}
                </ListItemIcon>
                <ListItemText primary={accommodation.accommodationName} secondary={accommodation.accommodationType}/>
                <ListItemIcon  aria-label="edit accommodation"  onClick={()=>setOpenEditAccommodationForm(true)}>
                    <EditIcon color="info" />
                </ListItemIcon>
                <ListItemIcon  aria-label="delete accommodation" onClick={()=>setOpenConfirmDialog(true)}>
                    <DeleteIcon color='info'/>
                </ListItemIcon>

            </ListItemButton>
            <Collapse in={collapseState} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItemButton sx={{pl: 4}}>
                        <div>
                            <Typography color='grey.500'>Address: {accommodation.address || 'n/a'}</Typography>
                            <Typography color='grey.500'>Notes: {accommodation.notes || 'n/a'}</Typography>
                            <Typography color='grey.500'>Link: {accommodation.link || 'n/a'}</Typography>
                        </div>

                    </ListItemButton>
                </List>
            </Collapse>
            <Divider/>

            <ConfirmDialog title={'Delete Confirmation'}
                           onCancelConfirmDialog={()=>setOpenConfirmDialog(false)}
                           onSubmitConfirmDialog={handleDelete}
                           openConfirmDialog={openConfirmDialog}
                           content={'Do you want to delete this accommodation?'}

            />

            <FormDialog title='Edit Accommodation' open={openEditAccommodationForm} onClose={()=>setOpenEditAccommodationForm(false)}>
                <AccommodationForm submitForm={updateAccommodation} accommodation={accommodation}
                                    onCancel={()=>setOpenEditAccommodationForm(false)} />
            </FormDialog>


        </>
    );
};

export default AccommodationListItem;
