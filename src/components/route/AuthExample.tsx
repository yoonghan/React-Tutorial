/**
 * Sample of authentication + router
 */

import * as React from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink,
  Redirect,
  withRouter,
  RouteComponentProps
} from "react-router-dom";

const AuthExample = () => (
  <Router>
    <div style={{display:'flex', flexDirection:'row'}}>
      <AuthButton />
      <Route path="/public/:id" component={PublicWrapper} />
      <Route path="/protected" component={Protected} />
      <Route path="/login" component={Login} />
    </div>
  </Router>
);

export interface MenuProps extends RouteComponentProps<any>{};
export class Menu extends React.PureComponent<MenuProps, {}> {

  constructor(props:any) {
    super(props);
  }

  /**
   * We need to manually update the NavLink, this is due to the fact that
   * routing will not refresh.
   **/
  _reRenderMenu = (link: string) => {
    this.forceUpdate();
  }

  /**
   * Refresh screen to login
   **/
  _updateLocation = () => {
    this.props.history.push("/login");
  }

  render() {
    return (
      <div>
        <p>
          Welcome!
          <button onClick={()=>{Authentication.signout();this._updateLocation()}}>Sign out</button>
        </p>
        <ul>
          <li>
            <NavLink to="/public/1" onClick={this._reRenderMenu.bind(this)}>Public Page</NavLink>
          </li>
          <li>
            <NavLink to="/protected" onClick={this._reRenderMenu.bind(this)}>Protected Page</NavLink>
          </li>
        </ul>
      </div>);
  }
}

/**
 * Here controls the authentication
 */
export abstract class Authentication {
  public static usernameKey="username";
  public static authenticationLevel="authLevel";

  public static authenticate(username: string) {
    //create cookie.
    document.cookie=`${this.usernameKey}=${username};`;
  }

  public static signout() {
    //remove cookie
    document.cookie=`${this.usernameKey}=`;
  }

  public static getCookieValue(key: string) {
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(key) == 0) {
            return c.substring(key.length + 1, c.length);
        }
    }
    return "";
  }

  public static isAuthenticated() {
    return this.getCookieValue("username") !== "";
  }
}

interface CheckLoginState {
  isLogin: boolean;
}

class CheckLogin extends React.Component<RouteComponentProps<any>, CheckLoginState> {
  constructor(props:any) {
    super(props);
    this.state = {
      isLogin: Authentication.isAuthenticated()
    }
  }

  shouldComponentUpdate() {
    if(this.state.isLogin !== Authentication.isAuthenticated()) {
      this.setState({
        isLogin: Authentication.isAuthenticated()
      });
      return true;
    }
    return false;
  }

  _signOut = () => {
    Authentication.signout();
    this.setState({
      isLogin: Authentication.isAuthenticated()
    });
  }

  render() {
    const {history, location} = this.props;

    if(this.state.isLogin) {
      return (
        <Menu {...this.props}/>
      );
    }
    else if(history.location.pathname==='/login') {
      return <div></div>;
    }
    else {
      return <Redirect to={{pathname: "/login"}}/>
    }
  }
}

const AuthButton = withRouter(CheckLogin);

/**Make sure props are passed to the next component, else the next component do not have location, etc**/
export interface PublicWrapperProps extends RouteComponentProps<any>{};
export const PublicWrapper: React.SFC<PublicWrapperProps> = (props:any) => {
  return <Public {...props}/>;
}

export interface PublicProps extends RouteComponentProps<any>{};
export const Public: React.SFC<PublicProps> = (props:any) => {
  const id = ((props.match.params as any).id);
  return <h3>---------------Public Page Being retrieved = {id}</h3>;
}

const Protected = () => <h3>Protected</h3>;

interface LoginState {
  redirect: boolean;
}

/**
 * Login form screen
 **/
class Login extends React.Component<RouteComponentProps<any>, LoginState> {
  constructor(props:any) {
    super(props);
    this.state = {
      redirect: false
    }
  }

  login = () => {
    Authentication.authenticate("sally");
    this.setState(
      {redirect: true}
    )
  };

  render() {
    const { from } = this.props.location.state || { from: { pathname: "/" } };

    if (Authentication.isAuthenticated()) {
      //Make sure login page will not be accessed, if already authenticated.
      return <Redirect to={from} />;
    }

    return (
      <div>
        <p>You must log in to view the page at {from.pathname}</p>
        <button onClick={this.login}>Log in</button>
      </div>
    );
  }
}

export default AuthExample;
