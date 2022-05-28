import React, {useContext, useEffect} from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


import {useQuery} from "@apollo/client";
import {GET_DESTINATION_BYID} from "../../graphql/Query";

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
    useEffect(()=>{
           refetch();
    },[refresh]);

   if(loading) return <div>Loading...</div>



    return (
        <Card sx={{ minWidth: 500 }}>
            <CardContent>
                <Typography  variant="h5" component="div" color="text.secondary" gutterBottom>
                    {data?.destination.destinationName}
                </Typography>
                <Typography sx={{ fontSize: 14 }}>
                    {data?.destination.destinationDescription?.slice(0,200)}{data?.destination.destinationDescription?.length>200?'...':''}
                </Typography>
                {
                    data?.destination.destinationActivity.length>0 &&
                    data?.destination.destinationActivity.map(el=>
                        (<div key={el._id}>{el.activityName}</div>)
                    )
                }
                {/*<Typography sx={{ mb: 1.5 }} color="text.secondary">*/}
                {/*    adjective*/}
                {/*</Typography>*/}
                {/*<Typography variant="body2">*/}
                {/*    well meaning and kindly.*/}
                {/*    <br />*/}
                {/*    {'"a benevolent smile"'}*/}
                {/*</Typography>*/}
            </CardContent>
            <CardActions>
                <Button size="small">Back To My Experiences</Button>
            </CardActions>
        </Card>
    );
};

export default DestinationInfo;
