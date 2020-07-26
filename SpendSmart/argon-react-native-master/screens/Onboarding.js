import React from "react";
import {
  ImageBackground,
  Image,
  StyleSheet,
  StatusBar,
  Dimensions
} from "react-native";
import { useFonts } from '@use-expo/font';
import * as Font from 'expo-font';
import { Block, Button, Text, theme } from "galio-framework";
import Register from './Register.js';
let customFonts = {
  'ArgonExtra': require('../assets/font/argon.ttf'),
  'Montserrat': require('../assets/font/Montserrat-Regular.ttf')
};
const { height, width } = Dimensions.get("screen");

import argonTheme from "../constants/Theme";
import Images from "../constants/Images";
class Onboarding extends React.Component {
  state = {
    fontLoaded: false,
  }

  async componentDidMount() {
    await Font.loadAsync(customFonts);
    this.setState({ fontLoaded: true });
  }

  render() {
    const { navigation } = this.props;
if (this.state.fontLoaded)
{
    return (
      <Block flex style={styles.container}>
        <StatusBar hidden />
        <Block flex center>
        </Block>
        <Block center>
          <Image source={Images.Slogo} style={styles.logo} />
        </Block>
        <Block flex center>
          <Text style = {styles.introText}>Welcome Back! Please sign in. </Text>
        </Block>
        <Block>
        </Block>
        <Block flex space="between" style={styles.padded}>
            <Block flex space="around" style={{ zIndex: 2 }}>
              <Block center>
              <Register style = {styles.logIn}/> 
                {/*<Button
                  style={styles.button}
                  color={'#C1BFBF'}
                  onPress={() => navigation.navigate("App")}
                  textStyle={{ color: 'black' }}
                >
                  Get Started
                </Button>*/}
                              <Button style={styles.createButton} onPress={() => navigation.navigate("App")} >
                        <Text bold size={18} color={argonTheme.COLORS.WHITE}>
                          LOGIN
                        </Text>
                      </Button>
              </Block>
          </Block>
        </Block>
      </Block>
    );
  }
  return null;
}
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white'
  },
  padded: {
    paddingHorizontal: theme.SIZES.BASE * 2,
    position: "relative",
    top: 20,
    bottom: theme.SIZES.BASE,
    zIndex: 2,
  },
  button: {
    borderRadius: 10,
    marginTop: 200,
    width: width - theme.SIZES.BASE * 4,
    height: theme.SIZES.BASE * 3,
    shadowRadius: 0,
    shadowOpacity: 0
  },
  logo: {
    width: 220,
    height: 220,
    zIndex: 2,
    position: 'relative',
    marginTop: '-45%',
    resizeMode: 'contain'
  },
  title: {
    marginTop:'-5%'
  },
  subTitle: {
    marginTop: 20
  },
  introText: {
    marginTop: 35,
    fontSize: 24,
    marginLeft: 15,
    marginRight: 5,
    marginBottom: 50,
    fontFamily: 'Montserrat',
  },
  logIn: {
    marginTop: 50,
  },
  createButton: {
    width: width * 0.5,
    marginTop: -90,
    marginBottom: 75,
    opacity: 0.6,
    backgroundColor: '#4D4DFF',
    borderRadius: 10,
  }
});

export default Onboarding;
