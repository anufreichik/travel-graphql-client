import React, {useContext, useEffect, useState} from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


import {useQuery} from "@apollo/client";
import {GET_DESTINATION_BYID} from "../../graphql/Query";
import {
    Collapse, Divider,
    Grid,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    ListSubheader, styled
} from "@mui/material";
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import ActivityListItem from "./ActivityListItem";
import FoodPlaceListItem from "./FoodPlaceListItem";
import LocalDiningIcon from '@mui/icons-material/LocalDining';


const StyledHeader = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    display:'flex',
    alignItems:'center'
}));



const DestinationInfo = ({destinationId, refresh}) => {

    const {
        data,
        refetch,
        loading
    } = useQuery(GET_DESTINATION_BYID, {
        fetchPolicy: 'no-cache',
        // nextFetchPolicy: 'network-only',
        variables: {
            destinationId: destinationId,
        },
    });
    useEffect(() => {
        refetch();
    }, [refresh]);


    if (loading) return <div>Loading...</div>


    return (
        <Card sx={{minWidth: 500}}>
            <CardContent>
                <Typography variant="h5" component="div" color="text.secondary" gutterBottom>
                    {data?.destination.destinationName}
                </Typography>
                <Typography sx={{fontSize: 14}}>
                    {data?.destination.destinationDescription?.slice(0, 200)}{data?.destination.destinationDescription?.length > 200 ? '...' : ''}
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={4}>
                        <List
                            sx={{width: '100%', maxWidth: 360, bgcolor: 'background.neutral'}}
                            component="nav"
                            aria-labelledby="activity-list-subheader"
                            subheader={
                                <ListSubheader component="div" id="activity-list-subheader">
                                    <StyledHeader><LocalActivityIcon fontSize='large' color="success" /><Typography sx={{paddingLeft:1}} variant={'h5'} component='div'>Activities</Typography></StyledHeader>
                                </ListSubheader>
                            }
                        >
                            {
                                data?.destination.destinationActivity.length > 0 &&
                                data?.destination.destinationActivity.map(el =><ActivityListItem key={el._id} activity={el}/>)
                            }

                        </List>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <List
                            sx={{width: '100%', maxWidth: 360, bgcolor: 'background.neutral', minHeight: '100%'}}
                            component="nav"
                            aria-labelledby="food-list-subheader"
                            subheader={
                                <ListSubheader component="div" id="food-list-subheader"  >
                                   <StyledHeader><LocalDiningIcon fontSize='large' color="success" /><Typography sx={{paddingLeft:1}} variant={'h5'} component={'div'}>Food Places</Typography></StyledHeader>
                                </ListSubheader>
                            }
                        >
                            {
                                data?.destination.destinationFood.length > 0 &&
                                data?.destination.destinationFood.map(el => <FoodPlaceListItem key={el._id} foodPlace={el}/>)
                            }

                        </List>
                    </Grid>

                </Grid>
            </CardContent>
            <CardActions>
                <Button size="small">Back To My Experiences</Button>
            </CardActions>
        </Card>
    );
};

export default DestinationInfo;
