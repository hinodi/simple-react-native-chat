import React from 'react'
import { StatusBar } from 'react-native'
import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import colors from '../config/colors'
import Loading from './Loading'
import Auth from './Auth'
import { AppRoutes, MainRoutes } from './constants'
import Main from './Main'
import Chat from './Chat'

const Stack = createStackNavigator()

class MainStack extends React.Component {
  render() {
    return (
      <Stack.Navigator screenOptions={mainScreenOptions}>
        <Stack.Screen
          name={MainRoutes.Main}
          component={Main}
          options={{ title: 'Main' }}
        />
        <Stack.Screen name={MainRoutes.Chat} component={Chat} />
      </Stack.Navigator>
    )
  }
}

class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <StatusBar barStyle='light-content' />
        <Stack.Navigator screenOptions={screenOptions}>
          <Stack.Screen name={AppRoutes.Loading} component={Loading} />
          <Stack.Screen name={AppRoutes.Auth} component={Auth} />
          <Stack.Screen name={AppRoutes.MainStack} component={MainStack} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
}

export default App

const screenOptions = {
  headerShown: false,
}

const mainScreenOptions = {
  headerStyle: {
    backgroundColor: colors.primaryColor,
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
}
