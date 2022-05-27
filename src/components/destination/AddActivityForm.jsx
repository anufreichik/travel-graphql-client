import React from 'react';
import {Box, Button, Grid, MenuItem, Select, Stack, TextField} from "@mui/material";
import {yupResolver} from "@hookform/resolvers/yup";
import {activitySchema} from "../../util/yupValidatorSchemas";
import { Controller, useForm } from 'react-hook-form';

const AddActivityForm = ({createNewActivity}) => {
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
        //console.log(formValues)
    }

    return (
        <Box  >
            <h3>Add Trip Activity</h3>
            <Grid container spacing={2} component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
                <Grid item xs={12} md={4}>
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
                <Grid item xs={12} md={4}>
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
                                >
                                    <MenuItem value={'general'}>General Activity</MenuItem>*/}
                                    <MenuItem value={'sport'}>Sport Activity</MenuItem>
                                    <MenuItem value={'hiking'}>Hiking</MenuItem>
                                    <MenuItem value={'art'}>Entertainment & Art</MenuItem>
                                </TextField>
                            )}
                        />

                </Grid>

                <Grid item xs={12} md={4} sx={{pb: 2}}>
                    <Button sx={{mt:0}} type="submit" variant="contained">
                        Add
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
};

export default AddActivityForm;
