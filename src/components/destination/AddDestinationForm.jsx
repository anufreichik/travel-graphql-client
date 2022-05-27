import React, {useContext} from 'react';
import {Box, Button, Grid, TextField} from "@mui/material";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {destinationSchema} from "../../util/yupValidatorSchemas";
import {useNavigate} from "react-router-dom";

const AddDestinationForm = ({createNewDestination}) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        control,
    } = useForm({
        mode: 'onBlur',
        resolver: yupResolver(destinationSchema),
    });

    const onSubmit=(formValues,e)=>{
        createNewDestination(formValues);
        e.target.reset();
    }

    const navigate = useNavigate();

    const handleCancel=()=>{
        navigate('/');
    }
    return (

            <Box >
                <h3>Destination Info</h3>
                <Grid container spacing={2} component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
                    <Grid item xs={12} md={4}>
                        <TextField
                            id="name"
                            name="name"
                            label="Destination Name"
                            margin='dense'
                            {...register('name')}
                            error={Boolean(errors.name)}
                            helperText={errors.name?.message}
                            size="small"
                            sx={{width:'400px'}}
                        />
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <TextField
                            id="description"
                            name="description"
                            label="Destination Description"
                            margin='dense'
                            {...register('description')}
                            error={Boolean(errors.name)}
                            helperText={errors.name?.message}
                            size="small"
                            sx={{width:'400px'}}
                        />
                    </Grid>
                    <Grid item xs={12} md={4} sx={{pb: 2}}>
                        <Button sx={{ mt: 0 }} type="submit" variant="contained">
                           Add
                        </Button>

                        <Button sx={{ mt: 0, ml: 1 }} onClick={handleCancel} variant="outlined">
                            Cancel
                        </Button>
                    </Grid>
                </Grid>
            </Box>
    );
};

export default AddDestinationForm;
