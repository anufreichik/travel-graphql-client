import React from 'react';
import {Box, CircularProgress, Grid} from "@mui/material";
import {useQuery} from "@apollo/client";
import {GET_DESTINATIONS} from "../graphql/Query";
import DestinationCard from "../components/DestinationCard";

function Home() {
    const {
        data,
        fetchMore,
        loading
    } = useQuery(GET_DESTINATIONS, {
        //fetchPolicy: 'cache-first',
        variables: {
            offset: 0,
            limit: 9,
        },
    });

    return (
        <Box sx={{flexGrow: 1}}>

                {data ? (
                    <Grid container spacing={{xs: 2, md: 3}} columns={{xs: 4, sm: 8, md: 12}}>
                        {data.destinations.list.map((dest, ind) => (
                            <Grid item xs={2} sm={4} md={4} key={ind}>
                               <DestinationCard destination={dest} showControls={false}/>
                            </Grid>
                        ))}
                    </Grid>
                ) : (
                    <CircularProgress/>
                )}

        </Box>
    );
}

export default Home;
