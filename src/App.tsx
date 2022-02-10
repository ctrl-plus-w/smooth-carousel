import './App.css';

import { createRef, FC, useEffect, useState } from 'react';
import { gsap } from 'gsap';

const MAX_IMAGE = 19;

const App: FC = () => {
  const primaryImage = createRef<HTMLImageElement>();
  const secondaryImage = createRef<HTMLImageElement>();
  const ternaryImage = createRef<HTMLImageElement>();

  const [imageIndexes, setImageIndexes] = useState([0, 1, 2]);

  const [blocked, setBlocked] = useState(false);

  const onClick = () => {
    // Prevent spams
    if (blocked) return;

    setBlocked(true);

    let tl = gsap.timeline();

    const primaryVars = {
      opacity: 0,
      transform: 'translate(-50%, calc(-50% + 2rem))',
      scale: '1.05',
      duration: 0.3,
    };

    const secondaryVars = {
      opacity: 1,
      top: '50%',
      height: '60vh',
      duration: 0.3,
    };

    const ternaryVars = {
      top: '40%',
      opacity: '50%',
      duration: 0.3,
    };

    tl.to(primaryImage.current, primaryVars, '<');
    tl.to(secondaryImage.current, secondaryVars, '<');
    tl.to(ternaryImage.current, ternaryVars, '<');

    tl.play();

    tl.eventCallback('onComplete', () => {
      // Reset the timeline and instantly update the images
      tl.time(0).kill();

      // Check if the image index is greater or equal to 18 (otherwise, reset index to 0)
      const clamp = (v: number) => (v + 1 <= MAX_IMAGE ? v + 1 : 0);

      // Update the images
      setImageIndexes((prev) => prev.map(clamp));

      setBlocked(false);
    });
  };

  useEffect(() => {
    console.log('main component renders');
  });

  return (
    <main onClick={onClick}>
      {/* ! Unstable ! */}
      {/* <Cursor /> */}

      <img src={require(`./images/img${imageIndexes[0]}.jpg`)} alt='img' id='main-img' ref={primaryImage} />
      <img src={require(`./images/img${imageIndexes[1]}.jpg`)} alt='img' id='secondary-img' ref={secondaryImage} />
      <img src={require(`./images/img${imageIndexes[2]}.jpg`)} alt='img' id='ternary-img' ref={ternaryImage} />
    </main>
  );
};

export default App;
