import React from 'react'
import { View, StyleSheet } from 'react-native'
import { GoogleSigninButton } from '@react-native-community/google-signin'

import Firebase from '../firebase'
import colors from '../config/colors'
import { AppRoutes } from './constants'

class Auth extends React.Component {
  state = {
    isLoading: false,
  }

  _onGoogleSignInButtonPressed = async () => {
    try {
      this.setState({ isLoading: true })
      await Firebase.signInWithGoogle()
      this.setState({ isLoading: false })
      this.props.navigation.navigate(AppRoutes.MainStack)
    } catch (error) {
      this.setState({ isLoading: false })
    }
  }

  render() {
    const { isLoading } = this.state

    return (
      <View style={styles.container}>
        <GoogleSigninButton
          style={styles.googleSigninButton}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Light}
          onPress={this._onGoogleSignInButtonPressed}
          disabled={isLoading}
        />
      </View>
    )
  }
}

export default Auth

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primaryColor,
  },
  googleSigninButton: {
    width: 192,
  },
})
