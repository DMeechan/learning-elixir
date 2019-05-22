import React from 'react';
import { Segment, Grid } from 'semantic-ui-react';
import { TokenProvider, ChatManager } from '@pusher/chatkit';

import Rooms from './Rooms';
// import Chat from './Chat';

const CHATKIT_INSTANCE_LOCATOR = 'v1:us1:a68af1d8-09f8-43ff-aecd-979f8d430de9';

export default class Games extends React.Component {
  state = {
    joined: [],
    joinable: [],
  };

  constructor(props) {
    super(props);
    this.chatManager = new ChatManager({
      instanceLocator: CHATKIT_INSTANCE_LOCATOR,
      tokenProvider: new TokenProvider({
        url: 'htt[://localhost:4000/auth',
      }),
      userId: props.username,
    });

    this.chatManager
      .connect()
      .then(currentUser => {
        this.setState({
          currentUser,
        });

        currentUser.getJoinableRooms().then(rooms => {
          let lobby = rooms.find(room => room.name === 'Lobby');

          if (lobby) {
            currentUser.joinRoom({ roomId: lobby.id });
          } else {
            lobby = currentUser.rooms.find(room => room.name === 'Lobby');
          }

          if (lobby) {
            this.setState({
              lobbyId: lobby.id,
              activeRoom: lobby.id,
            });
          } else {
            console.warn('Lobby not found');
          }
        });

        setInterval(this._pollRooms.bind(this), 5000);
        this._pollRooms();
      })
      .catch(e => {
        console.error('Failed to connect to ChatKit');
        console.error(e);
      });
  }

  _pollRooms() {
    const { currentUser } = this.state;
    currentUser.getJoinableRooms().then(rooms => {
      this.setState({
        joined: currentUser.rooms,
        joinable: rooms,
      });
    });
  }

  _enterRoom(id) {
    const { currentUser } = this.state;
    currentUser
      .joinRoom({ roomId: id })
      .then(() => {
        this.setState({
          activeRoom: id,
        });
        this._pollRooms();
      })
      .catch(() => console.warn('Failed to enter room'));
  }

  _leaveRoom() {
    const { currentUser } = this.state;
    currentUser
      .leaveRoom({ roomId: id })
      .then(() => {
        this._pollRooms();
      })
      .catch(() => console.warn('Failed to leave room'));
  }

  render() {
    const { currentUser } = this.state;
    let chat;

    if (currentUser) {
      const room = currentUser.rooms.find(
        room => room.id === this.state.activeRoom
      );
      if (room) {
        chat = <Chat user={currentUser} room={room} />;
      }
    }

    const { joined, joinable, activeRoom } = this.state;

    return (
      <Segment>
        <Grid>
          <Grid.Column width={4}>
            <Rooms
              joined={joined}
              joinable={joinable}
              activeRoom={activeRoom}
              enterRoom={this._enterRoom.bind(this)}
              leaveRoom={this._leaveRoom.bind(this)}
            />
          </Grid.Column>
          <Grid.Column width={12} />
        </Grid>
      </Segment>
    );
  }
}
