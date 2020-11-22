import React from 'react'
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Text,
  ActivityIndicator,
} from 'react-native'

import Firebase from '../firebase'
import colors from '../config/colors'
import { AppRoutes } from './constants'

class Auth extends React.Component {
  state = {
    email: '',
    password: '',
    isLoading: false,
    err: '',
  }

  _onChangeEmail = (email) => this.setState({ email })
  _onChangePassword = (password) => this.setState({ password })

  _isLoginButtonDisabled = () => {
    const { email, password, isLoading } = this.state
    if (!email || !password || isLoading) {
      return true
    }
    return false
  }

  _onLoginButtonPressed = async () => {
    this.setState({ isLoading: true, err: '' })
    const { email, password } = this.state
    try {
      await Firebase.signIn(email, password)
      this.setState({ isLoading: false, email: '', password: '' })
      this.props.navigation.navigate(AppRoutes.Main)
    } catch (err) {
      this.setState({ err: err.message, isLoading: false })
    }
  }

  render() {
    const { email, password, isLoading, err } = this.state

    return (
      <View style={styles.container}>
        <TextInput
          style={styles.textInput}
          placeholder='Email'
          keyboardType='email-address'
          value={email}
          onChangeText={this._onChangeEmail}
        />
        <TextInput
          style={styles.textInput}
          placeholder='Password'
          secureTextEntry
          value={password}
          onChangeText={this._onChangePassword}
        />
        {!!err && <Text style={styles.errorText}>{err}</Text>}
        <TouchableOpacity
          style={[
            styles.loginButtonContainer,
            this._isLoginButtonDisabled() &&
              styles.loginButtonContainerDisabled,
          ]}
          disabled={this._isLoginButtonDisabled()}
          onPress={this._onLoginButtonPressed}
        >
          {isLoading ? (
            <ActivityIndicator size='small' color={colors.lightColor} />
          ) : (
            <Text style={styles.loginButtonText}>Login</Text>
          )}
        </TouchableOpacity>
      </View>
    )
  }
}

export default Auth

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
  errorText: {
    fontSize: 16,
    color: colors.dangerColor,
    alignSelf: 'center',
    textAlign: 'center',
    marginTop: 12,
    marginBottom: -12,
  },
})
