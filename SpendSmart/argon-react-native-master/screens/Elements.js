import React from "react";
import { ScrollView, StyleSheet, Dimensions, TouchableOpacity, Image, View} from "react-native";
// Galio components
import { HeaderHeight  } from "../constants/utils";
import { Block, Text, Button as GaButton, theme } from "galio-framework";
// Argon themed components
import { argonTheme, tabs } from "../constants/";
import { Button, Select, Icon, Input, Header, Switch } from "../components/";
import { Table, Row, Rows, TableWrapper, Cell, Col, Cols } from 'react-native-table-component';

const { width } = Dimensions.get("screen");

class Elements extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHead: ['Item', 'Location in Store'],
      tableData: [
        ['Apples', 'Aisle 15'],
        ['Mangoes', 'Aisle 10'],
        ['Cookies', 'Aisle 13'],
      ],
      tableDataRow1: 
        ['Target', '$10.99', '0.6 miles'],
      tableDataRow2 :
        ['Ralphs', '$11.69', '0.8 miles'],
      tableDataRow3 : 
        ['Walmart', '$10.05', '1.6 miles'],
      tableDataRow4 : 
        ['Sprouts', '14.99', '1.1 miles'],
      tableDataRow5 : 
        ['Vons', '$10.05', '1.6 miles'],
      tableDataRow6 : 
        ['Jimbos', '14.99', '1.1 miles']
    }
  }
  render() {
    const state = this.state;
    return (
      <Block flex style={styles.container}>
      <Image source={require('./my-store.jpg')} style={styles.myPicture} />
      <View style={styles.containerTable}>
        <Table borderStyle={{borderWidth: 2, borderColor: '#525F7F', borderRadius: 7}}>
          <Row data={state.tableHead} style={styles.head} textStyle={styles.text}/>
          <Rows data={state.tableData} textStyle={styles.text}/>
    </Table>
    </View>  
    <Text center style = {styles.infoText}>
      Please remember to follow safe social distancing guidelines when you're inside the store. We hope theinformation above helps you spend as little time in the store as possible!
    </Text>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.COLORS.WHITE,
    marginTop: Platform.OS === 'android' ? -HeaderHeight : 0,
  },
  containerTable: { flex: 0.5, padding: 16, paddingTop: 30, backgroundColor: '#fff'},
  head: { height: 40, backgroundColor: '#b8ddf2',     borderBottomWidth: 2,},
  text: { margin: 6, fontFamily: 'Montserrat'},
  padded: {
    paddingHorizontal: theme.SIZES.BASE * 2,
    zIndex: 3,
    position: 'absolute',
    bottom: Platform.OS === 'android' ? theme.SIZES.BASE * 2 : theme.SIZES.BASE * 3,
  },
  button: {
    width: width - theme.SIZES.BASE * 4,
    height: theme.SIZES.BASE * 3,
    shadowRadius: 0,
    shadowOpacity: 0,
  },
  infoText: {
    lineHeight: 20,
    fontWeight: '400',
    backgroundColor: 'white',
    paddingLeft: 23,
    paddingRight: 23,
    fontSize: 14,
    fontFamily: 'Montserrat',
    marginTop: 260,
    color: 'black'
  },
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
  myPicture: {
    position: 'relative',
    left: -30,
    width: 480,
    height: 200,
  },
});

export default Elements;