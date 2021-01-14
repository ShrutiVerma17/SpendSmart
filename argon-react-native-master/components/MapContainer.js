import React, { Component } from 'react';
//import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';
import MapView, {Marker} from 'react-native-maps';
import {AppRegistry, StyleSheet, View, Text, TouchableOpacity} from 'react-native';
const CustomMarker = () => (
  <View
    style={{
      padding: 1,
      backgroundColor: "red",
      borderColor: "#eee",
      borderRadius: 100,
      elevation: 10
    }}
  >
    <Text style={{ color: "#fff" }}>Target</Text>
  </View>
);
export class MapContainer extends Component{
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      location: 0,
      latitude: 0,
      longitude: 0,
      didWork: false,
     };
  }

findCoordinates = () => {
		navigator.geolocation.getCurrentPosition(
			position => {
        console.log(position.coords.latitude)
        console.log(position.coords.longitude)
        this.setState({latitude: position.coords.latitude, longitude: position.coords.longitude, didWork: true, loading:false})
        console.log(this.state.didWork)

			},
			error => Alert.alert(error.message),
			{ enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  };

  componentDidMount() {
		this.findCoordinates()
	}
   /*componentDidMount(){
    fetch("https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=33.023493,-117.117158&radius=16093.44&type=shop&keyword=store&key=AIzaSyADu-dzTMAsEUjwR7jkQMKg8-eA7NdxXWU")
    .then(response => response.json())
    .then((responseJson)=> {
      this.setState({
       loading: false,
       dataSource: responseJson
      })
    })
    .catch(error=>console.log(error)) //to catch the errors if any
    console.log(dataSource)
    }*/
                /*<TouchableOpacity onPress={this.findCoordinates}>
					  <Text style={styles.welcome}>Find Stores Near Me</Text>
            <Text>Latitude: {this.state.latitude}
            Longitude: {this.state.longitude}
            </Text>
        </TouchableOpacity>*/
    render(){
      const {loading} = this.state.loading;
        return (
          <View style={styles.container}>
            { loading ? null : (
            <MapView
            style={styles.myMap}
            initialRegion={{latitude: this.state.latitude,
            longitude: this.state.longitude,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05}}
            >
              <Marker coordinate={{ latitude: 33.0197, longitude: -117.125 }} />
              <Marker coordinate={{ latitude: 33.021151, longitude: -117.072395}} />
              <Marker coordinate={{ latitude: 33.019444, longitude: -117.113013}} />
              <Marker coordinate={{ latitude: 33.028, longitude: -117.126 }} />
              <Marker coordinate={{ latitude: 33.041635, longitude: -117.113013}} />
              <Marker coordinate={{ latitude: 33.019094, longitude: -117.114019}} />
            </MapView>
          )}
          </View>
        );
    }
}

AppRegistry.registerComponent('MapContainer', () => MapContainer)

const styles = StyleSheet.create({
  myMap: {
    flex: 0.5,
  },
  container: {
    flex: 1,
  },
  myText: {
    position: 'absolute',
    top: 100,
    right: 80,
  }
});


export default MapContainer;