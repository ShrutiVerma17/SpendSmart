import React from 'react';
import { withNavigation } from '@react-navigation/compat';
import PropTypes from 'prop-types';
import { StyleSheet, Dimensions, Image, TouchableWithoutFeedback, TouchableHighlight, Alert } from 'react-native';
import { Block, Text, theme } from 'galio-framework';

import { argonTheme } from '../constants';


class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = { pressStatus: false};
    this.onHideUnderlay=this._onHideUnderlay.bind(this);
    this.onShowUnderlay=this._onShowUnderlay.bind(this);
  }  
  _onHideUnderlay() {
    this.setState({ pressStatus: false });
}
_onShowUnderlay() {
    this.setState({ pressStatus: true });
}
  render() {
    const { navigation, item, horizontal, full, style, ctaColor, imageStyle, onClickKeep } = this.props;
    const myAlert = (title) =>
  Alert.alert(
    "Congratulations!",
    "This item has been added to your basket!",
    [
      {
        text: "Undo",
        onPress: () => {onClick(title)},
        style: "cancel"
      },
      { text: "Keep", onPress: () => {onClickKeep(title)} }
    ],
    { cancelable: false }
) ;
    const imageStyles = [
      full ? styles.fullImage : styles.horizontalImage,
      imageStyle
    ];
    const cardContainer = [styles.card, styles.shadow, style];
    const imgContainer = [styles.imageContainer,
      horizontal ? styles.horizontalStyles : styles.verticalStyles,
      styles.shadow
    ];

    return (
      <Block row={horizontal} card flex style={cardContainer}>
        <TouchableHighlight underlayColor={'green'}>
          <Block flex style={imgContainer}>
            <Image source={{uri: item.image}} style={imageStyles} />
          </Block>
        </TouchableHighlight>
        <TouchableHighlight activeOpacity={0.6} underlayColor="#DDDDDD" onPress={myAlert(item.title)}>
          <Block flex space="between" style={styles.cardDescription}>
            <Text size={24}  style={
                        this.state.pressStatus
                            ? styles.cardTitlePressed
                            : styles.cardTitleNormal}>{item.title}</Text>
    </Block>
    </TouchableHighlight>
      </Block>
    );
  }
}

Card.propTypes = {
  item: PropTypes.object,
  horizontal: PropTypes.bool,
  full: PropTypes.bool,
  ctaColor: PropTypes.string,
  imageStyle: PropTypes.any,
  onClickKeep: PropTypes.func,
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.COLORS.WHITE,
    marginVertical: theme.SIZES.BASE,
    borderWidth: 0,
    minHeight: 114,
    marginBottom: 16
  },
  cardTitleNormal: {
    flex: 1,
    flexWrap: 'wrap',
    paddingBottom: 6,
    color: '#3896cd',
    fontFamily: 'Montserrat',
    fontSize: 20,
  },
  cardTitlePressed: {
    flex: 1,
    flexWrap: 'wrap',
    paddingBottom: 6,
    color: '#3896cd',
    fontFamily: 'Montserrat',
    fontSize: 20,
    backgroundColor: 'green',
    opacity: 0.4,
  },
  cardDescription: {
    padding: theme.SIZES.BASE / 2
  },
  imageContainer: {
    borderRadius: 3,
    elevation: 1,
    overflow: 'hidden',
  },
  image: {
    // borderRadius: 3,
  },
  horizontalImage: {
    height: 122,
    width: 'auto',
  },
  horizontalStyles: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  verticalStyles: {
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0
  },
  fullImage: {
    height: 215
  },
  shadow: {
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.1,
    elevation: 2,
  },
});

export default withNavigation(Card);