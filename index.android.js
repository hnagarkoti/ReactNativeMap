/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Actions, Scene, Router } from 'react-native-router-flux';
import Login from './src/components/login';
import Home from './src/components/home';

const scenes = Actions.create(
  <Scene key="root">
    <Scene key="login" component={Login} title="Login Page"/>
    <Scene key="home" component={Home} title="Home Page"/>
  </Scene>
  )

class Track extends Component {
  render() {
    return (
      <Router scenes={scenes} />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('Track', () => Track);
