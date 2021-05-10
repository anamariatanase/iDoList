import React, { useState } from 'react';
import TopBar from './TopBar';
import SideMenu from './SideMenu';


function Navigation({name,setName, loggedIn, setLoggedIn,setBackgroundImage}){
    const [openSideMenu,setOpenSideMenu] = useState(false);

    return (
       
        
        <div>
            
            <TopBar setOpenSideMenu={setOpenSideMenu} loggedIn={loggedIn} setLoggedIn={setLoggedIn} name={name} setName={setName}></TopBar>
            <SideMenu openSideMenu={openSideMenu} setOpenSideMenu={setOpenSideMenu} setNewBackgroundImage={setBackgroundImage}/>
        </div>
    )
}
export default Navigation;