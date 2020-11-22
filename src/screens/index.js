import React from 'react'
import { StatusBar } from 'react-native'
import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import colors from '../config/colors'
import Loading from './Loading'
import Auth from './Auth'
import { AppRoutes, MainRoutes, HomeRoutes } from './constants'
import Main from './Main'
import Chat from './Chat'
import Setting from './Setting'

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

class HomeTab extends React.Component {
  render() {
    return (
      <Tab.Navigator>
        <Tab.Screen name={HomeRoutes.Main} component={Main} />
        <Tab.Screen name={HomeRoutes.Setting} component={Setting} />
      </Tab.Navigator>
    )
  }
}

class MainStack extends React.Component {
  render() {
    return (
      <Stack.Navigator screenOptions={mainScreenOptions}>
        <Stack.Screen
          name={MainRoutes.HomeTab}
          component={HomeTab}
          options={{ headerShown: false }}
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
