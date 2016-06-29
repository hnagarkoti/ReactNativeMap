var React = require('react');
var ReactNative = require('react-native');
var {
  StyleSheet,
  PropTypes,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
} = ReactNative;

var MapView = require('react-native-maps');

var { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 32.01878375;
const LONGITUDE = -77.65656566;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

var DisplayLatLng = React.createClass({
  watchID: (null: ?number),
  getInitialState() {
    return {
      latitude: 0,
      longitude: 0,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
      markers: [],
      initialPosition: 'unknown',
      lastPosition: 'unknown',
      loaded: false,
      circle: {
        center: {
          latitude: 0,
          longitude: 0,
        },
        radius: 700,
      },
      miniCircle: {
        center: {
          latitude: 0,
          longitude: 0,
        },
        radius: 100,
      },
    };
  },

  componentDidMount: function() {
    console.log('props:-- ', this.props);
    console.log('latitude:--------------- ', this.props.latitude);
    this.setState({
      latitude: this.props.latitude,
      longitude: this.props.longitude,
      circle: {
        center: {
          latitude: this.props.latitude,
          longitude: this.props.longitude,
        },
        radius: 700,
      },
      miniCircle: {
        center: {
          latitude: this.props.latitude,
          longitude: this.props.longitude,
        },
        radius: 100,
      },
    })

    navigator.geolocation.getCurrentPosition(
      (position) => {
        var initialPosition = JSON.stringify(position);
        console.log('initialPosition:-- ',initialPosition);
        this.setState({initialPosition});
      },
      (error) => alert(error),
      {enableHighAccuracy: false, timeout: 25000, maximumAge: 1000}
    );
    this.watchID = navigator.geolocation.watchPosition((position) => {
      var lastPosition = JSON.stringify(position);
      this.setState({lastPosition});
    });
  },

  componentWillUnmount: function() {
    navigator.geolocation.clearWatch(this.watchID);
  },

  render() {
    const { circle, miniCircle } = this.state;

   if(!this.state.longitude){
    return this.renderLoadingView();
   }
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            latitudeDelta: this.state.latitudeDelta,
            longitudeDelta: this.state.longitudeDelta,
          }}
        >

        <MapView.Circle
            center={circle.center}
            radius={circle.radius}
            fillColor="rgba(200, 0, 0, 0.5)"
            strokeColor="rgba(0,0,0,0.5)"
          />
          <MapView.Circle
            center={miniCircle.center}
            radius={miniCircle.radius}
            fillColor="#2E2EFE"
            strokeColor="rgba(0,0,0,0.5)"
          />
        
        </MapView>
        <View style={{flex: 1, flexDirection: 'column'}}>
          <Text style={{ marginRight: 10 }}>Initial: {this.state.initialPosition}</Text>
          <Text>Last: {this.state.lastPosition}</Text>
        </View>
      </View>
    );
  },
  renderLoadingView() {
    return (
      <View style={ { flexDirection: 'row', flex: 1, justifyContent: 'center', alignItems: 'center' } }>
        <Text>Fetching current position...</Text>
      </View>
      );
  },
});

var styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  bubble: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },
  latlng: {
    width: 200,
    alignItems: 'stretch',
  },
  button: {
    width: 80,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    backgroundColor: 'transparent',
  },
});

module.exports = DisplayLatLng;
