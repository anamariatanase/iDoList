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
export default function List({list}){
    const classes = useStyle();
    return (
        <div>
            <Paper className={classes.root}>
                <CssBaseline/>
                <Typography>
                    <Title title={list.title}/>
                    {list.cards.map((card)=>(
                        <Card key={card.id} card={card}/>
                    ))}
                    <InputContainer/>
                </Typography>
            </Paper>
        </div>
    )
}