import React from 'react'
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from 'react-native'

import Firebase from '../firebase'
import colors from '../config/colors'
import { AppRoutes } from './constants'

class Setting extends React.Component {
  state = {
    isLoading: false,
  }

  _onLogoutButtonPressed = async () => {
    this.setState({ isLoading: true })
    try {
      await Firebase.signOut()
      this.setState({ isLoading: false })
      this.props.navigation.replace(AppRoutes.Auth)
    } catch (err) {
      this.setState({ isLoading: false })
    }
  }

  render() {
    const { isLoading } = this.state

    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={[
            styles.loginButtonContainer,
            isLoading && styles.loginButtonContainerDisabled,
          ]}
          disabled={isLoading}
          onPress={this._onLogoutButtonPressed}
        >
          {isLoading ? (
            <ActivityIndicator size='small' color={colors.lightColor} />
          ) : (
            <Text style={styles.loginButtonText}>Logout</Text>
          )}
        </TouchableOpacity>
      </View>
    )
  }
}

export default Setting

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: colors.primaryColor,
  },
  textInput: {
    fontSize: 16,
    color: colors.primaryColor,
    backgroundColor: colors.lightColor,
    padding: 8,
    marginTop: 16,
    borderRadius: 4,
  },
  loginButtonContainer: {
    backgroundColor: colors.darkColor,
    padding: 20,
    borderRadius: 4,
    alignItems: 'center',
    marginTop: 24,
  },
  loginButtonContainerDisabled: {
    backgroundColor: `${colors.darkColor}38`,
  },
  loginButtonText: {
    fontSize: 16,
    color: colors.lightColor,
  },
})
