import { Typography, Paper, Collapse } from '@material-ui/core';
import React, { useState } from 'react';
import { fade, makeStyles } from '@material-ui/core/styles'
import InputCard from './InputCard'
const useStyle = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(2)
    },
    addCard: {
        padding: theme.spacing(1, 1, 1, 2),
        margin: theme.spacing(0, 1, 1, 1),
        background: "#EBECF0",
        "&:hover": {
            background: fade('#000', 0.25)
        },
    }
}));
export default function InputContainer() {
    const classes = useStyle();
    const [open, setOpen] = useState(false);
    return (
        <div classes={classes.root}>
            <Collapse in={open}>
                <InputCard setOpen={setOpen} />
            </Collapse>
            <Collapse in={!open}>
                <Paper className={classes.addCard} elevation={0} onClick={()=>setOpen(!open)}>
                    <Typography>+ Add card</Typography>
                </Paper>
            </Collapse>
        </div>
    );
}