import React, { useState } from 'react';
import TopBar from './TopBar';
import SideMenu from './SideMenu';


function Navigation({setBackgroundImage}){
    const [openSideMenu,setOpenSideMenu] = useState(false)
    return (
        <div>
            <TopBar setOpenSideMenu={setOpenSideMenu}></TopBar>
            <SideMenu openSideMenu={openSideMenu} setOpenSideMenu={setOpenSideMenu} setNewBackgroundImage={setBackgroundImage}/>
        </div>
    )
}
export default Navigation;