import React from 'react';

const { string, } = React.PropTypes;
export default class TransitionText extends React.Component {

  static propTypes = {
    className: string,
    text: string,
  }

  static defaultProps = {
    text: '',
    className: '',
  }
  state = { previousText: null, }

  componentWillMount() {
    this.setState({ currentText: this.props.text, });
  }

  componentWillReceiveProps({ text, }) {
    const { currentText, } = this.state;
    if (currentText!==text) {
      this.setState({ currentText: text, previousText: currentText, });
    }
  }

  render() {
    const { className, } = this.props;
    const { currentText, previousText, } = this.state;
    return (
      <div className={className}>
        {[
          (<p className='appear' key={currentText}>{currentText}</p>),
          (<p className='disappear' key={previousText}>{previousText}</p>),
        ]}
      </div>
    );
  }
}
