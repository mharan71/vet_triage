import React from 'react';
import { useState , useEffect, useRef} from 'react';
import '../CSS/CountUpTimer.css';

// Description: How to create a countdown timer in React JS
// Source: How to create a countdown timer in React JS using React hooks useState & useEffect v2
// Reference: https://www.youtube.com/watch?v=GA2LdsTmW1k

// Description: How to implement useEffect hook
// Source: How to create a countdown timer in React JS using React hooks useState & useEffect v2, Learn Web Dev with Norbert
// Reference: https://react.dev/reference/react/useEffect


// Function that tracks and displays the elapsed time (seconds, minutes, hours)

function CountUpTimer({running}) {
	// Variables that track state of time, reference variable for previous seconds
	const [hours, setHours] = useState(0);
	const [minutes, setMinutes] = useState(0);
	const [seconds, setSeconds] = useState(0);
	const prevSeconds = useRef();

	// When running is true, seconds increment by 1
	useEffect(() => {
		let time;
		if (running) {
			time = setInterval (() => {
				setSeconds((prevSeconds) => {
					if (prevSeconds === 59) {
						return 0;
					} else {
						return prevSeconds + 1;    
					}
				});
			}, 1000);
		}
		// Clear timer when running changes
		return () => clearInterval(time);
	}, [running]);
					 
	// Determines if seconds have gone from 59 to 0, at which point minutes increment by 1.  When minutes go from 59 to 0, hours increment by one.
	useEffect(() => {
		if (running) {
			if (prevSeconds.current === 59 && seconds === 0) {
				setMinutes((prevMinutes) => {
					if (prevMinutes === 59) {
						setHours((prevHours) => prevHours +1);
						return 0;
					} else {
						return prevMinutes + 1;
					}
				});
			}
			prevSeconds.current = seconds;
		}
		}, [seconds, running]);
		
	
	// Render hours, minutes, and seconds
	return (
		<div className='timer-cont'>
			<div className='timer'>
				<strong>Time Waiting: </strong> 
				{hours} Hours {minutes} Minutes {seconds} Seconds
			</div>
		</div>
	);
}


export default CountUpTimer;