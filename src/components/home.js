import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';
import { Actions } from 'react-native-router-flux';

class Home extends Component {
	render(){
		return(
			<View style={styles.mainContainer}>
				
				<Text>I am home page</Text>
				
			</View>
			)
	}
}

var styles = StyleSheet.create({
	mainContainer:{
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'white',
	}
})

module.exports = Home;