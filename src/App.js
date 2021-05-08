import React, { useState } from 'react';
import Wrapper from './components/wrapper'
import { makeStyles } from '@material-ui/core/styles'
import Navigation from './components/nav/Navigation';
import images from './utils/images';
const useStyle = makeStyles((theme) => ({

}));
function App() {
  const classes = useStyle();
  const [backgroundImage, setBackgroundImage] = useState('grey');
  return (
    <div className={classes.root} style={{
      backgroundImage: backgroundImage,
      backgroundColor: backgroundImage,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover'
    }}>
      <Navigation setBackgroundImage={setBackgroundImage} />
      <Wrapper />
    </div>
  )
}

export default App;