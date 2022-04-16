import React from 'react';
import {Box, CircularProgress, Grid, Paper} from "@mui/material";
import {experimentalStyled as styled} from '@mui/material/styles';
import {useQuery} from "@apollo/client";
import {GET_DESTINATIONS} from "../graphql/Query";
import DestinationCard from "../components/DestinationCard";

const Item = styled(Paper)(({theme}) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

function Home() {
    const {
        data,
        fetchMore,
        loading
    } = useQuery(GET_DESTINATIONS, {
        //fetchPolicy: 'cache-first',
        variables: {
            offset: 0,
            limit: 5,
        },
    });
    console.log(data)
    return (
        <Box sx={{flexGrow: 1}}>

                {data ? (
                    <Grid container spacing={{xs: 2, md: 3}} columns={{xs: 4, sm: 8, md: 12}}>
                        {data.destinations.list.map((dest, ind) => (
                            <Grid item xs={2} sm={4} md={4} key={ind}>
                                <Item><DestinationCard destination={dest}/></Item>
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
