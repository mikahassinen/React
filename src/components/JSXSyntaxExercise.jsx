import React from 'react';

const buttonText = 'Im a button';

const Component = props => (
    <div className='note-exercise-s'>
        <div>
            <h2>Make evaluated value of 'buttonText' be displayed in
                a 'button' tag on the next line, and attach an onClick listener to it</h2>
            <button onClick={() => (console.log("Klikki"))}>{buttonText}</button>
        </div>
    </div>
);

export default Component;
