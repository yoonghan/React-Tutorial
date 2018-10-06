/**
 * Example for route
 **/

import * as React from 'react'
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Link,
  match
} from 'react-router-dom'

interface RouteInfo {
  url: string;
  path: string;
  topicId: string;
}

const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
)

const About = () => (
  <div>
    <h2>About</h2>
  </div>
)

/** This is a very simple component creation, if more complicated data is needed refer authExample's public**/
const Topic = (matchedRoute: match<RouteInfo>) => (
  <div>
    <h3>{matchedRoute.params.topicId}</h3>
  </div>
)

const Topics = (matchedRoute: match<RouteInfo>) => (
  <div>
    <h2>Topics</h2>
    <ul>
      <li>
        <NavLink to={`${matchedRoute.url}/rendering`}>
          Rendering with React
        </NavLink>
      </li>
      <li>
        <NavLink to={`${matchedRoute.url}/components`}>
          Components
        </NavLink>
      </li>
      <li>
        <NavLink to={`${matchedRoute.url}/props-v-state`}>
          Props v. State
        </NavLink>
      </li>
    </ul>

    <Route path={`${matchedRoute.path}/:topicId`} component={Topic}/>
    <Route exact path={matchedRoute.path} render={() => (
      <h3>Please select a topic.</h3>
    )}/>
  </div>
)

const Outside = () => (
  <React.Fragment>
    <NavLink to="/" exact>Home</NavLink><br/>
    <NavLink to="/about" exact>About</NavLink><br/>
    <NavLink to="/topics" exact>Topics</NavLink>
  </React.Fragment>
)

const BasicExample = () => (
  <Router>
    <div>
      <Outside/>
      <hr/>
      <Route exact path="/" component={Home}/>
      <Route path="/about" component={About}/>
      <Route path="/topics" component={Topics}/>
    </div>
  </Router>
)

export default BasicExample
