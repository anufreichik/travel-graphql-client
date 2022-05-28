import React, {useContext} from 'react';
import {Button, CircularProgress, Grid} from "@mui/material";
import {AuthContext} from "../context/authContext";
import {useQuery} from "@apollo/client";
import {GET_DESTINATIONSBYUSER} from "../graphql/Query";
import DestinationCard from "./DestinationCard";
import AddIcon from '@mui/icons-material/Add';
import {useNavigate} from "react-router-dom";

const ManageUserDestinations = () => {
    const {user} = useContext(AuthContext);
    const navigate = useNavigate();
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
    const handleRedirectCreateDestination = ()=>{
        navigate('/newdestination');
    }
    return (
        <div>
            <h3>User Destinations</h3>
            <Button   startIcon={<AddIcon/>} sx={{marginBottom:2}} onClick={handleRedirectCreateDestination}>Expirience</Button>
            {data ? (
                <Grid container spacing={{xs: 2, md: 3}} columns={{xs: 4, sm: 8, md: 12}}>
                    {data?.userdestinations?.map((dest, ind) => (
                        <Grid item xs={2} sm={4} md={4} key={ind}>
                            <DestinationCard destination={dest}/>
                        </Grid>
                    ))}
                </Grid>
            ) : (
                <CircularProgress/>
            )}
        </div>
    );
};

export default ManageUserDestinations;
