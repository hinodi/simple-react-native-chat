import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'

import colors from '../config/colors'

class Conversation extends React.Component {
  render() {
    const { email, onPress = () => {} } = this.props
    return (
      <TouchableOpacity style={styles.itemContainer} onPress={onPress}>
        <Text style={styles.itemText}>{email}</Text>
      </TouchableOpacity>
    )
  }
}

export default Conversation

const styles = StyleSheet.create({
  itemContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: `${colors.primaryColor}`,
  },
  itemText: {
    fontSize: 16,
    color: colors.lightColor,
  },
})
