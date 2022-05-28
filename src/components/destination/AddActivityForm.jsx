import React from 'react';
import {Box, Button, Grid, MenuItem, Select, Stack, TextField} from "@mui/material";
import {yupResolver} from "@hookform/resolvers/yup";
import {activitySchema} from "../../util/yupValidatorSchemas";
import { Controller, useForm } from 'react-hook-form';

const AddActivityForm = ({createNewActivity, toggleDialog}) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
        reset,
    } = useForm({
        defaultValues:{
            activityType: "general",
        },
        mode: 'onBlur',
        reValidateMode: 'onBlur',
        resolver: yupResolver(activitySchema),
    });
    const onSubmit = (formValues,e) => {
        createNewActivity(formValues);
        e.target.reset();
        toggleDialog('Activity');

    }

    return (
        <Box>
            {/*<h3>Add Trip Activity</h3>*/}
            <Grid container spacing={2} component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
                <Grid item xs={12} >
                    <TextField
                        id="activityName"
                        name="activityName"
                        label="Activity Name"
                        margin='dense'
                        {...register('activityName')}
                        error={Boolean(errors.name)}
                        helperText={errors.name?.message}
                        size="small"
                        sx={{width: '400px'}}
                    />
                </Grid>
                <Grid item xs={12} >
                        <Controller
                            control={control}
                            name='activityType'
                            render={({ field: { onChange, value, name } }) => (
                                <TextField
                                    id='activityType'
                                    select
                                    value={value}
                                    name={name}
                                    onChange={onChange}
                                    label='Activity Type'
                                    margin={'normal'}
                                    error={!!errors.status}
                                    helperText={errors.status?.message}
                                    fullWidth={true}
                                    sx={{marginBottom:0, marginTop:0}}
                                    size="small"
                                    sx={{width:'400px'}}
                                >
                                    <MenuItem value={'general'}>General Activity</MenuItem>*/}
                                    <MenuItem value={'sport'}>Sport Activity</MenuItem>
                                    <MenuItem value={'hiking'}>Hiking</MenuItem>
                                    <MenuItem value={'art'}>Entertainment & Art</MenuItem>
                                </TextField>
                            )}
                        />

                </Grid>
                <Grid item xs={12} >
                    <TextField
                        id="activityAddress"
                        name="activityAddress"
                        label="Address"
                        margin='dense'
                        maxRows={2}
                        minRows={2}
                        multiline
                        {...register('activityAddress')}
                        error={Boolean(errors.name)}
                        helperText={errors.name?.message}
                        size="small"
                        sx={{width: '500px'}}
                    />
                </Grid>
                <Grid item xs={12} >
                    <TextField
                        id="activityNotes"
                        name="activityNotes"
                        label="Notes"
                        margin='dense'
                        multiline
                        maxRows={4}
                        minRows={2}
                        {...register('activityNotes')}
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
                    <Button sx={{mt:0}} onClick={()=>toggleDialog('Activity')}>
                        Cancel
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
};

export default AddActivityForm;
