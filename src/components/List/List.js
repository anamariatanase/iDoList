import React from 'react';
import {CssBaseline, Paper, Typography} from '@material-ui/core';
import {makeStyles} from "@material-ui/core/styles";
import Title from './Title';
import Card from './Card';
import InputContainer from '../Input/InputContainer';
const useStyle = makeStyles((theme)=>({
    root:{
        width:'300px',
        backgroundColor:'#EBECF0',
        marginLeft:theme.spacing()

    },
}));
export default function List(){
    const classes = useStyle();
    return (
        <div>
            <Paper className={classes.root}>
                <CssBaseline/>
                <Typography>
                    <Title/>
                    <Card/>
                    <Card/>
                    <Card/>
                    <InputContainer/>
                </Typography>
            </Paper>
        </div>
    )
}