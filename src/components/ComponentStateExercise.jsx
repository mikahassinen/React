import React from 'react';

const IMAGES = {
  CHRISTMAS: 'http://24.media.tumblr.com/tumblr_ldq2nlmq8i1qbd47zo1_500.jpg',
  CATURDAY: 'http://25.media.tumblr.com/tumblr_ln63k1FuuD1qbt10wo1_500.gif',
  SPACE: 'http://24.media.tumblr.com/tumblr_lt950rNrhU1r4xjo2o1_500.jpg',
};

/* TODO
1. keep state.text upper cased
2. if the new value equals some of the image names change state.imageName
to match it, so that a new image will be displayed
*/

export default class ComponentStateExercise extends React.Component {

  state = { text: 'CATURDAY', imageName: 'CATURDAY', };

  onTextChanged = (event) => {
    /* 1. make event.target.value upper case 'event.target.value.toUpperCase()'
    * and save it to a variable
    * 2. check if variable equals some of the IMAGES names,
    * and if it does, change states 'imageName' to match it
    * 3. set states text to match the upper cased value
    * HINT: you can check if IMAGES has the matching property
    * in a if statement by: 'if(IMAGES[upperCasedValue]) {...}'*/

  }

  render() {
    return (
      <div className='note-exercise-m'>
        <input className='input-default' value={this.state.text} onChange={this.onTextChanged} />
        <br />
        <img className='image-default' src={IMAGES[this.state.imageName]} role='presentation' height={400} />
      </div>
    );
  }
}
