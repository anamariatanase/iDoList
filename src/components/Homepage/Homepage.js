import React, { useState } from 'react';
import Navigation from '../nav/Navigation';
import Wrapper from '../wrapper';


function HomePage({ apiContent,loggedIn, setLoggedIn,backgroundImage}) {
   // const [backgroundImage, setBackgroundImage,] = useState('grey');
    setLoggedIn(true)
    return (
        <div  style={{
            backgroundImage: backgroundImage,
            backgroundColor: backgroundImage,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover'
        }}>
            {/* <Navigation setBackgroundImage={setBackgroundImage} /> */}
            <Wrapper apiContent={apiContent} />
        </div>


    )


}

export default HomePage;