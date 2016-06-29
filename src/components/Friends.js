import React, { Component } from 'react';
import { View, Text, ScrollView, } from 'react-native';
var Contacts = require('react-native-contacts');
import { Card } from 'react-native-material-design';

class FriendList extends Component {

	constructor(){
		super();
		this.state={
			allContacts:[],
			loaded: false
		}	
	}

	componentDidMount(){
		var me = this;
		Contacts.getAll((err, contacts) => {
		  if(err && err.type === 'permissionDenied'){
		  	console.log('permissionDenied',err);
		  } else {
		    console.log('contacts[0]:--- ',contacts);
		    let allContacts = contacts;
			me.setState({allContacts});
			me.setState({
				loaded: true
			})
		  }
		})
	}
	
	render(){
		if(!this.state.loaded){
			return this.renderLoadingView();
		}
		return(
			<View style={{ flex: 1 }}>
				<ScrollView>
					<View>
					 { this.state.allContacts.map((contacts) => (
			          <Card key={contacts.recordID} style={{ backgroundColor: 'whitesmoke', padding: 10, margin: 1 }}>
			            <Card.Body >
			              <Text>
			                {contacts.givenName + ' ' + contacts.middleName} 
			              </Text>
			              <Text>
			                {contacts.phoneNumbers.label === 'mobile' ? contacts.phoneNumbers.number : null }
			              </Text>
			            </Card.Body>
			          </Card>
	        		 )) }
	        		<	/View>
				</ScrollView>
			</View>
			)
	}

	renderLoadingView(){
		return(
			<View style={{ flex: 1 }}>
	        	<Text>Fetching... </Text>
	      	</View>
			)
	}
}

module.exports = FriendList;