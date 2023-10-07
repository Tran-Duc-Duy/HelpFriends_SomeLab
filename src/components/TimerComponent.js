import React, { useState, useEffect, useRef } from 'react';
import './style.css';
const TimerComponent = () => {
  let timeId = useRef(null);

  const [count, setCount] = useState('');
  const handleStart = () => {
    timeId.current = setInterval(() => {
      setCount((prevCount) => prevCount - 1);
    }, 1000);
  };

  useEffect(() => {
    if (count === 0) {
      clearInterval(timeId.current);
    }
    if (count < 0) {
      clearInterval(timeId.current);
      setCount(0);
    }
  }, [count]);

  return (
    <div className='Timer'>
      <input
        type='number'
        value={count}
        min={0}
        onChange={(e) => setCount(e.currentTarget.value)}
        className='input'
      />
      <div className='btn'>
        <button className='start' onClick={() => setCount('')}>Reset</button>
        <button className='reset' onClick={handleStart}>Start</button>
      </div>
      {count <= 0 && <p className='finished'>FINISHED!</p>}
    </div>
  );
};

export default TimerComponent;