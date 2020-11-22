import React from 'react'
import { FlatList, StyleSheet } from 'react-native'

import Firebase from '../firebase'
import colors from '../config/colors'
import Conversation from '../components/Conversation'
import { MainRoutes } from './constants'

class Main extends React.Component {
  state = {
    listUsers: [],
  }

  _keyExtractor = (item) => item.uid
  _renderItem = ({ item }) => (
    <Conversation {...item} onPress={this._onItemPress(item)} />
  )

  _onItemPress = (item) => () =>
    this.props.navigation.navigate(MainRoutes.Chat, item)

  render() {
    return (
      <FlatList
        data={this.state.listUsers}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}
        style={styles.container}
      />
    )
  }

  async componentDidMount() {
    const listUsers = await Firebase.getListUsers()
    this.setState({ listUsers })
  }
}

export default Main

const styles = StyleSheet.create({
  container: {
    backgroundColor: `${colors.darkColor}`,
  },
})
