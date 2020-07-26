import React from 'react';
import * as Font from 'expo-font';
import { createIconSetFromIcoMoon } from '@expo/vector-icons';
import { Icon } from 'galio-framework';

import argonConfig from '../assets/font/argon.json';
let customFonts = {
  'ArgonExtra': require('../assets/font/argon.ttf'),
  'Montserrat': require('../assets/font/Montserrat-Regular.ttf')
};
const ArgonExtra = require('../assets/font/argon.ttf');
const IconArgonExtra = createIconSetFromIcoMoon(argonConfig, 'ArgonExtra');
const Montserrat = require('../assets/font/Montserrat-Regular.ttf');

class IconExtra extends React.Component {
  state = {
    fontLoaded: false,
  }

  async componentDidMount() {
    await Font.loadAsync(customFonts);
    this.setState({ fontLoaded: true });
  }

  render() {
    const { name, family, ...rest } = this.props;
    
    if (this.state.fontLoaded) {
      if (family === 'ArgonExtra' || family === 'Montserrat') {
        return <IconArgonExtra name={name} family={family} {...rest} />;
      }
      return <IconArgonExtra name={name} family={family} {...rest} />;
    }

    return null;
  }
}

export default IconExtra;
