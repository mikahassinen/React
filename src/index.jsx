import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory, } from 'react-router';
import { createStore, applyMiddleware, } from 'redux';
import { Provider, } from 'react-redux';
import thunk from 'redux-thunk';
import 'styles';
import reducers from './reducers';
import App from './components/App';
import Home from './components/Home';
import JSXSyntax from './components/JSXSyntax';
import JSXSyntaxExercise from './components/JSXSyntaxExercise';
import Lists from './components/Lists';
import ListsExercise from './components/ListsExercise';
import ComponentState from './components/ComponentState';
import ComponentStateExercise from './components/ComponentStateExercise';
import ComponentProps from './components/ComponentProps';
import ComponentPropsExercise from './components/ComponentPropsExercise';
import Firebase from './components/Firebase/FirebaseChatApp';
import Redux from './components/Redux';
import ReactRedux from './containers/ReactRedux';
import TodoAppWrapper from './containers/UsingRestApisExercise/TodoAppWrapper';
import ComponentLifecycle from './components/ComponentLifecycle';
import ComponentLifeCycleExercise from './components/ComponentLifecycleExercise';
import ReactReduxExercise from './containers/ReactReduxExercise';
import UsingRestApis from './containers/UsingRestApis';
import Users from './containers/UsingRestApisExercise/Users';
import Todos from './containers/UsingRestApisExercise/Todos';

const middlewares = [ thunk, ];

if (process.env.NODE_ENV !== 'production') {
  const { logger, } = require('redux-logger');
  middlewares.push(logger);
}

const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);
const store = createStoreWithMiddleware(reducers, window.devToolsExtension && window.devToolsExtension());

const root = (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path='/' component={App}>
        <IndexRoute component={Home} />
        <Route path='jsxSyntax' component={JSXSyntax} />
        <Route path='jsxSyntax/exercise' component={JSXSyntaxExercise} />
        <Route path='lists' component={Lists} />
        <Route path='lists/exercise' component={ListsExercise} />
        <Route path='componentState' component={ComponentState} />
        <Route path='componentState/exercise' component={ComponentStateExercise} />
        <Route path='componentProps' component={ComponentProps} />
        <Route path='componentProps/exercise' component={ComponentPropsExercise} />
        <Route path='componentLifecycle' components={ComponentLifecycle} />
        <Route path='componentLifecycle/exercise' components={ComponentLifeCycleExercise} />
        <Route path='firebase' components={Firebase} />
        <Route path='redux' component={Redux} />
        <Route path='reactRedux' component={ReactRedux} />
        <Route path='reactRedux/exercise' component={ReactReduxExercise} />
        <Route path='usingRestApis' component={UsingRestApis} />
        <Route path='usingRestApis/exercise' components={TodoAppWrapper}>
          <IndexRoute relative components={Users} />
          <Route path=':userId' relative component={Todos} />
        </Route>
      </Route>
    </Router>
  </Provider>
);

ReactDOM.render(root, document.getElementById('app'));
