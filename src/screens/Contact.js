import React from 'react'
import { FlatList, StyleSheet, SafeAreaView } from 'react-native'

import Firebase from '../firebase'
import colors from '../config/colors'
import Conversation from '../components/Conversation'
import { MainRoutes } from './constants'

class Contact extends React.Component {
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
      <SafeAreaView style={styles.container}>
        <FlatList
          data={this.state.listUsers}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
          style={styles.container}
        />
      </SafeAreaView>
    )
  }

  async componentDidMount() {
    const listUsers = await Firebase.getListUsers()
    this.setState({ listUsers })
  }
}

export default Contact

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: `${colors.darkColor}`,
  },
})
