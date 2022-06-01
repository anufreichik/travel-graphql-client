import React, {useEffect, useState} from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


import {useMutation, useQuery} from "@apollo/client";
import {GET_DESTINATION_BYID} from "../../graphql/Query";
import {Grid, IconButton, List, ListSubheader, styled} from "@mui/material";
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import ActivityListItem from "./ActivityListItem";
import FoodPlaceListItem from "./FoodPlaceListItem";
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {useNavigate} from "react-router-dom";
import AccommodationListItem from "./AccommodationListItem";
import HotelIcon from '@mui/icons-material/Hotel';
import AddIcon from '@mui/icons-material/Add';
import FormDialog from "../FormDialog";
import AddActivityForm from "./AddActivityForm";
import FoodExperienceForm from "./FoodExperienceForm";
import {ACTIVITY_CREATE, FOOD_PLACE_CREATE} from "../../graphql/Mutation";

const StyledHeader = styled('div')(({theme}) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
}));


const DestinationInfo = ({destinationId}) => {

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

    const [activityCreate, {loading: activityLoading, error: activityError}] = useMutation(ACTIVITY_CREATE);
    const [foodPlaceCreate, {loading: foodPlaceLoading, error: foodPlaceError}] = useMutation(FOOD_PLACE_CREATE);


    const [openActivity, setOpenActivity] = useState(false);
    const [openFoodExperience, setOpenFoodExperience] = useState(false);
    const [openAccommodation, setOpenAccommodation] = useState(false);



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
                refetch();
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
                refetch();
            });
    }


    const navigate = useNavigate();

    const handleNavigateToMyDestinations = () => {
        navigate('/mydestinations');
    }
    if (loading) return <div>Loading...</div>


    return (<>
        <Card sx={{minWidth: 500}}>
            <CardActions>
                <Button startIcon={<ArrowBackIcon/>} onClick={handleNavigateToMyDestinations}>My Destinations</Button>
            </CardActions>
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
                                    <StyledHeader>
                                        <LocalActivityIcon fontSize='large' color="success"/>
                                        <Typography
                                            sx={{paddingLeft: 1}} variant={'h5'}
                                            component='div'>
                                            Activities
                                        </Typography>
                                        <IconButton color="info" aria-label="add activity" component="span" onClick={() => toggleDialog('Activity')}>
                                            <AddIcon fontSize="large"/>
                                        </IconButton>
                                    </StyledHeader>
                                </ListSubheader>
                            }
                        >
                            {
                                data?.destination.destinationActivity.length > 0 &&
                                data?.destination.destinationActivity.map(el => <ActivityListItem key={el._id}
                                                                                                  activity={el}/>)
                            }
                            {
                                data?.destination.destinationActivity.length === 0 &&
                                <Typography sx={{textAlign: 'center', paddingTop: 1}}>No Activities Found</Typography>
                            }

                        </List>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <List
                            sx={{width: '100%', maxWidth: 360, bgcolor: 'background.neutral', minHeight: '100%'}}
                            component="nav"
                            aria-labelledby="food-list-subheader"
                            subheader={
                                <ListSubheader component="div" id="food-list-subheader">
                                    <StyledHeader>
                                        <LocalDiningIcon fontSize='large' color="success"/><Typography
                                        sx={{paddingLeft: 1}} variant={'h5'} component={'div'}>Food Places</Typography>
                                        <IconButton color="info" aria-label="add food" component="span" onClick={() => toggleDialog('Food')}>
                                            <AddIcon fontSize="large"/>
                                        </IconButton>

                                    </StyledHeader>
                                </ListSubheader>
                            }
                        >
                            {
                                data?.destination.destinationFood.length > 0 &&
                                data?.destination.destinationFood.map(el => <FoodPlaceListItem key={el._id}
                                                                                               foodPlace={el}/>)
                            }
                            {
                                data?.destination.destinationFood.length === 0 &&
                                <Typography sx={{textAlign: 'center', paddingTop: 1}}>No Food Places Found</Typography>
                            }

                        </List>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <List
                            sx={{width: '100%', maxWidth: 360, bgcolor: 'background.neutral', minHeight: '100%'}}
                            component="nav"
                            aria-labelledby="food-list-subheader"
                            subheader={
                                <ListSubheader component="div" id="food-list-subheader">
                                    <StyledHeader>
                                        <HotelIcon fontSize='large' color="success"/><Typography
                                        sx={{paddingLeft: 1}} variant={'h5'}
                                        component={'div'}>Accommodations</Typography>
                                        <IconButton color="info" aria-label="add activity" component="span" onClick={() => toggleDialog('Accommodation')}>
                                            <AddIcon fontSize="large"/>
                                        </IconButton>
                                    </StyledHeader>
                                </ListSubheader>
                            }
                        >
                            {
                                data?.destination.destinationAccommodation.length > 0 &&
                                data?.destination.destinationAccommodation.map(el => <AccommodationListItem key={el._id}
                                                                                                            foodPlace={el}/>)
                            }
                            {
                                data?.destination.destinationAccommodation.length === 0 &&
                                <Typography sx={{textAlign: 'center', paddingTop: 1}}>No Accommodations
                                    Found</Typography>
                            }

                        </List>
                    </Grid>
                </Grid>
            </CardContent>

        </Card>
            <FormDialog title='Add Activity' open={openActivity}>
                <AddActivityForm createNewActivity={createNewActivity}
                                 toggleDialog={toggleDialog}
                />
            </FormDialog>
            <FormDialog title='Add Food Place' open={openFoodExperience}>
                <FoodExperienceForm createNewFoodPlace={createNewFoodPlace}
                                    toggleDialog={toggleDialog}/>
            </FormDialog>
            <FormDialog title='Add Accommodation' open={openAccommodation}>
                <div> accommodaton form</div>
            </FormDialog>
        </>
    );
};

export default DestinationInfo;
