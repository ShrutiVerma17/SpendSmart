import React from 'react';
import { View, Image, StyleSheet, StatusBar, Dimensions, Platform, Linking, TouchableOpacity} from 'react-native';
import { Block, Button, Text, theme } from 'galio-framework';
import { Table, Row, Rows, TableWrapper, Cell, Col, Cols } from 'react-native-table-component';
import MapView, {Marker} from 'react-native-maps';
const loadingGif = require('./loadingGif.gif')

const { height, width } = Dimensions.get('screen');
import { Images, argonTheme } from '../constants/';
import { HeaderHeight } from "../constants/utils";
import MapContainer from "../components/MapContainer";
export default class Pro extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      loadingStores: true,
      location: 0,
      latitude: 0,
      longitude: 0,
      didWork: false,
      tableHead: ['Store', 'Price', 'Distance', 'Select'],
      markersArray: [],
      tableData: [],
      tableDataRow1: 
        ['Target'],
      tableDataRow2 :
        ['Ralphs'],
      tableDataRow3 : 
        ['Walmart'],
      tableDataRow4 : 
        ['Sprouts'],
      tableDataRow5 : 
        ['Vons'],
      tableDataRow6 : 
        ['Jimbos']
    }
  }

  _alertIndex(index) {
    Alert.alert(`Hi!`);
  }
  findCoordinates = () => {
		navigator.geolocation.getCurrentPosition(
			position => {
        //console.log(this.state.latitude, this.state.longitude, this.state.loading)
        this.setState({latitude: position.coords.latitude, longitude: position.coords.longitude, didWork: true, loading:false})
        //console.log(this.state.latitude, this.state.longitude, this.state.loading)
        this.getStores()
			},
			error => Alert.alert(error.message),
			{ enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  };

  getStores = () =>
  {
    url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + this.state.latitude + "," + this.state.longitude + "&radius=16093.44&type=shop&keyword=store&key=AIzaSyADu-dzTMAsEUjwR7jkQMKg8-eA7NdxXWU"
    fetch(url)
    .then((response) => response.json())
    .then((json) => {
      console.log(json)
      var totalCompanies = json.results.length
      for (var i = 0; i < totalCompanies; i++)
      {
        this.state.markersArray.push([json.results[i].geometry.location.lat, json.results[i].geometry.location.lng]);
        //this.state.tableData.push([json.results[i].name, '0', '0'])
        //console.log(this.state.tableData)
        this.setState({loadingStores: false});
      }
    })
  }

  componentDidMount() {
		this.findCoordinates()
  }
  
  render() {
    const { navigation } = this.props;
    const loading   = this.state.loading;
    const loadingStores = this.state.loadingStores;
    //console.log(loading)
    const state = this.state;
    const element = (data, index) => (
      <TouchableOpacity onPress={() => this._alertIndex(index)}>
        <View>
          <Text style={styles.text}>Choose</Text>
          </View>
      </TouchableOpacity>
    );
    return (
      <Block flex>
      { loading && loadingStores ? <Image source={loadingGif} style={styles.loading}></Image> : (
        <Block flex style={styles.container}>
            <MapView
            style={styles.myMap}
            initialRegion={{latitude: this.state.latitude,
            longitude: this.state.longitude,
            latitudeDelta: 0.07,
            longitudeDelta: 0.07}}
            >
            {this.state.markersArray[0] != null && this.state.markersArray.map((marker, index) => (
              <MapView.Marker
                key = {index}
                coordinate = {{
                    latitude: marker[0],
                    longitude: marker[1]
                }}
              />
              ))
            }
            </MapView>

            <View style={styles.containerTable}>
            <Table borderStyle={{borderWidth: 2, borderColor: '#525F7F', borderRadius: 7}}>
             <Row data={state.tableHead} style={styles.head} textStyle={styles.text}/>


              {/* {this.state.tableData[0] != null && this.state.tableData.map((row, index) => (
              <TouchableOpacity style={styles.bigButton}
              >
                <Row data={row} textStyle={styles.text} />
              </TouchableOpacity>
              ))
            }*/}



            <TouchableOpacity style={styles.bigButton} onPress={() => navigation.navigate('Elements')}>
              <Row data={state.tableDataRow1} textStyle={styles.text}/>
              </TouchableOpacity>
              <TouchableOpacity style={styles.bigButton}>
              <Row data={state.tableDataRow2} textStyle={styles.text}/>
              </TouchableOpacity>
              <TouchableOpacity style={styles.bigButton}>
              <Row data={state.tableDataRow3} textStyle={styles.text}/>
              </TouchableOpacity>   
              <TouchableOpacity style={styles.bigButton}>
              <Row data={state.tableDataRow4} textStyle={styles.text}/>
              </TouchableOpacity>   
              <TouchableOpacity style={styles.bigButton}>
              <Row data={state.tableDataRow5} textStyle={styles.text}/>
              </TouchableOpacity> 
              <TouchableOpacity style={styles.bigButton}>
              <Row data={state.tableDataRow6} textStyle={styles.text}/>
          </TouchableOpacity>
            </Table>
            </View>
          </Block>
          )}
</Block>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.COLORS.WHITE,
    marginTop: Platform.OS === 'android' ? -HeaderHeight : 0,
  },
  loading: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    marginTop: 100,
  },
  padded: {
    paddingHorizontal: theme.SIZES.BASE * 2,
    zIndex: 3,
    position: 'absolute',
    bottom: Platform.OS === 'android' ? theme.SIZES.BASE * 2 : theme.SIZES.BASE * 3,
  },
  bigButton: {
    borderRightWidth: 2, 
    borderColor: '#525F7F',
  },
  button: {
    width: width - theme.SIZES.BASE * 4,
    height: theme.SIZES.BASE * 3,
    shadowRadius: 0,
    shadowOpacity: 0,
  },
  containerTable: { flex: 0.5, padding: 16, paddingTop: 30, backgroundColor: '#fff'},
  head: { height: 40, backgroundColor: '#b8ddf2',     borderBottomWidth: 2,},
  text: { margin: 6, fontFamily: 'Montserrat'},
  pro: {
    backgroundColor: argonTheme.COLORS.INFO,
    paddingHorizontal: 8,
    marginLeft: 3,
    borderRadius: 4,
    height: 22,
    marginTop: 15
  },
  gradient: {
    zIndex: 1,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 66,
  },
  smallText: {
    lineHeight: 20,
    fontWeight: '400',
    backgroundColor: 'white',
    paddingLeft: 23,
    paddingRight: 23,
    fontSize: 15,
    fontFamily: 'Montserrat',
    marginTop: 20,
    marginBottom: 20,
    color: 'black'
  },
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
  },
});
