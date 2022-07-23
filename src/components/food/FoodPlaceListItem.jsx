import React, {useState} from 'react';
import {Collapse, Divider, IconButton, List, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Typography from "@mui/material/Typography";
import ConfirmDialog from "../common/ConfirmDialog";
import FormDialog from "../common/FormDialog";
import FoodExperienceForm from "./FoodExperienceForm";

const FoodPlaceListItem = ({foodPlace, deleteFoodPlace, updateFoodPlace}) => {
    const [openDetails, setOpenDetails] = useState(false);
    const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
    const [openEditFoodPlaceForm, setOpenEditFoodPlaceForm] = useState(false);

    const handleClick = () => {
        setOpenDetails(!openDetails);
    };
    const handleDelete = () => {
      deleteFoodPlace(foodPlace._id);
      setOpenConfirmDialog(false);
    }


    return (
        <>
            <ListItemButton >
                <ListItemIcon onClick={handleClick}>
                    {openDetails ? <ExpandLess/> : <ExpandMore/>}
                </ListItemIcon>
                <ListItemText primary={foodPlace.foodPlaceName} secondary={foodPlace.foodType}/>
                <IconButton color="info" aria-label="edit food expirience"  onClick={()=>setOpenEditFoodPlaceForm(true)}>
                    <EditIcon color='info'/>
                </IconButton>
                <IconButton color="info" aria-label="delete food expirience" onClick={()=>setOpenConfirmDialog(true)}>
                    <DeleteIcon color='info'/>
                </IconButton>

            </ListItemButton>
            <Collapse in={openDetails} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItemButton sx={{pl: 4}}>
                        <div>
                            <Typography color='grey.500'>Address: {foodPlace.address || 'n/a'}</Typography>
                            <Typography color='grey.500'>Notes: {foodPlace.notes || 'n/a'}</Typography>
                            <Typography color='grey.500'>Link: {foodPlace.link || 'n/a'}</Typography>
                        </div>

                    </ListItemButton>
                </List>
            </Collapse>
            <Divider/>
           <ConfirmDialog title={'Delete Confirmation'}
                          onCancelConfirmDialog={()=>setOpenConfirmDialog(false)}
                          onSubmitConfirmDialog={handleDelete}
                          openConfirmDialog={openConfirmDialog}
                          content={'Do you want to delete this food place?'}

           />

            <FormDialog title='Edit Food Place' open={openEditFoodPlaceForm} onClose={()=>setOpenEditFoodPlaceForm(false)}>
                <FoodExperienceForm submitForm={updateFoodPlace} foodPlace={foodPlace}
                                     onCancel={()=>setOpenEditFoodPlaceForm(false)} />
            </FormDialog>

        </>
    );
};

export default FoodPlaceListItem;
