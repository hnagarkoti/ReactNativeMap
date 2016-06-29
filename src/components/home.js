'use strict';

import React, { Component } from 'react';
let ReactNative = require('react-native');
let {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableHighlight
} = ReactNative;
import ScrollableTabView, { DefaultTabBar, } from 'react-native-scrollable-tab-view';
import { Actions, Scene, Router } from 'react-native-router-flux';
// import MapView from 'react-native-maps';
// import MapViewExample from './MapViewExample';
import NavBar from './NavBar';
import FriendList from './Friends';
import Icon from 'react-native-vector-icons/MaterialIcons';

var CurrentLocation = require('./ViewsAsMarkers');

let Home = React.createClass({
  watchID: (null: ?number),
  getInitialState() {
    return {
      initialPosition: 'unknown',
      lastPosition: 'unknown',
      latitude: 0,
      longitude: 0,
      loaded: false
    };
  },

  componentDidMount: function() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log('position:-- ', position);
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          loaded: true
        });
      },
      (error) => alert(error),
      {enableHighAccuracy: false, timeout: 29000, maximumAge: 1000}
    );
    this.watchID = navigator.geolocation.watchPosition((position) => {
      var lastPosition = JSON.stringify(position);
    });
  },

  componentWillUnmount: function() {
    navigator.geolocation.clearWatch(this.watchID);
  },
  render(){
    if(!this.state.loaded){
      return this.renderLoadingView();
    }
    else{
      var currentPosition = {
        latitude: this.state.latitude,
        longitude: this.state.longitude
      }

    return (
      <View style={{flex: 1}}>
      <NavBar navTitle={'Tracker'} navLeft={ <Icon name="menu" size={ 30 } color="#fff" /> } />
     <ScrollableTabView
      renderTabBar={() => <DefaultTabBar />}
      tabBarUnderlineColor={'white'}
      tabBarBackgroundColor={'#78B275'}
      tabBarActiveTextColor={'white'}
      tabBarInactiveTextColor={'#E4E7E4'}
      tabBarTextStyle={{fontFamily: 'Roboto', fontSize: 16}}
      scrollWithoutAnimation={true}
      initialPage={1}
    >
      <ScrollView tabLabel="Requests">
        <FriendList />
      </ScrollView>

      <ScrollView tabLabel="Position">
        <View style={ { flexDirection: 'row', flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 50 } }>
         <TouchableHighlight onPress={()=> {Actions.CurrentLocation(currentPosition);}}>
           <Text>Show my current position</Text>
         </TouchableHighlight>
          
        </View>
      </ScrollView>

      <ScrollView tabLabel="Friends">
        
      </ScrollView>

    </ScrollableTabView>
    </View>
      
    );
    }
  },
  renderLoadingView() {
    return (
      <View style={ { flexDirection: 'row', flex: 1, justifyContent: 'center', alignItems: 'center' } }>
        <Text>Loading app...</Text>
      </View>
      );
  },
});

class OldUi extends Component {
  render(){
    return(
         <View style={{flex: 1}}>
      <NavBar navTitle={'Tracker'} navLeft={ <Icon name="menu" size={ 30 } color="#fff" /> } />
     <ScrollableTabView
      renderTabBar={() => <DefaultTabBar />}
      tabBarUnderlineColor={'white'}
      tabBarBackgroundColor={'#78B275'}
      tabBarActiveTextColor={'white'}
      tabBarInactiveTextColor={'#E4E7E4'}
      tabBarTextStyle={{fontFamily: 'Roboto', fontSize: 16}}
      scrollWithoutAnimation={true}
      initialPage={1}
    >
      <ScrollView tabLabel="Requests">
        <FriendList />
      </ScrollView>

      <ScrollView tabLabel="Position">
        <View style={{flex: 1}}>
            
          <Text>
            Show my current position
          </Text>
          
        </View>
      </ScrollView>

      <ScrollView tabLabel="Friends">
        
      </ScrollView>

    </ScrollableTabView>
    </View>
      )
  }
}

class Testing extends Component {
  render(){
    return(
           <MapView
            initialRegion={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          />
      )
  }
}

module.exports = Home;