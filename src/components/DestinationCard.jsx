import * as React from 'react';
import {styled} from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';

const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
});


const DestinationCard = ({destination}) => {
    return (
        <Paper
            sx={{
                p: 2,
                margin: 'auto',
                maxWidth: 500,
                flexGrow: 1,
                backgroundColor: (theme) =>
                    theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
            }}
        >
            <Grid container spacing={2}>
                {/*<Grid item>*/}
                {/*    <ButtonBase sx={{ width: 128, height: 128 }}>*/}
                {/*        <Img alt="complex" src="/static/images/complex.jpg" />*/}
                {/*    </ButtonBase>*/}
                {/*</Grid>*/}
                <Grid item xs={12} sm container>
                    <Grid item xs container direction="column" spacing={2}>
                        <Grid item xs>
                            <Typography gutterBottom variant="subtitle1" component="div">
                                {destination.destinationName}
                            </Typography>
                            {
                                destination.destinationFood.length>0 &&
                                <>
                                    <Typography variant="caption" gutterBottom marginRight={1}>
                                        {destination?.destinationFood[0]?.foodPlaceName || '' }
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">
                                        ({destination?.destinationFood[0]?.foodType|| '' })
                                    </Typography>
                                </>
                            }

                        </Grid>
                        <Grid item>
                            <Typography variant="body2">

                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Typography variant="subtitle1" component="div">
                           user avatar
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default DestinationCard;
