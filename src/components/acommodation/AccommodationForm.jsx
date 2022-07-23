import React from 'react';
import {Controller, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";
import {accommodationSchema} from "../../util/yupValidatorSchemas";
import {Box, Button, Grid, MenuItem, TextField} from "@mui/material";

const AccommodationForm = ({submitForm, onCancel}) => {

    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
        reset,
    } = useForm({
        defaultValues:{
            accommodationType: "hotel",
        },
        mode: 'onBlur',
        reValidateMode: 'onBlur',
        resolver: yupResolver(accommodationSchema),
    });
    const onSubmit =  (formValues,e) => {
        submitForm(formValues);
        e.target.reset();
        onCancel();

    }
    return (
        <Box>
            <Grid container spacing={2} component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
                <Grid item xs={12} >
                    <TextField
                        id="accommodationName"
                        name="accommodationName"
                        label="Accommodation Name"
                        margin='dense'
                        {...register('accommodationName')}
                        error={Boolean(errors.name)}
                        helperText={errors.name?.message}
                        size="small"
                        sx={{width: '400px'}}
                    />
                </Grid>
                <Grid item xs={12} >
                    <Controller
                        control={control}
                        name='accommodationType'
                        render={({ field: { onChange, value, name } }) => (
                            <TextField
                                id='accommodationType'
                                select
                                value={value}
                                name={name}
                                onChange={onChange}
                                label='Accommodation Type'
                                margin={'normal'}
                                error={!!errors.status}
                                helperText={errors.status?.message}
                                fullWidth={true}
                                sx={{marginBottom:0, marginTop:0,width:'400px'}}
                                size="small"
                            >
                                <MenuItem value={'hotel'}>Hotel</MenuItem>*/}
                                <MenuItem value={'airbnb'}>AirBnb</MenuItem>
                                <MenuItem value={'b&b'}>Bed & Breakfast</MenuItem>
                                <MenuItem value={'other'}>Other</MenuItem>
                            </TextField>
                        )}
                    />

                </Grid>
                <Grid item xs={12} >
                    <TextField
                        id="accommodationAddress"
                        name="accommodationAddress"
                        label="Address"
                        margin='dense'
                        maxRows={2}
                        minRows={2}
                        multiline
                        {...register('accommodationAddress')}
                        error={Boolean(errors.name)}
                        helperText={errors.name?.message}
                        size="small"
                        sx={{width: '500px'}}
                    />
                </Grid>
                <Grid item xs={12} >
                    <TextField
                        id="accommodationNotes"
                        name="accommodationNotes"
                        label="Notes"
                        margin='dense'
                        multiline
                        maxRows={4}
                        minRows={2}
                        {...register('accommodationNotes')}
                        error={Boolean(errors.name)}
                        helperText={errors.name?.message}
                        size="small"
                        sx={{width: '500px'}}
                    />
                </Grid>
                <Grid item xs={12} sx={{pb: 2}}>
                    <Button sx={{mt:0}} type="submit">
                        Add
                    </Button>
                    <Button sx={{mt:0}} onClick={onCancel}>
                        Cancel
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
};

export default AccommodationForm;
