import React, {useState} from 'react';
import AddDestinationForm from "./AddDestinationForm";
import {useMutation} from "@apollo/client";
import {DESTINATION_CREATE, ACTIVITY_CREATE} from "../../graphql/Mutation";
import AddActivityForm from "./AddActivityForm";
import DestinationInfo from "./DestinationInfo";
import FormDialog from "../FormDialog";
import Button from "@mui/material/Button";
import {Divider, Grid, Stack} from "@mui/material";


const NewDestinationFormWrapper = () => {
    const [destinationCreate, {loading, error}] = useMutation(DESTINATION_CREATE);
    const [activityCreate, {loading: activityLoading, error: activityError}] = useMutation(ACTIVITY_CREATE);
    const [destination, setDestination] = useState();


    const [openActivity, setOpenActivity] = useState(false);
    const [openFoodExperience, setOpenFoodExperience] = useState(false);
    const [openAccommodation, setOpenAccommodation] = useState(false);

    const [refresh, setRefresh] = React.useState();
    // const forceUpdate = React.useCallback(() => updateState({}), []);


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


    const createNewDestination = (formValues) => {
        destinationCreate({
            variables:
                {
                    destination: {
                        destinationName: formValues.name,
                        destinationDescription: formValues.description
                    }

                },

        })
            .then((res) => {
                console.log(res, 'result destination')
                setDestination(res.data.destinationCreate);
            });
    }

    const createNewActivity = (formValues) => {
        activityCreate({
            variables:
                {
                    activity: {
                        activityName: formValues.activityName,
                        activityType: formValues.activityType,
                        destination: destination?._id
                    }

                },

        })
            .then((res) => {
                setRefresh(res?.data?.activityCreate?._id);
            });
    }

    return (
        <div>

            {!destination?._id && <AddDestinationForm createNewDestination={createNewDestination}/>}

            {destination?._id && (
                <>
                    <DestinationInfo destinationId={destination?._id}  refresh={refresh}/>
                    <Stack
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

                    <FormDialog title='Add Activity' open={openActivity}>
                        <AddActivityForm createNewActivity={createNewActivity}
                                         toggleDialog={toggleDialog}
                                        />
                    </FormDialog>
                    <FormDialog title='Add Food Experience' open={openFoodExperience}>
                        <div> food form</div>
                    </FormDialog>
                    <FormDialog title='Add Accommodation' open={openAccommodation}>
                        <div> accommodaton form</div>
                    </FormDialog>
                </>

            )}
        </div>
    );
};

export default NewDestinationFormWrapper;
