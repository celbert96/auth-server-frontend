import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import NavigationBar from './components/NavigationBar';
import { Component } from 'react';
import { navigate, Router } from '@reach/router';
import Login from './components/Login';
import Register from './components/Register'
import Landing from './components/Landing'


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    };
  }

  getCookie(keyName) {
    if(document.cookie) {
      return document.cookie
      .split('; ')
      .find(row => row.startsWith(keyName))
      .split('=')[1];
    }

    return document.cookie;
  }

  updateUserState = user => {
    this.setState({
      user: user
    });
  }

  logoutUser = () => {    
    fetch('http://localhost:8080/auth/removeSessionCookie', {
          method: 'POST',
          mode: 'cors',
          headers: {
              'Content-Type': 'application/json'
          },
          credentials: 'include'
        }
    )
    .catch(e => {console.log(e)})
    .finally(() => {
      this.updateUserState(null);
      navigate("/");
    });
  }

  render () {
    return (
      <div className="App">
        <NavigationBar user={this.state.user} logoutUser={this.logoutUser} />
        <Router>
          <Landing path="/"/>
          <Login path="/login" user={this.state.user} updateUserState={this.updateUserState} logoutUser={this.logoutUser}/>
          <Register path="/register" updateUserState={this.updateUserState}/>
        </Router>
      </div>
    );
    }
}

export default App;
