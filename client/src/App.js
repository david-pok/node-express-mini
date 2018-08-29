import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from 'axios';

class App extends Component {
  state = {
    users: []
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <table>
          <thead>
            <tr>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {this.state.users.map(user => (
              <tr key={user.id}>
                <td>{user.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  componentDidMount() {
    axios
      .get("http://localhost:9000/users")
      .then(res => {
        this.setState({ users: res.data });
      })
      .catch(err => {
        console.error("error getting user data", err);
      });
  }
}

export default App;
