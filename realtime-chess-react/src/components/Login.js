import React from 'react';
import { Segment, Button, Form } from 'semantic-ui-react';

export default class Chat extends React.Component {
  state = {
    username: '',
  };

  render() {
    const { username } = this.state;

    return (
      <Segment>
        <Form onSubmit={this.handleFormSubmit.bind(this)}>
          <Form.Field>
            <label>Username</label>
            <input
              placeholder="Username"
              autoFocus
              value={username}
              onChange={this.handleUsernameChange.bind(this)}
            />
          </Form.Field>
          <Button type="submit">Log in</Button>
        </Form>
      </Segment>
    );
  }

  handleUsernameChange(event) {
    this.setState({
      username: event.target.value,
    });
  }

  handleFormSubmit() {
    if (this.state.username) {
      this.props.login(this.state.username);
    }
  }
}
