import React, { Component } from 'react';
import {Modal, Text, TouchableOpacity, StyleSheet, View} from 'react-native';
import Icon from './Icon';
import argonTheme from '../constants/Theme';
import { Dropdown } from 'react-native-material-dropdown';

export default class ModalExample extends Component {
  constructor() {
    super();
    
    this.state = {
      showMenu: true,
    };
    
    this.showMenu = this.showMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
  }
  
  showMenu(event) {
    event.preventDefault();
    console.log(this.state.showMenu);
    this.setState({ showMenu: true }, () => {
      document.addEventListener('click', this.closeMenu);
    });
  }
  
  closeMenu(event) {
    
    if (!this.dropdownMenu.contains(event.target)) {
      
      this.setState({ showMenu: false }, () => {
        document.removeEventListener('click', this.closeMenu);
      });  
      
    }
  }

  render() {
    let data = [{
        value: 'Banana',
      }, {
        value: 'Mango',
      }, {
        value: 'Pear',
      }];
    return (
 <Dropdown
                label='My Basket!!!!'
                data={data}
                style={styles.myDropdown}
                />
    );
  }
}

const styles = StyleSheet.create({
    button: {
      padding: 12,
      position: 'relative',
    },
    myDropdown:{
        marginRight: 80,
    }
});
{/*import React, {Component} from 'react';
import {Modal, Text, TouchableOpacity, StyleSheet, View} from 'react-native';
import Icon from './Icon';
import argonTheme from '../constants/Theme';
export default class ModalExample extends Component {

  state = {
    modalVisible: false,
  };

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  render() {
    return (
      <View>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            alert('Modal has been closed.');
          }}>
          <View >
            <View>
              <Text>Hello World!</Text>

              <TouchableOpacity style={styles.button} onPress={() => {
            this.setModalVisible(true);
          }}>
    <Icon
      family="ArgonExtra"
      size={16}
      name="basket"
      color={argonTheme.COLORS[this.props.isWhite ? 'WHITE' : 'ICON']}
    />
  </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <TouchableHighlight
          onPress={() => {
            this.setModalVisible(true);
          }}>
          <Text>Show Modal</Text>
        </TouchableHighlight>
      </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    button: {
      padding: 12,
      position: 'relative',
    }
});*/}