import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Container, Menu } from 'semantic-ui-react';

import Login from './components/Login';
import Games from './components/Games';

class App extends React.Component {
  state = {};

  render() {
    let contents;
    const { username } = this.state;

    if (username) {
      contents = <Games username={username} />;
    } else {
      contents = <Login login={this.enterGame.bind(this)} />;
    }

    return (
      <React.Fragment>
        <Menu>
          <Menu.Item name="chess" active={true}>
            Live Chess
          </Menu.Item>
        </Menu>
        <Container>{contents}</Container>
      </React.Fragment>
    );
  }

  enterGame(username) {
    this.setState({
      username: username,
    });
  }
}

export default App;
