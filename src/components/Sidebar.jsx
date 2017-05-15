import React from 'react';
import { browserHistory, } from 'react-router';
import { SidebarItem, SidebarLink, SidebarPenLink, SidebarSmallItem, } from './SidebarContent';

const LINKS = [
  { path: '/jsxSyntax', name: 'JSX Syntax', exercise: true, },
  { path: '/Lists', name: 'JSX Lists', exercise: true, },
  { path: '/componentState', name: 'Component State', exercise: true, },
  { path: '/componentProps', name: 'Component Props', exercise: true, },
  { path: '/componentLifecycle', name: 'Component Lifecycle', exercise: true, },
  { path: '/Redux', name: 'Redux', },
  { path: '/reactRedux', name: 'React Redux', exercise: true, },
  { path: '/usingRestApis', name: 'Using Rest apis', exercise: true, },
];

export default class Sidebar extends React.Component {

  state = { pathname: null, };
  componentWillMount() {
    this.setState({ pathname: browserHistory.getCurrentLocation().pathname, });
    this.routeSubscription = browserHistory.listen(({ pathname, }) => this.setState({ pathname, }));
  }

  render() {
    const { pathname, } = this.state;
    return (
      <aside id='sidebar' className='sidebar' >
        <div className='sidebar-small-item-row'>
          <SidebarSmallItem
            selected={pathname === '/'}
            onClick={() => browserHistory.push('/')}
            name='home'
            id='homeLink' />
          <SidebarSmallItem
            selected={pathname === '/firebase'}
            onClick={() => browserHistory.push('/firebase')}
            name='comment'
            id='homeLink' />
        </div>
        {LINKS.map(({ path, name, exercise, }) => (
          <SidebarItem key={path}>
            <SidebarLink
              onClick={() => { browserHistory.push(path); }}
              selected={path === pathname}>
              {name}
            </SidebarLink>
            {exercise && (<SidebarPenLink
              selected={(`${path}/exercise`) === pathname}
              onClick={() => { browserHistory.push(`${path}/exercise`); }} />)}
          </SidebarItem>))}
      </aside>
    );
  }

}
