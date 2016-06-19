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
import Drawer from 'react-native-drawer';
import { Icon, Avatar, } from 'react-native-material-design';
var window = Dimensions.get('window');

import Login from './src/components/login';
import Home from './src/components/home';
import FriendList from './src/components/Friends';

const scenes = Actions.create(
  <Scene key="root">
    <Scene key="login" component={Login} title="Login Page"/>
    <Scene key="home" component={Home} title="Home Page"/>
    <Scene key="friends" component={FriendList} title="Add Contacts"/>
    <Scene key="GeolocationExample" component={GeolocationExample} title="GeolocationExample" />
  </Scene>
  )

class Track extends Component {

  closeControlPanel = () => {
    this._drawer.close()
  }
  openControlPanel = () => {
    this._drawer.open()
  }

  render() {
    let menuIcon = (<Icon name="menu" color="rgba(255,0,0,.9)" />);
    return (
      <Drawer
        ref={(ref) => this._drawer = ref}
        content={<ControlPanel />}
        tapToClose={true}
        openDrawerOffset={0.2} // 20% gap on the right side of drawer
        panCloseMask={0.2}
        closedDrawerOffset={-3}
        style={drawerStyles}
        tweenHandler={(ratio) => ({
          main: { opacity:(2-ratio)/2 }
        })}
        >
        <Router scenes={scenes} />
      </Drawer>
    );
  }
}

class ControlPanel extends Component{

  sidemenuIconPress( value ){
    ToastAndroid.show( value + ' Pressed',ToastAndroid.SHORT)
    Actions.friends();
  }

  render(){
    return(
      <View style={styles.controlPanel}>
        
          <View style={{backgroundColor:'#CBC9C9', height: window.height/5 }}>
            <Avatar size={60} image={<Image source={require('./assests/images/uff1.jpg')} />} />
          </View>
          <ScrollView>
          <View>

            <TouchableHighlight onPress={ this.sidemenuIconPress.bind( this, 'Home' ) } underlayColor="#a9a9a9" >
              <View style={{flex: 1, flexDirection: 'row', backgroundColor: 'red'}}>
                <View style={{justifyContent: 'flex-start'}}>
                  <Image style={{ height: 40, width: 40 }} source={require('./assests/icons/ic_home_white_24dp.png')} />
                </View>
                <Text style={{color: 'black', fontSize: 20, margin: 10, textAlign: 'center' }}>Home</Text>
              </View>
            </TouchableHighlight>

            <TouchableHighlight onPress={ this.sidemenuIconPress.bind( this, 'Friends' ) } underlayColor="#a9a9a9" >
              <View style={{flex: 1, flexDirection: 'row'}}>
                <View style={{justifyContent: 'flex-start'}}>
                  <Image style={{ height: 40, width: 40 }} source={require('./assests/icons/ic_location_city_black_48dp.png')} />
                </View>
                <Text style={{color: 'black', fontSize: 20, margin: 10, textAlign: 'center' }}>Friends</Text>
              </View>
            </TouchableHighlight>

            <TouchableHighlight onPress={ this.sidemenuIconPress.bind( this, 'RNLocation' ) } underlayColor="#a9a9a9" >
              <View style={{flex: 1, flexDirection: 'row'}}>
                <View style={{justifyContent: 'flex-start'}}>
                  <Image style={{ height: 40, width: 40 }} source={require('./assests/icons/ic_location_city_black_48dp.png')} />
                </View>
                <Text style={{color: 'black', fontSize: 20, margin: 10, textAlign: 'center' }}>RNLocation</Text>
              </View>
            </TouchableHighlight>

          </View>
        </ScrollView>
      </View>
    )
  }
}

const drawerStyles = StyleSheet.create({
  drawer: { shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3},
  main: {paddingLeft: 3},
})

const styles = StyleSheet.create({
  controlPanel:{
    flex: 1,
  },
  controlPanelWelcome:{
    color: 'red'
  }
})

AppRegistry.registerComponent('Track', () => Track);
