import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import logo from './logo.svg';
import authenticate from "./auth";
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: ""
    }
  }
  async auth() {
    this.setState({auth:await authenticate() })

  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <Button variant="contained" className="test" onClick={() => {this.auth()}}>
            Default
          </Button>
          <a href="https://slack.com/oauth/authorize?&client_id=448085800134.461063672964&scope=commands,users:read,files:read,reactions:read,stars:read&redirect_uri=http://localhost:1211/authToken">
            <img alt="Add to Slack" height="40" width="139" src="https://platform.slack-edge.com/img/add_to_slack.png" srcset="https://platform.slack-edge.com/img/add_to_slack.png 1x, https://platform.slack-edge.com/img/add_to_slack@2x.png 2x" />
          </a>
        </header>
      </div>
    );
  }
}

export default App;
