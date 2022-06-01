import React, {useState} from 'react';
import {useMutation} from "@apollo/client";
import { ACTIVITY_CREATE, FOOD_PLACE_CREATE} from "../../graphql/Mutation";
import AddActivityForm from "./AddActivityForm";
import DestinationInfo from "./DestinationInfo";
import FormDialog from "../FormDialog";
import Button from "@mui/material/Button";
import {Divider, Stack} from "@mui/material";
import FoodExperienceForm from "./FoodExperienceForm";
import {useNavigate, useParams} from "react-router-dom";


const DestinationWrapper = () => {
    let {destinationId} = useParams();
    const navigate = useNavigate();
    if(!destinationId) navigate('/');

    const [activityCreate, {loading: activityLoading, error: activityError}] = useMutation(ACTIVITY_CREATE);
    const [foodPlaceCreate, {loading: foodPlaceLoading, error: foodPlaceError}] = useMutation(FOOD_PLACE_CREATE);



    const [openActivity, setOpenActivity] = useState(false);
    const [openFoodExperience, setOpenFoodExperience] = useState(false);
    const [openAccommodation, setOpenAccommodation] = useState(false);

    const [refresh, setRefresh] = React.useState();


    const toggleDialog = (val) => {
        switch (val) {
            case 'Activity':
                setOpenActivity((prev) => !prev);
                break;
            case 'Food':
                setOpenFoodExperience((prev) => !prev);
                break;
            case 'Accommodation':
                setOpenAccommodation((prev) => !prev);
                break;
            default:
        }

    };

    const createNewActivity = (formValues) => {
        activityCreate({
            variables:
                {
                    activity: {
                        activityName: formValues.activityName,
                        activityType: formValues.activityType,
                        address: formValues.activityAddress,
                        notes: formValues.activityNotes,
                        destination: destinationId
                    }

                },

        })
            .then((res) => {
                setRefresh(res?.data?.activityCreate?._id);
            });
    }
    const createNewFoodPlace = (formValues) => {
        console.log(formValues)
        foodPlaceCreate({
            variables:
                {
                    foodExperience: {
                        foodPlaceName: formValues.foodPlaceName,
                        foodType: formValues.foodPlaceType,
                        address: formValues.foodPlaceAddress,
                        notes: formValues.foodPlaceNotes,
                        destination: destinationId
                    }

                },

        })
            .then((res) => {
                setRefresh(res?.data?.foodPlaceCreate?._id);
            });
    }


    return (
        <div>
            {destinationId && (
                <>

                    <Stack
                        sx={{marginBottom:2}}
                        direction={{xs: 'column', sm: 'row'}}
                        spacing={{xs: 1, sm: 2, md: 4}}
                        divider={<Divider orientation="vertical" flexItem/>}
                    >
                        <Button onClick={() => toggleDialog('Activity')}>
                            + Activity
                        </Button>
                        <Button onClick={() => toggleDialog('Food')}>
                            + Food
                        </Button>
                        <Button onClick={() => toggleDialog('Accommodation')}>
                            + Accommodation
                        </Button>
                    </Stack>

                    <DestinationInfo destinationId={destinationId} refresh={refresh}/>

                    <FormDialog title='Add Activity' open={openActivity}>
                        <AddActivityForm createNewActivity={createNewActivity}
                                         toggleDialog={toggleDialog}
                        />
                    </FormDialog>
                    <FormDialog title='Add Food Experience' open={openFoodExperience}>
                        <FoodExperienceForm createNewFoodPlace={createNewFoodPlace}
                                            toggleDialog={toggleDialog}/>
                    </FormDialog>
                    <FormDialog title='Add Accommodation' open={openAccommodation}>
                        <div> accommodaton form</div>
                    </FormDialog>
                </>

            )}
        </div>
    );
};

export default DestinationWrapper;
