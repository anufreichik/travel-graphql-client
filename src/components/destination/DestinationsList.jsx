import React, {useContext, useState} from 'react';
import {Button, CircularProgress, Grid, styled} from "@mui/material";
import {AuthContext} from "../../context/authContext";
import {useMutation, useQuery} from "@apollo/client";
import {GET_DESTINATIONSBYUSER} from "../../graphql/Query";
import DestinationCard from "./DestinationCard";
import AddIcon from '@mui/icons-material/Add';
import {useNavigate} from "react-router-dom";
import FormDialog from "../common/FormDialog";
import AddDestinationForm from "./AddDestinationForm";
import {DESTINATION_CREATE, DESTINATION_DELETE} from "../../graphql/Mutation";


const StyledAddButton = styled(Button)(({theme}) => ({
    fontSize:'1.2rem',
    color: theme.palette.info.main,
    textTransform:'uppercase',
}));

const DestinationsList = () => {
    const {user} = useContext(AuthContext);
    const navigate = useNavigate();
    const [destinationCreate, {loading: destinationLoading, error}] = useMutation(DESTINATION_CREATE);
    const [destinationDelete] = useMutation(DESTINATION_DELETE);
    const [openDialog, setOpenDialog] = useState(false);
    const {
        data,
        loading
    } = useQuery(GET_DESTINATIONSBYUSER, {
        fetchPolicy: 'cache-first',
        nextFetchPolicy: 'network-only',
        variables: {
            owner: user._id,
        },
    });

    const handleDeleteDestination = (id) => {
        destinationDelete({
            variables: {
                destinationId: id
            }, refetchQueries: [
                {query: GET_DESTINATIONSBYUSER, variables: {owner: user._id}}
            ]
        });
    }

    const toggleDialog = () => {
        setOpenDialog((prev) => !prev);

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
                navigate(`/destination/${res.data.destinationCreate._id}`);
            });
    }


    return (
        <div>
            <h3>User Destinations</h3>
            <StyledAddButton startIcon={<AddIcon/>} sx={{marginBottom: 2}} onClick={toggleDialog}>Destination</StyledAddButton>
            <FormDialog title='Add New Destination' open={openDialog}>
                <AddDestinationForm toggleDialog={toggleDialog} createNewDestination={createNewDestination}/>
            </FormDialog>
            {data ? (
                <Grid container spacing={{xs: 2, md: 3}} columns={{xs: 4, sm: 8, md: 12}}>
                    {data?.userdestinations?.map((dest, ind) => (
                        <Grid item xs={2} sm={4} md={4} key={ind}>
                            <DestinationCard destination={dest} showControls={true}
                                             handleDeleteDestination={handleDeleteDestination}/>
                        </Grid>
                    ))}
                </Grid>
            ) : (
                <CircularProgress/>
            )}
        </div>
    );
};

export default DestinationsList;
