import React from 'react';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import { browserHistory, } from 'react-router';
import Sidebar from 'components/Sidebar';
import { signOut, } from 'common/firebaseDatabase';

class App extends React.Component {

  state = { sidebarCollapsed: false, pathname: undefined, };

  componentWillMount() {
    this.setState({ pathname: browserHistory.getCurrentLocation().pathname, });
    this.routeSubscription = browserHistory.listen(({ pathname, }) => this.setState({ pathname, }));
  }
  componentWillUnmount() {
    this.routeSubscription();
    signOut();
  }
  render() {
    const { sidebarCollapsed, pathname, } = this.state;
    return (
      <div>
        <div>
          <div className='app-window'>
            <Sidebar
              pathname={pathname}
              collapsed={sidebarCollapsed} />
            <CSSTransitionGroup
              transitionName='route-change'
              transitionEnter
              transitionLeave
              transitionEnterTimeout={500}
              transitionLeaveTimeout={500}>
              <div className='activity-window' key={pathname}>
                {this.props.children}
              </div>
            </CSSTransitionGroup >
          </div>
        </div>
      </div>
    );
  }

}

export default App;
