import React, {useContext} from 'react';
import {Box, Button, Grid, TextField} from "@mui/material";
import {useForm, Controller} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {destinationSchema} from "../../util/yupValidatorSchemas";

const DestinationForm = ({onSubmitForm, onClose}) => {
    const {
        register,
        handleSubmit,
        formState: {errors},
        reset,
        control,
    } = useForm({
        mode: 'onBlur',
        resolver: yupResolver(destinationSchema),
    });

    const onSubmit = (formValues, e) => {
        onSubmitForm(formValues);
        e.target.reset();
        onClose();
    }

    const handleCancel = () => {
        onClose();
    }

    return (

        <Box>
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
                        sx={{width: '500px'}}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id="description"
                        name="description"
                        label="Destination Description"
                        margin='dense'
                        multiline
                        maxRows={6}
                        minRows={4}
                        {...register('description')}
                        error={Boolean(errors.name)}
                        helperText={errors.name?.message}
                        size="small"
                        sx={{width:'500px'}}
                    />
                </Grid>
                <Grid item xs={12}  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    paddingBottom: 2,
                    paddingTop:2
                }}>
                    <Button sx={{mt: 0}} type="submit" variant="contained" color='primary'>
                        Submit
                    </Button>

                    <Button sx={{mt: 0, ml: 1}} onClick={handleCancel} variant="contained" color='secondary'>
                        Cancel
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
};

export default DestinationForm;
