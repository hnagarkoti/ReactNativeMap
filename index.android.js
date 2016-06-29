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
  View,
  Button,
  Image,
  Dimensions,
  ScrollView,
  TouchableHighlight,
  ToastAndroid
} from 'react-native';
import { Actions, Scene, Router } from 'react-native-router-flux';
import { Icon, Avatar, } from 'react-native-material-design';
var window = Dimensions.get('window');

import Home from './src/components/home';
import FriendList from './src/components/Friends';
import CurrentLocation from './src/components/ViewsAsMarkers';

const scenes = Actions.create(
  <Scene key="root">
    <Scene key="home" component={Home} hideNavBar={true}/>
    <Scene key="friends" component={FriendList} hideNavBar={true}/>
    <Scene key="CurrentLocation" component={CurrentLocation} hideNavBar={true}/>
  </Scene>
  )

class Track extends Component {
  render() {
    return (
        <Router scenes={scenes} />
    );
  }
}

AppRegistry.registerComponent('Track', () => Track);
