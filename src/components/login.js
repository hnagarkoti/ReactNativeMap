import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';
import { Actions } from 'react-native-router-flux';

class Login extends Component {
	render(){
		return(
			<View style={styles.mainContainer}>
				<TouchableHighlight onPress={()=>{Actions.home()} }>
					<Text>For Login Click Me!</Text>
				</TouchableHighlight>
			</View>
			)
	}
}

const styles = StyleSheet.create({
	mainContainer:{
		flex: 1,
		backgroundColor: 'white',
		justifyContent: 'center',
		alignItems: 'center',
	}
});

module.exports = Login;