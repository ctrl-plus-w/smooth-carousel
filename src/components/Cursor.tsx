import './Cursor.style.css';

import { createRef, memo, useEffect } from 'react';

const lerp = (start: number, end: number, t: number): number => {
  return start * (1 - t) + end * t;
};

const Cursor = () => {
  const cursor = createRef<HTMLDivElement>();

  useEffect(() => {
    let animationFrame: number;

    let cx = window.innerWidth / 2;
    let cy = window.innerHeight / 2;

    let mx = -1;
    let my = -1;

    const onMouseMove = (event: MouseEvent) => {
      mx = event.clientX;
      my = event.clientY;
    };

    const render = (t: number) => {
      if (cursor.current && mx !== -1 && my !== -1) {
        cx = lerp(cx, mx, 0.1);
        cy = lerp(cy, my, 0.1);

        cursor.current.style.left = cx + 'px';
        cursor.current.style.top = cy + 'px';
      }

      animationFrame = window.requestAnimationFrame(render);
    };

    animationFrame = window.requestAnimationFrame(render);
    window.addEventListener('mousemove', onMouseMove);

    return () => {
      console.log('clear the animation');
      window.removeEventListener('mousemove', onMouseMove);
      window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <div id='cursor' ref={cursor}>
      1 - 50
      {/* {primaryIndex} - {MAX_IMAGE} */}
    </div>
  );
};

export default memo(Cursor);
