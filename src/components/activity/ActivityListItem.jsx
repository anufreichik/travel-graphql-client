import React, {useState} from 'react';
import {Collapse, Divider, List, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Typography from "@mui/material/Typography";
import ConfirmDialog from "../common/ConfirmDialog";
import FormDialog from "../common/FormDialog";
import ActivityForm from "./ActivityForm";

const ActivityListItem = ({
                              activity,
                              deleteActivity,
                              updateActivity,
                              activityCollapseClick,
                              collapseState,
                              canDeleteEdit
                          }) => {
    const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
    const [openEditActivity, setOpenEditActivity] = useState(false);


    const handleClick = () => {
        //setOpenDetails(!openDetails);
        activityCollapseClick(activity._id);
    };
    const handleDelete = () => {
        deleteActivity(activity._id);
        setOpenConfirmDialog(false);
    }
    return (
        <>
            <ListItemButton>
                <ListItemIcon onClick={handleClick}>
                    {collapseState ? <ExpandLess/> : <ExpandMore/>}
                </ListItemIcon>
                <ListItemText primary={activity.activityName} secondary={activity.activityType}/>
                {
                    canDeleteEdit &&
                    <>
                        <ListItemIcon onClick={() => setOpenEditActivity(true)}>
                            <EditIcon color='info'/>
                        </ListItemIcon>
                        <ListItemIcon onClick={() => setOpenConfirmDialog(true)}>
                            <DeleteIcon color='info'/>
                        </ListItemIcon>
                    </>
                }


            </ListItemButton>
            <Collapse in={collapseState} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItemButton sx={{pl: 4}}>
                        <div>
                            <Typography color='grey.500'>Address: {activity.address || 'n/a'}</Typography>
                            <Typography color='grey.500'>Notes: {activity.notes || 'n/a'}</Typography>
                            <Typography color='grey.500'>Link: {activity.link || 'n/a'}</Typography>
                        </div>
                    </ListItemButton>
                </List>
            </Collapse>
            <Divider/>

            <ConfirmDialog title={'Delete Confirmation'}
                           onCancelConfirmDialog={() => setOpenConfirmDialog(false)}
                           onSubmitConfirmDialog={handleDelete}
                           openConfirmDialog={openConfirmDialog}
                           content={'Do you want to delete this activity?'}

            />

            <FormDialog title='Edit Activity' open={openEditActivity} onClose={() => setOpenEditActivity(false)}>
                <ActivityForm submitForm={updateActivity} activity={activity}
                              onCancel={() => setOpenEditActivity(false)}/>
            </FormDialog>
        </>
    );
};

export default ActivityListItem;
