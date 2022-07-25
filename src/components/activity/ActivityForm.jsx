import React from 'react';
import {Box, Button, Grid, MenuItem, Select, Stack, TextField} from "@mui/material";
import {yupResolver} from "@hookform/resolvers/yup";
import {activitySchema} from "../../util/yupValidatorSchemas";
import {Controller, useForm} from 'react-hook-form';
import {get} from "lodash";

const ActivityForm = ({activity, submitForm, onCancel}) => {

    const activityName = get(activity, 'activityName', '');
    const activityType = get(activity, 'activityType', 'general');
    const address = get(activity, 'address', '');
    const notes = get(activity, 'notes', '');
    const url = get(activity, 'link', '');
    const id = get(activity, '_id', '');

    const {
        register,
        handleSubmit,
        formState: {errors},
        control,
        reset,
    } = useForm({
        defaultValues: {
            activityName: activityName,
            activityType: activityType,
            activityAddress: address,
            activityNotes: notes,
            activityLink:url
        },
        mode: 'onBlur',
        reValidateMode: 'onBlur',
        resolver: yupResolver(activitySchema),
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
            {/*<h3>Add Trip Activity</h3>*/}
            <Grid container spacing={2} component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
                <Grid item xs={12}>
                    <TextField
                        id="activityName"
                        name="activityName"
                        label="Activity Name"
                        margin='dense'
                        {...register('activityName')}
                        error={Boolean(errors.activityName)}
                        helperText={errors.activityName?.message}
                        size="small"
                        sx={{width: '400px'}}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Controller
                        control={control}
                        name='activityType'
                        render={({field: {onChange, value, name}}) => (
                            <TextField
                                id='activityType'
                                select
                                value={value}
                                name={name}
                                onChange={onChange}
                                label='Activity Type'
                                margin={'normal'}
                                error={!!errors.activityType}
                                helperText={errors.activityType?.message}
                                fullWidth={true}
                                sx={{marginBottom: 0, marginTop: 0, width: '400px'}}
                                size="small"
                            >
                                <MenuItem value={'general'}>General Activity</MenuItem>*/}
                                <MenuItem value={'sport'}>Sport Activity</MenuItem>
                                <MenuItem value={'hiking'}>Hiking</MenuItem>
                                <MenuItem value={'art'}>Entertainment & Art</MenuItem>
                            </TextField>
                        )}
                    />

                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id="activityAddress"
                        name="activityAddress"
                        label="Address"
                        margin='dense'
                        maxRows={2}
                        minRows={2}
                        multiline
                        {...register('activityAddress')}
                        error={Boolean(errors.activityAddress)}
                        helperText={errors.activityAddress?.message}
                        size="small"
                        sx={{width: '500px'}}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id="activityNotes"
                        name="activityNotes"
                        label="Notes"
                        margin='dense'
                        multiline
                        maxRows={4}
                        minRows={2}
                        {...register('activityNotes')}
                        error={Boolean(errors.activityNotes)}
                        helperText={errors.activityNotes?.message}
                        size="small"
                        sx={{width: '500px'}}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id="activityLink"
                        label="Activity Link"
                        margin={'normal'}
                        {...register('activityLink')}
                        error={!!errors.activityLink}
                        helperText={errors.activityLink?.message}
                        fullWidth={true}
                    />
                </Grid>
                <Grid item xs={12} sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    paddingBottom: 1,
                    paddingTop: 1,
                    gap: 1
                }}>
                    <Button sx={{mt: 0}} type="submit" variant="contained">
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

export default ActivityForm;
