import * as React from 'react';
import {styled} from '@mui/material/styles';
// import Grid from '@mui/material/Grid';
// import Paper from '@mui/material/Paper';
// import Typography from '@mui/material/Typography';
// import {ButtonBase} from "@mui/material";
import pic from '../static/Images/complex.png'

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, {IconButtonProps} from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import {red} from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {Menu, MenuItem} from "@mui/material";
import {Link} from "react-router-dom";

const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
    objectFit: "cover"
});

const ExpandMore = styled((props) => {
    const {expand, ...other} = props;
    return <IconButton {...other} />;
})(({theme, expand}) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));
const DestinationCard = ({destination, showControls}) => {
    const [expanded, setExpanded] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);


    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Card sx={{
            p: 2,
            margin: 'auto',
            maxWidth: 500,
            minHeight: 200,
            flexGrow: 1,
            backgroundColor: (theme) =>
                theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        }}>
            <CardHeader
                action={showControls ?
                    (
                        <><IconButton aria-label="settings" onClick={handleClick}>
                            <MoreVertIcon/>
                        </IconButton>
                            <Menu
                                id="basic-menu"
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                MenuListProps={{
                                    'aria-labelledby': 'basic-button',
                                }}
                                sx={{ marginRight: 3 }}
                            >
                                <MenuItem>Edit</MenuItem>
                                <MenuItem>Delete</MenuItem>
                            </Menu>
                        </>
                    ) : undefined
                }
                title={destination.destinationName}
                subheader="September 14, 2016"
            />
            <CardMedia
                component="img"
                height="194"
                image={pic}
                alt="Paella dish"
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {destination.destinationDescription}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                    <FavoriteIcon/>
                </IconButton>
                <IconButton aria-label="share">
                    <ShareIcon/>
                </IconButton>
                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon/>
                </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">Food Experiences</Typography>
                    {
                        destination?.destinationFood?.map(item =>
                            (<Typography variant="body2" color="text.secondary">
                                {`${item.foodPlaceName} -(${item.foodType})`}
                            </Typography>)
                        )
                    }
                    <Typography gutterBottom variant="h5" component="div">Activities</Typography>
                    {
                        destination?.destinationActivity?.map(item =>
                            (<Typography variant="body2" color="text.secondary">
                                {`${item.activityName} -(${item.activityType})`}
                            </Typography>)
                        )
                    }
                </CardContent>
            </Collapse>
        </Card>
    );
};

export default DestinationCard;
