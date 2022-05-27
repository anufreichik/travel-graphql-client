import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const DestinationInfo = ({destination}) => {
    return (
        <Card sx={{ minWidth: 500 }}>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    {destination.destinationName}
                </Typography>
                <Typography variant="h5" component="div">
                    {destination.destinationDescription}
                </Typography>
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
                <Button size="small">Show More...</Button>
            </CardActions>
        </Card>
    );
};

export default DestinationInfo;
