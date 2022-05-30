import React from 'react';
import {Controller, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";
import {foodExperienceSchema} from "../../util/yupValidatorSchemas";
import {Box, Button, Grid, MenuItem, TextField} from "@mui/material";

const FoodExperienceForm = ({createNewFoodPlace, toggleDialog}) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
        reset,
    } = useForm({
        defaultValues:{
            foodPlaceType: "dinner",
        },
        mode: 'onBlur',
        reValidateMode: 'onBlur',
        resolver: yupResolver(foodExperienceSchema),
    });
    const onSubmit = (formValues,e) => {
        createNewFoodPlace(formValues);
        e.target.reset();
        toggleDialog('Food');

    }
    return (
        <Box>
            {/*<h3>Add Trip Food Place</h3>*/}
            <Grid container spacing={2} component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
                <Grid item xs={12} >
                    <TextField
                        id="foodPlaceName"
                        name="foodPlaceName"
                        label="Food Place Name"
                        margin='dense'
                        {...register('foodPlaceName')}
                        error={Boolean(errors.name)}
                        helperText={errors.name?.message}
                        size="small"
                        sx={{width: '400px'}}
                    />
                </Grid>
                <Grid item xs={12} >
                    <Controller
                        control={control}
                        name='foodPlaceType'
                        render={({ field: { onChange, value, name } }) => (
                            <TextField
                                id='foodPlaceType'
                                select
                                value={value}
                                name={name}
                                onChange={onChange}
                                label='Food Place Type'
                                margin={'normal'}
                                error={!!errors.status}
                                helperText={errors.status?.message}
                                fullWidth={true}
                                sx={{marginBottom:0, marginTop:0}}
                                size="small"
                                sx={{width:'400px'}}
                            >
                                <MenuItem value={'dinner'}>Dinner</MenuItem>*/}
                                <MenuItem value={'lunch'}>Lunch</MenuItem>
                                <MenuItem value={'breakfast'}>Breakfast</MenuItem>
                                <MenuItem value={'coffee'}>Coffee</MenuItem>
                                <MenuItem value={'other'}>Other</MenuItem>
                            </TextField>
                        )}
                    />

                </Grid>
                <Grid item xs={12} >
                    <TextField
                        id="foodPlaceAddress"
                        name="foodPlaceAddress"
                        label="Address"
                        margin='dense'
                        maxRows={2}
                        minRows={2}
                        multiline
                        {...register('foodPlaceAddress')}
                        error={Boolean(errors.name)}
                        helperText={errors.name?.message}
                        size="small"
                        sx={{width: '500px'}}
                    />
                </Grid>
                <Grid item xs={12} >
                    <TextField
                        id="foodPlaceNotes"
                        name="foodPlaceNotes"
                        label="Notes"
                        margin='dense'
                        multiline
                        maxRows={4}
                        minRows={2}
                        {...register('foodPlaceNotes')}
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
                    <Button sx={{mt:0}} onClick={()=>toggleDialog('Food')}>
                        Cancel
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
};

export default FoodExperienceForm;
