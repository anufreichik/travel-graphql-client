import React, {useState} from 'react';
import AddDestinationForm from "./AddDestinationForm";
import {useMutation} from "@apollo/client";
import {DESTINATION_CREATE, ACTIVITY_CREATE} from "../../graphql/Mutation";
import AddActivityForm from "./AddActivityForm";
import DestinationInfo from "./DestinationInfo";


const NewDestinationFormWrapper = () => {
    const [destinationCreate, {loading, error}] = useMutation(DESTINATION_CREATE);
    const [activityCreate, {loading: activityLoading, error: activityError}] = useMutation(ACTIVITY_CREATE);
    const [destination, setDestination] = useState();

    const createNewDestination = (formValues) => {
        destinationCreate({
            variables:
                {
                    destination:{
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
                    activity:{
                        activityName: formValues.activityName,
                        activityType: formValues.activityType,
                        destination: destination?._id
                    }

                },

        })
            .then((res) => {
                console.log(res, 'result activity');

            });
    }

    return (
        <div>

            {!destination?._id && <AddDestinationForm createNewDestination={createNewDestination}/>}

            {destination?._id && (
                <>
                    <DestinationInfo destination={destination}/>
                    <AddActivityForm createNewActivity={createNewActivity}/>
                </>

            )}
        </div>
    );
};

export default NewDestinationFormWrapper;
