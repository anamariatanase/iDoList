import { AppBar, Button, Toolbar } from '@material-ui/core';
import React from 'react';
import { makeStyles } from "@material-ui/core/styles"
import { Link } from 'react-router-dom';

const useStyle = makeStyles((theme) => ({
    AppBar: {
        background: 'blue'
    },
    title: {
        flexGrow: 1,
    },
    btnBackground: {
        color: "#fff"
    },
    btnLogin: {
        color: "#fff"
    },
    btnRegister: {
        color: "#fff"
    }

}))
function TopBar({ setOpenSideMenu, name, setName, setRedirect, message, setMessage,setLoggedIn,loggedIn }) {
    const classes = useStyle();
    let menu;
    console.log(name)
    console.log(loggedIn)

    const logout = async () => {

        await fetch('http://localhost:3001/api/logout', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',

        });
      //  
    }
    if (!loggedIn) {
        console.log(loggedIn)


        menu = (
            <AppBar position="static" className={classes.AppBar} elevation={0}>
                <Toolbar>
                    <h1 className={classes.title}>iDoList</h1>
                    <Link to="/login">
                        <Button className={classes.btnLogin}>Login</Button>
                    </Link>
                    <Link to="/register">
                        <Button className={classes.btnRegister}>Register</Button>

                    </Link>

                </Toolbar>
            </AppBar>
        )
    } else {
        menu = (
            <AppBar position="static" className={classes.AppBar} elevation={0}>
                <Toolbar>
                    <h1 className={classes.title}>iDoList</h1>

                    <Button className={classes.btnBackground} onClick={() => setOpenSideMenu(true)}>Change Background</Button>
                    <Link to="/login">
                        <Button className={classes.btnLogin} onClick={logout}
                        >Logout</Button>
                    </Link>

                </Toolbar>
            </AppBar>
        )

    }
    return menu;
}

export default TopBar;