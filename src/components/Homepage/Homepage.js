import React, { useState } from 'react';
import Navigation from '../nav/Navigation';
import Wrapper from '../wrapper';


function HomePage() {
    const [backgroundImage, setBackgroundImage,] = useState('grey');
    return (
        <div style={{
            backgroundImage: backgroundImage,
            backgroundColor: backgroundImage,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover'
        }}>
{/* {             <Navigation setBackgroundImage={setBackgroundImage} />
 }    */}         <Wrapper />
        </div>


    )


}

export default HomePage;