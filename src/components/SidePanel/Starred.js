import React, { Component } from 'react'
import { Menu, Icon } from 'semantic-ui-react';
import { connect } from 'react-redux';
import firebase from '../../firebase';
import { setCurrentChannel, setPrivateChannel } from '../../actions';

class Starred extends Component {
  state ={
    starredChannels: [],
    activeChannel: '',
    user: this.props.currentUser,
    usersRef: firebase.database().ref('users')
  }

  componentDidMount() {
    if (this.state.user) {
      this.addListeners(this.state.user.uid);
    }
  };

  componentWillUnmount() {
    this.removeListener();
  }

  removeListener = () => {
    this.state.usersRef.child(`${this.state.user.uid}/starred`).off();
  };

  addListeners = userId => {
    this.state.usersRef
      .child(userId)
      .child('starred')
      .on('child_added', snap => {
        const channelToAdd = { id: snap.key, ...snap.val() };
        this.setState({
          starredChannels: [...this.state.starredChannels, channelToAdd]
        });
      });

    this.state.usersRef
      .child(userId)
      .child('starred')
      .on('child_removed', snap => {
        const channelToRemove = { id: snap.key, ...snap.val() };
        const filterdChannels = this.state.starredChannels.filter(channel => {
          return channel.id !== channelToRemove.id
        })
        this.setState({ starredChannels: filterdChannels });
      })
  }

  setActiveChannel = channel => {
    this.setState({ activeChannel: channel.id });
  };

  changeChannel = channel => {
    this.setActiveChannel(channel);
    this.props.setCurrentChannel(channel);
    this.props.setPrivateChannel(false);
  };

  displayChannels = starredChannels => (
    starredChannels.length > 0 && starredChannels.map(starredChannel => (
      <Menu.Item
        key={starredChannel.id}
        onClick={() => this.changeChannel(starredChannel)}
        name={starredChannel.name}
        style={{ opacity: 0.7 }}
        active={starredChannel.id === this.state.activeChannel}
      >
        # {starredChannel.name}
      </Menu.Item>
    ))
  )

  render() {
    const { starredChannels } = this.state;

    return (
      <Menu.Menu className="menu">
        <Menu.Item>
          <span>
            <Icon name="star" /> STARRED
          </span>{" "}
          ({starredChannels.length})
        </Menu.Item>
        {/* Channels */}
        {this.displayChannels(starredChannels)}
      </Menu.Menu>
    )
  }
}

export default connect(null, { setCurrentChannel, setPrivateChannel })(Starred);
