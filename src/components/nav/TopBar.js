import { AppBar, Button, Toolbar } from '@material-ui/core';
import React from 'react';
import { makeStyles } from "@material-ui/core/styles"

const useStyle = makeStyles((theme) => ({
    AppBar: {
       background: 'none'
    },
    title:{
        flexGrow:1,
    },
    btnBackground:{
        color:"#fff"
    }

}))
function TopBar({setOpenSideMenu}) {
    const classes = useStyle();
    return (
        <div>
            <AppBar position="static" className={classes.AppBar} elevation={0}>
                <Toolbar>
                <h1 className={classes.title}>iDoList</h1>
                <Button className={classes.btnBackground} onClick={()=> setOpenSideMenu(true)}>Change Background</Button>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default TopBar;