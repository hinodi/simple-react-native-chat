import React from 'react'
import { GiftedChat } from 'react-native-gifted-chat'

import Firebase from '../firebase'

class Chat extends React.Component {
  state = {
    messages: [],
  }

  get user() {
    return {
      name: Firebase.currentUser.email,
      _id: Firebase.currentUser.uid,
    }
  }

  _onSend = (messages) => {
    Firebase.send(this.props.route?.params?.uid ?? '', messages)
  }

  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={this._onSend}
        user={this.user}
      />
    )
  }

  componentDidMount() {
    this.props.navigation.setOptions({
      title: this.props.route?.params?.email ?? 'Chat',
    })
    Firebase.on(this.props.route?.params?.uid ?? '', (message) =>
      this.setState((previousState) => ({
        messages: GiftedChat.append(previousState.messages, message),
      }))
    )
  }
  componentWillUnmount() {
    Firebase.off(this.props.route?.params?.uid ?? '')
  }
}

export default Chat
