import React, {useContext} from 'react';
import {AuthContext} from "../context/authContext";
import {Box, Button, Grid, TextField} from "@mui/material";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {destinationSchema} from "../util/yupValidatorSchemas";
import {useMutation} from "@apollo/client";
import {DESTINATION_CREATE} from "../graphql/Mutation";

const AddNewDestination = () => {

    const [destinationCreate, {loading, error}] = useMutation(DESTINATION_CREATE);

    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
    } = useForm({
        mode: 'onBlur',
        resolver: yupResolver(destinationSchema),
    });

    const onSubmit=(formValues)=>{
        destinationCreate({
            variables:
                {destinationName: formValues.name},

        })
            .then((r)=>{
            console.log(r,'result')});
    }

    const handleCancel=()=>{

    }
    return (
        <div>
            <Box >
                <h3>Destination Info</h3>
                <Grid container spacing={2} component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
                    <Grid item xs={12}>
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
                    <Grid item xs={12} sm={12} sx={{pb: 2}}>
                        <Button sx={{ mt: 5 }} type="submit" variant="contained">
                           Submit
                        </Button>

                        <Button sx={{ mt: 5, ml: 1 }} onClick={handleCancel} variant="outlined">
                            Cancel
                        </Button>
                    </Grid>
                </Grid>
            </Box>
            <div>
                <h3>Food Info</h3>

            </div>
            <div>
                <h3>Accommodation Info</h3>

            </div>
        </div>
    );
};

export default AddNewDestination;
