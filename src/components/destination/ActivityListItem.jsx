import React, {useState} from 'react';
import {Collapse, Divider, List, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const ActivityListItem = ({activity}) => {
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <>
            <ListItemButton onClick={handleClick} >
                <ListItemIcon>
                    {open ? <ExpandLess/> : <ExpandMore/>}
                </ListItemIcon>
                <ListItemText primary={activity.activityName} secondary={activity.activityType}/>
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
                            <ListItemText primary="Starred"/>
                            <ListItemText primary="Starred"/>
                            <ListItemText primary="Starred"/>
                        </div>

                    </ListItemButton>
                </List>
            </Collapse>
            <Divider/>
        </>
    );
};

export default ActivityListItem;
