import React from 'react';
import Button from 'components/Button';
import TreeList from 'components/TreeList';
import axios from 'common/axios';

export default class UsingRestApis extends React.Component {

  state = { status: 'idle', data: {}, };

  fetchApiDescription = async () => {
    this.setState({ status: 'fetching data', });
    const { data, } = await axios.get('/');
    this.setState({ status: 'data fetched', data, });
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
