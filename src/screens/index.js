import React from 'react'
import { StatusBar } from 'react-native'
import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import Loading from './Loading'
import colors from '../config/colors'
import Auth from './Auth'
import { AppRoutes } from './constants'
import Main from './Main'

const Stack = createStackNavigator()

class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <StatusBar barStyle='light-content' />
        <Stack.Navigator screenOptions={screenOptions}>
          <Stack.Screen
            name={AppRoutes.Loading}
            component={Loading}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name={AppRoutes.Auth}
            component={Auth}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name={AppRoutes.Main}
            component={Main}
            options={{ title: 'Chat' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
}

export default App

const screenOptions = {
  headerStyle: {
    backgroundColor: colors.primaryColor,
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
}
