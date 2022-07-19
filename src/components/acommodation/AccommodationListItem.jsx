import React, {useState} from 'react';
import {Collapse, Divider, List, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Typography from "@mui/material/Typography";

const AccommodationListItem = ({accommodation}) => {
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <>
            <ListItemButton onClick={handleClick}>
                <ListItemIcon>
                    {open ? <ExpandLess/> : <ExpandMore/>}
                </ListItemIcon>
                <ListItemText primary={accommodation.accommodationName} secondary={accommodation.accommodationType}/>
                <ListItemIcon>
                    <EditIcon color='info'/>
                </ListItemIcon>
                <ListItemIcon>
                    <DeleteIcon color='info'/>
                </ListItemIcon>

            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
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
        </>
    );
};

export default AccommodationListItem;
