import React from 'react';

const TEXT_ALIGN_OPTIONS = [
  'left', 'center', 'right',
];

class SeizureButton extends React.Component {

  static propTypes = {
    imageUrl: React.PropTypes.string.isRequired,
    onClick: React.PropTypes.func.isRequired,
  };

  state = { displayImage: false, textAlign: 'center', };

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  onMouseOver = () => {
    this.setTimerForTextAlign();
    this.setState({ displayImage: true, });
  };

  onMouseOut = () => {
    clearTimeout(this.timeout);
    this.setState({ displayImage: false, });
  };

  setTimerForTextAlign() {
    this.timeout = setTimeout(() => {
      const textAlign = TEXT_ALIGN_OPTIONS[parseInt(Math.random() * 3, 10)];
      this.setState({ textAlign, });
      this.setTimerForTextAlign();
    }, 100);
  }

  render() {
    const { textAlign, displayImage, } = this.state;
    let extraStyles = {};
    if (displayImage) {
      extraStyles = { textAlign, background: `url("${this.props.imageUrl}") center -40px`, };
    }
    return (
      <div>
        <button
          className='hover-image-button'
          onMouseOver={this.onMouseOver}
          onMouseOut={this.onMouseOut}
          style={extraStyles}
          onClick={this.props.onClick}>
          Click here
        </button>
      </div>
    );
  }
}

const URL1 = 'https://media3.giphy.com/media/3o85xoi6nNqJQJ95Qc/200w.webp#8';
const URL2 = 'http://catsticker.com/images/dancing-cat.gif';

export default class Component extends React.Component {

  state = { header: 'Click a button', };

  render() {
    return (
      <div className='note-example-s'>
        <h1>{this.state.header}</h1>
        <SeizureButton imageUrl={URL1} onClick={() => this.setState({ header: '!!AEIOUYÖÄ!', })} />
        <SeizureButton imageUrl={URL2} onClick={() => this.setState({ header: 'I like cardboard boxes', })} />
      </div>
    );
  }
}

