import React from 'react'
import { View, StyleSheet, ActivityIndicator } from 'react-native'

import Firebase from '../firebase'
import colors from '../config/colors'
import { AppRoutes } from './constants'

class Loading extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator size='large' color={colors.lightColor} />
      </View>
    )
  }

  componentDidMount() {
    if (Firebase.currentUser) {
      return this.props.navigation.replace(AppRoutes.MainStack)
    }
    this.props.navigation.replace(AppRoutes.Auth)
  }
}

export default Loading

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primaryColor,
  },
})
