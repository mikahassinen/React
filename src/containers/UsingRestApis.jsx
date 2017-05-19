import React from 'react';
import Button from 'components/Button';
import TreeList from 'components/TreeList';
import axios from 'common/axios';

export default class UsingRestApis extends React.Component {

  state = { status: 'idle', data: {}, };

  // Why is this a bad implementation?
  fetchApiDescription = async () => {
      console.log('start fetchApiDescription');
    if (this.state.status!=='fetching data') {
      this.setState({ status: 'fetching data', });
      const { data, } = await axios.get('/');
      this.setState({ status: 'data fetched', data, });
    } else {
      console.log('busy');
    }
  };

  render() {
    const { status, data, } = this.state;
    return (
      <div className='notes-example-base'>
        <h3>{status}</h3>
        <Button primary onClick={this.fetchApiDescription}>Fetch api description</Button>
        <TreeList objectRoot={data} />
      </div>
    );
  }
}
