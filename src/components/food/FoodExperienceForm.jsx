import React from 'react';
import {Controller, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";
import {foodExperienceSchema} from "../../util/yupValidatorSchemas";
import {Box, Button, Grid, MenuItem, TextField} from "@mui/material";
import { get } from 'lodash';

const FoodExperienceForm = ({foodPlace, submitForm, onCancel}) => {


    const foodPlaceName = get(foodPlace, 'foodPlaceName', '');
    const foodType = get(foodPlace, 'foodType', 'dinner');
    const address = get(foodPlace, 'address', '');
    const notes = get(foodPlace, 'notes', '');
    const url = get(foodPlace, 'link', '');
    const id = get(foodPlace, '_id', '');


    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
        reset,
    } = useForm({
        defaultValues:{
            foodPlaceName:foodPlaceName,
            foodPlaceType: foodType,
            foodPlaceAddress:address,
            foodPlaceNotes:notes,
            foodPlaceLink:url
        },
        mode: 'onBlur',
        reValidateMode: 'onBlur',
        resolver: yupResolver(foodExperienceSchema),
    });

    const onSubmit = (formValues,e) => {
        if(!id)
            submitForm(formValues);
        else
            submitForm(formValues, id)
        e.target.reset();
        onCancel();
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
                        error={Boolean(errors.foodPlaceName)}
                        helperText={errors.foodPlaceName?.message}
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
                                error={!!errors.foodPlaceType}
                                helperText={errors.foodPlaceType?.message}
                                fullWidth={true}
                                sx={{marginBottom:0, marginTop:0,width:'400px'}}
                                size="small"
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
                        error={Boolean(errors.foodPlaceAddress)}
                        helperText={errors.foodPlaceAddress?.message}
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
                        error={Boolean(errors.foodPlaceNotes)}
                        helperText={errors.foodPlaceNotes?.message}
                        size="small"
                        sx={{width: '500px'}}
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        id="foodPlaceLink"
                        label="Food Place Link"
                        margin={'normal'}
                        {...register('foodPlaceLink')}
                        error={!!errors.foodPlaceLink}
                        helperText={errors.foodPlaceLink?.message}
                        fullWidth={true}
                    />
                </Grid>

                <Grid item xs={12}  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    paddingBottom: 1,
                    paddingTop:1,
                    gap:1
                }}>
                    <Button sx={{mt:0}} type="submit" variant="contained">
                        Submit
                    </Button>
                    <Button sx={{mt:0}} onClick={onCancel} variant="contained" color='secondary'>
                        Cancel
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
};

export default FoodExperienceForm;
