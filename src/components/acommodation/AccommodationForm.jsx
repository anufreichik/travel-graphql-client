import React from 'react';
import {Controller, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";
import {accommodationSchema} from "../../util/yupValidatorSchemas";
import {Box, Button, Grid, MenuItem, TextField} from "@mui/material";
import {get} from "lodash";

const AccommodationForm = ({accommodation, submitForm, onCancel}) => {

    const accommodationName = get(accommodation, 'accommodationName', '');
    const accommodationType = get(accommodation, 'accommodationType', 'hotel');
    const address = get(accommodation, 'address', '');
    const notes = get(accommodation, 'notes', '');
    const url = get(accommodation, 'link', '');
    const id = get(accommodation, '_id', '');


    const {
        register,
        handleSubmit,
        formState: {errors},
        control,
        reset,
    } = useForm({
        defaultValues: {
            accommodationName: accommodationName,
            accommodationType: accommodationType,
            accommodationAddress: address,
            accommodationNotes: notes,
            accommodationLink:url
        },
        mode: 'onBlur',
        reValidateMode: 'onBlur',
        resolver: yupResolver(accommodationSchema),
    });
    const onSubmit = (formValues, e) => {
        if (!id)
            submitForm(formValues);
        else
            submitForm(formValues, id);
        e.target.reset();
        onCancel();

    }
    return (
        <Box>
            <Grid container spacing={2} component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
                <Grid item xs={12}>
                    <TextField
                        id="accommodationName"
                        name="accommodationName"
                        label="Accommodation Name"
                        margin='dense'
                        {...register('accommodationName')}
                        error={Boolean(errors.accommodationName)}
                        helperText={errors.accommodationName?.message}
                        size="small"
                        sx={{width: '400px'}}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Controller
                        control={control}
                        name='accommodationType'
                        render={({field: {onChange, value, name}}) => (
                            <TextField
                                id='accommodationType'
                                select
                                value={value}
                                name={name}
                                onChange={onChange}
                                label='Accommodation Type'
                                margin={'normal'}
                                error={!!errors.accommodationType}
                                helperText={errors.accommodationType?.message}
                                fullWidth={true}
                                sx={{marginBottom: 0, marginTop: 0, width: '400px'}}
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
                <Grid item xs={12}>
                    <TextField
                        id="accommodationAddress"
                        name="accommodationAddress"
                        label="Address"
                        margin='dense'
                        maxRows={2}
                        minRows={2}
                        multiline
                        {...register('accommodationAddress')}
                        error={Boolean(errors.accommodationAddress)}
                        helperText={errors.accommodationAddress?.message}
                        size="small"
                        sx={{width: '500px'}}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id="accommodationNotes"
                        name="accommodationNotes"
                        label="Notes"
                        margin='dense'
                        multiline
                        maxRows={4}
                        minRows={2}
                        {...register('accommodationNotes')}
                        error={Boolean(errors.accommodationNotes)}
                        helperText={errors.accommodationNotes?.message}
                        size="small"
                        sx={{width: '500px'}}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id="accommodationLink"
                        label="Accommodation Link"
                        margin={'normal'}
                        {...register('accommodationLink')}
                        error={!!errors.accommodationLink}
                        helperText={errors.accommodationLink?.message}
                        fullWidth={true}
                    />
                </Grid>

                <Grid item xs={12} sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: 1,
                    paddingBottom: 1,
                    paddingTop: 1
                }}>
                    <Button sx={{mt: 0}} type="submit" variant="contained" color='primary'>
                        Submit
                    </Button>
                    <Button sx={{mt: 0}} onClick={onCancel} variant="contained" color='secondary'>
                        Cancel
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
};

export default AccommodationForm;
