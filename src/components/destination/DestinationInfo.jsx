import React, {useState} from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


import {useMutation, useQuery} from "@apollo/client";
import {GET_DESTINATION_BYID} from "../../graphql/Query";
import {Grid, IconButton, List, ListSubheader, styled} from "@mui/material";
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import ActivityListItem from "../activity/ActivityListItem";
import FoodPlaceListItem from "../food/FoodPlaceListItem";
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {useNavigate} from "react-router-dom";
import AccommodationListItem from "../acommodation/AccommodationListItem";
import HotelIcon from '@mui/icons-material/Hotel';
import AddIcon from '@mui/icons-material/Add';
import FormDialog from "../common/FormDialog";
import ActivityForm from "../activity/ActivityForm";
import FoodExperienceForm from "../food/FoodExperienceForm";
import {
    ACTIVITY_CREATE,
    FOOD_PLACE_CREATE,
    ACCOMMODATION_CREATE,
    FOOD_PLACE_DELETE,
    FOOD_PLACE_UPDATE, ACCOMMODATION_DELETE, ACCOMMODATION_UPDATE, ACTIVITY_UPDATE, ACTIVITY_DELETE
} from "../../graphql/Mutation";
import AccommodationForm from "../acommodation/AccommodationForm";

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

const StyledBackButton = styled(Button)(({theme}) => ({
    fontSize: '1.2rem',
    color: theme.palette.info.main,
    textTransform: 'uppercase',
}));

const DestinationInfo = ({destinationId}) => {

    const [openActivity, setOpenActivity] = useState(false);
    const [openFoodExperience, setOpenFoodExperience] = useState(false);
    const [openAccommodation, setOpenAccommodation] = useState(false);
    const [activityCollapse, setActivityCollapse] = useState([]);
    const [foodPlaceCollapse, setFoodPlaceCollapse] = useState([]);
    const [accommodationCollapse, setAccommodationCollapse] = useState([]);

    const activityCollapseClick=(ind)=>{
        if(activityCollapse.includes(ind)){
            const collapseCopy = activityCollapse.filter(el=>el!==ind);
            setActivityCollapse(collapseCopy);
        }
        else{
            //since we want collapse all other items in activity when expending one,
            // i'm setting collapseCopy to empty array, but in case we want to keep expended, just set it to [...activityCollapse]
            const collapseCopy=[]; //[...activityCollapse];
            collapseCopy.push(ind);
            setActivityCollapse(collapseCopy);
        }
    }
    const foodPlaceCollapseClick=(ind)=>{
        if(foodPlaceCollapse.includes(ind)){
            const collapseCopy = foodPlaceCollapse.filter(el=>el!==ind);
            setFoodPlaceCollapse(collapseCopy);
        }
        else{
            const collapseCopy=[];
            collapseCopy.push(ind);
            setFoodPlaceCollapse(collapseCopy);
        }
    }

    const accommodationCollapseClick=(ind)=>{
        if(accommodationCollapse.includes(ind)){
            const collapseCopy = accommodationCollapse.filter(el=>el!==ind);
            setAccommodationCollapse(collapseCopy);
        }
        else{
            const collapseCopy=[];
            collapseCopy.push(ind);
            setAccommodationCollapse(collapseCopy);
        }
    }

    //QUEIRES
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

    //MUTATIONS
    const [activityCreate, {loading: activityLoading, error: activityError}] = useMutation(ACTIVITY_CREATE);
    const [foodPlaceCreate, {loading: foodPlaceLoading, error: foodPlaceError}] = useMutation(FOOD_PLACE_CREATE);
    const [accommodationCreate, {
        loading: accommodationLoading,
        error: accommodationError
    }] = useMutation(ACCOMMODATION_CREATE);

    const [foodPlaceDelete] = useMutation(FOOD_PLACE_DELETE);
    const [foodPlaceUpdate] = useMutation(FOOD_PLACE_UPDATE);

    const [accommodationDelete] = useMutation(ACCOMMODATION_DELETE);
    const [accommodationUpdate] = useMutation(ACCOMMODATION_UPDATE);

    const [activityDelete] = useMutation(ACTIVITY_DELETE);
    const [activityUpdate] = useMutation(ACTIVITY_UPDATE);

    const deleteActivity = (id) => {
        activityDelete({
            variables: {
                activityId: id
            },
        })
            .then((res) => {
                refetch();
            });
    }

    const deleteFoodPlace = (id) => {
        foodPlaceDelete({
            variables: {
                foodPlaceId: id
            },
        })
            .then((res) => {
                refetch();
            });
    }

    const deleteAccommodation = (id) => {
        accommodationDelete({
            variables: {
                accommodationId: id
            },
        })
            .then((res) => {
                refetch();
            });
    }


    const updateActivity = (formValues, id) => {
        activityUpdate({
            variables: {
                activity: {
                    activityName: formValues.activityName,
                    activityType: formValues.activityType,
                    address: formValues.activityAddress,
                    notes: formValues.activityNotes,
                    link:formValues.activityLink,
                    destination: destinationId
                },
                activityId: id
            }
        })
            .then((res) => {
                refetch();
            });
    }

    const updateFoodPlace = (formValues, id) => {
        foodPlaceUpdate({
            variables: {
                foodPlace: {
                    foodPlaceName: formValues.foodPlaceName,
                    foodType: formValues.foodPlaceType,
                    address: formValues.foodPlaceAddress,
                    notes: formValues.foodPlaceNotes,
                    link:formValues.foodPlaceLink,
                    destination: destinationId
                },
                foodPlaceId: id
            }
        })
            .then((res) => {
                refetch();
            });
    }

    const updateAccommodation = (formValues, id) => {
        accommodationUpdate({
            variables: {
                accommodation: {
                    accommodationName: formValues.accommodationName,
                    accommodationType: formValues.accommodationType,
                    address: formValues.accommodationAddress,
                    notes: formValues.accommodationNotes,
                    link:formValues.accommodationLink,
                    destination: destinationId
                },
                accommodationId: id
            }
        })
            .then((res) => {
                refetch();
            });
    }

    const createNewAccommodation = (formValues) => {
        accommodationCreate({
            variables:
                {
                    accommodation: {
                        accommodationName: formValues.accommodationName,
                        accommodationType: formValues.accommodationType,
                        address: formValues.accommodationAddress,
                        notes: formValues.accommodationNotes,
                        link:formValues.accommodationLink,
                        destination: destinationId,
                    }

                },

        })
            .then((res) => {
                refetch();
            });
    }

    const createNewActivity = (formValues) => {
        activityCreate({
            variables:
                {
                    activity: {
                        activityName: formValues.activityName,
                        activityType: formValues.activityType,
                        address: formValues.activityAddress,
                        notes: formValues.activityNotes,
                        link:formValues.activityLink,
                        destination: destinationId
                    }

                },

        })
            .then((res) => {
                refetch();
            });
    }
    const createNewFoodPlace = (formValues) => {
        foodPlaceCreate({
            variables:
                {
                    foodExperience: {
                        foodPlaceName: formValues.foodPlaceName,
                        foodType: formValues.foodPlaceType,
                        address: formValues.foodPlaceAddress,
                        notes: formValues.foodPlaceNotes,
                        link:formValues.foodPlaceLink,
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
                    <StyledBackButton startIcon={<ArrowBackIcon/>} onClick={handleNavigateToMyDestinations}>My
                        Destinations</StyledBackButton>
                </CardActions>
                <CardContent>
                    <Typography variant="h3" component="div" color="text.secondary" gutterBottom>
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
                                            <IconButton color="info" aria-label="add activity" component="span"
                                                        onClick={() => setOpenActivity(true)}>
                                                <AddIcon fontSize="large"/>
                                            </IconButton>
                                        </StyledHeader>
                                    </ListSubheader>
                                }
                            >
                                {
                                    data?.destination.destinationActivity.length > 0 &&
                                    data?.destination.destinationActivity.map(el => <ActivityListItem key={el._id}
                                                                                                      activity={el}
                                                                                                      deleteActivity={deleteActivity}
                                                                                                      updateActivity={updateActivity}
                                                                                                      activityCollapseClick={activityCollapseClick}
                                                                                                      collapseState={activityCollapse.includes(el._id)}

                                    />)
                                }
                                {
                                    data?.destination.destinationActivity.length === 0 &&
                                    <Typography sx={{textAlign: 'center', paddingTop: 1}}>No Activities
                                        Found</Typography>
                                }

                            </List>
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <List
                                sx={{width: '100%', maxWidth: 360, bgcolor: 'background.neutral'}}
                                component="nav"
                                aria-labelledby="food-list-subheader"
                                subheader={
                                    <ListSubheader component="div" id="food-list-subheader">
                                        <StyledHeader>
                                            <LocalDiningIcon fontSize='large' color="success"/><Typography
                                            sx={{paddingLeft: 1}} variant={'h5'} component={'div'}>Food
                                            Places</Typography>
                                            <IconButton color="info" aria-label="add food" component="span"
                                                        onClick={() => setOpenFoodExperience(true)}>
                                                <AddIcon fontSize="large"/>
                                            </IconButton>

                                        </StyledHeader>
                                    </ListSubheader>
                                }
                            >
                                {
                                    data?.destination.destinationFood.length > 0 &&
                                    data?.destination.destinationFood.map(el => <FoodPlaceListItem key={el._id}
                                                                                                   foodPlace={el}
                                                                                                   deleteFoodPlace={deleteFoodPlace}
                                                                                                   updateFoodPlace={updateFoodPlace}
                                                                                                   foodPlaceCollapseClick={foodPlaceCollapseClick}
                                                                                                   collapseState={foodPlaceCollapse.includes(el._id)}
                                    />)
                                }
                                {
                                    data?.destination.destinationFood.length === 0 &&
                                    <Typography sx={{textAlign: 'center', paddingTop: 1}}>No Food Places
                                        Found</Typography>
                                }

                            </List>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <List
                                sx={{width: '100%', maxWidth: 360, bgcolor: 'background.neutral'}}
                                component="nav"
                                aria-labelledby="food-list-subheader"
                                subheader={
                                    <ListSubheader component="div" id="food-list-subheader">
                                        <StyledHeader>
                                            <HotelIcon fontSize='large' color="success"/><Typography
                                            sx={{paddingLeft: 1}} variant={'h5'}
                                            component={'div'}>Accommodations</Typography>
                                            <IconButton color="info" aria-label="add activity" component="span"
                                                        onClick={() => setOpenAccommodation(true)}>
                                                <AddIcon fontSize="large"/>
                                            </IconButton>
                                        </StyledHeader>
                                    </ListSubheader>
                                }
                            >
                                {
                                    data?.destination.destinationAccommodation.length > 0 &&
                                    data?.destination.destinationAccommodation.map(el => <AccommodationListItem
                                        key={el._id}
                                        accommodation={el}
                                        deleteAccommodation={deleteAccommodation}
                                        updateAccommodation={updateAccommodation}
                                        accommodationCollapseClick={accommodationCollapseClick}
                                        collapseState={accommodationCollapse.includes(el._id)}
                                    />)
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
            <FormDialog title='Add Activity' open={openActivity} onClose={() => setOpenActivity(false)}>
                <ActivityForm submitForm={createNewActivity}
                              onCancel={() => setOpenActivity(false)}
                />
            </FormDialog>
            <FormDialog title='Add Food Place' open={openFoodExperience} onClose={() => setOpenFoodExperience(false)}>
                <FoodExperienceForm submitForm={createNewFoodPlace}
                                    onCancel={() => setOpenFoodExperience(false)}/>
            </FormDialog>
            <FormDialog title='Add Accommodation' open={openAccommodation} onClose={() => setOpenAccommodation(false)}>
                <AccommodationForm submitForm={createNewAccommodation}
                                   onCancel={() => setOpenAccommodation(false)}/>
            </FormDialog>
        </>
    );
};

export default DestinationInfo;
