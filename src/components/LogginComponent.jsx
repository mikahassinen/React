import React from 'react';

let lastLog = new Date();
const log = (indentations, ...text) => {
  if (new Date() - lastLog > 4) {
    console.log('-------------------');
  }
  let toBePrinted = '';
  for (let i = 0; i < indentations; i++) {
    toBePrinted = `${toBePrinted}\t`;
  }
  toBePrinted += text.reduce((acc, next) => (`${acc} ${next}`), '');
  console.log(toBePrinted);
  lastLog = new Date();
};

const { string, number, } = React.PropTypes;
export default class LogginComponent extends React.Component {

  static propTypes = {
    logIdentity: string,
    indentations: number,
  };

  static defaultProps = {
    logIdentity: 'root',
    indentations: 0,
  };

  componentWillMount = () => this.doLog('WILL MOUNT');
  componentDidMount = () => this.doLog('DID MOUNT');
  componentWillReceiveProps = nextProps => this.doLog('WILL RECEIVE PROPS');
  shouldComponentUpdate(nextProps, nextState) {
    this.doLog('SHOULD COMPONENT UPDATE');
    return true;// if false is returned componentWillUpdate -> render -> componentDidUpdate will not be called
  }
  componentWillUpdate = (nextProps, nextState) => this.doLog('WILL UPDATE');
  componentDidUpdate = (prevProps, prevState) => this.doLog('DID UPDATE');
  componentWillUnmount = () => this.doLog('WILL UNMOUNT');

  doLog(text) {
    log(this.props.indentations, this.constructor.name, this.props.logIdentity, text);
  }
}
