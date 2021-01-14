import React from 'react';
import { withNavigation } from '@react-navigation/compat';
import { View, TouchableOpacity, StyleSheet, Platform, Dimensions, Container } from 'react-native';
import { Button, Block, NavBar, Text, theme } from 'galio-framework';
import { Dropdown } from 'react-native-material-dropdown';
import Icon from './Icon';
import Input from './Input';
import Tabs from './Tabs';
import ModalExample from './ModalExample';
import argonTheme from '../constants/Theme';
import { white } from 'color-name';
import { ThemeColors } from 'react-navigation';
import {inMyBasket} from '../screens/Home';


const { height, width } = Dimensions.get('window');
const iPhoneX = () => Platform.OS === 'ios' && (height === 812 || width === 812 || height === 896 || width === 896);
let myBasket = []
let isModalVisible = false
const BellButton = ({isWhite, style, navigation}) => (
  <TouchableOpacity style={[styles.button, style]} onPress={() => navigation.navigate('Pro')}>
    <Icon
      family="ArgonExtra"
      size={16}
      name="bell"
      color={argonTheme.COLORS[isWhite ? 'WHITE' : 'ICON']}
    />
    <Block middle style={styles.notify} />
  </TouchableOpacity>
);

const BasketButton = ({isWhite, style, navigation}) => (
  <TouchableOpacity style={[styles.button, style]} onPress={() => navigation.navigate('Pro')}>
    <Icon
      family="ArgonExtra"
      size={16}
      name="basket"
      color={argonTheme.COLORS[isWhite ? 'WHITE' : 'ICON']}
    />
  </TouchableOpacity>
);

const onPressBasket = () => {
  myBasket = {inMyBasket};
  isModalVisible = true;
}
const DropDownComponent = () => (
  //switch this with a touchable opacity which, on press, calls a function in Home.js that returns the basket
  <View>
  <TouchableOpacity
              onPress = {onPressBasket}
                >
                  <Text> Your Basket </Text>
  </TouchableOpacity>
  </View>
  /*<Dropdown
                label='My Basket'
                data={data}
                style ={styles.myDropdown}
                //containerStyle={styles.myDropdown}
                //overlayStyle = {styles.overlay}
                //pickerStyle = {styles.picker}
  />*/
);

const SearchButton = ({isWhite, style, navigation}) => (
  <TouchableOpacity style={[styles.button, style]} onPress={() => navigation.navigate('Pro')}>
    <Icon
      size={16}
      family="Galio"
      name="search-zoom-in"
      color={theme.COLORS[isWhite ? 'WHITE' : 'ICON']}
    />
  </TouchableOpacity>
);


const myModal = (shouldShow) => {
  <Modal
      animationType="slide"
      visible={shouldShow}
    >
      <Text> Your Basket currently contains: {myBasket}. </Text>
  </Modal>
}


class Header extends React.Component {
  handleLeftPress = () => {
    const { back, navigation } = this.props;
    return (back ? navigation.goBack() : navigation.openDrawer());
  }
  renderRight = () => {
    const { white, title, navigation } = this.props;
    //
    if (title === 'Title') {
      return [
        /*<BellButton key='chat-title' navigation={navigation} isWhite={white} />,*/
        /*<BasketButton key='basket-title' navigation={navigation} isWhite={white} />*/
        //<ModalExample />
      ]
    }

    switch (title) {
      case 'Home':
        return ([
          /*<BellButton key='chat-home' navigation={navigation} isWhite={white} />,*/
          <DropDownComponent />,
          <myModal shouldShow = {isModalVisible} />,
          <BasketButton key='basket-home' navigation={navigation} isWhite={white} />
        ]);
      case 'Deals':
        return ([
          <BellButton key='chat-categories' navigation={navigation} />,
          <BasketButton key='basket-categories' navigation={navigation} />
        ]);
      case 'Categories':
        return ([
          <BellButton key='chat-categories' navigation={navigation} isWhite={white} />,
          <BasketButton key='basket-categories' navigation={navigation} isWhite={white} />
        ]);
      case 'Category':
        return ([
          <BellButton key='chat-deals' navigation={navigation} isWhite={white} />,
          <BasketButton key='basket-deals' navigation={navigation} isWhite={white} />
        ]);
      case 'Profile':
        return ([
          <BellButton key='chat-profile' navigation={navigation} isWhite={white} />,
          <BasketButton key='basket-deals' navigation={navigation} isWhite={white} />
        ]);
      case 'Product':
        return ([
          <SearchButton key='search-product' navigation={navigation} isWhite={white} />,
          <BasketButton key='basket-product' navigation={navigation} isWhite={white} />
        ]);
      case 'Search':
        return ([
          <BellButton key='chat-search' navigation={navigation} isWhite={white} />,
          <BasketButton key='basket-search' navigation={navigation} isWhite={white} />
        ]);
      case 'Settings':
        return ([
          <BellButton key='chat-search' navigation={navigation} isWhite={white} />,
          <BasketButton key='basket-search' navigation={navigation} isWhite={white} />
        ]);
      default:
        break;
    }
  }
  renderSearch = () => {
    const { navigation } = this.props;
    return (
      <Block>
      <Text
        center
        style={styles.bigText}>
          Welcome Back!
          </Text>
          <Text
        center
        style={styles.smallText}>
          We're glad you could join us. Use the search button below to add items to your basket, or scroll through our specially curated list of your recently searched and favorited items!
          </Text>
          <Input
          right
          color="black"
          style={styles.search}
          placeholder="Search to add an item to your basket"
          placeholderTextColor={'#8898AA'}
          onfocus={() => navigation.navigate('Profile')}
          iconContent={<Icon size={16} color ={theme.COLORS.MUTED} name="search-zoom-in" family="ArgonExtra" />}
          />
          </Block>
    );
  }
  renderBasketPage = () => {
    const { navigation } = this.props;
    return (
      <Block>
      <Text
        center
        style={styles.bigText}>
          Congrats!
          </Text>
          <Text
        center
        style={styles.smallText}>
          Below we've listed potential stores where you could obtain the items in your basket! The first one you see (highlighted in green) is our recommended option for you. Click whichever one best suits your needs to get in-store navigation directly to the items in your basket.
          </Text>
          </Block>
    );
  }
  renderMissionPage = () => {
    const { navigation } = this.props;
    return (
      <Block>
      <Text
        center
        style={styles.bigText}>
          Our Mission
          </Text>
          <Text
        center
        style={styles.smallText}>
          Our mission is two-fold. First off, we recognize the economic impact that this virus has had on families across the country. Many have lost their jobs, and for them, each dollar that they may have saved or obtained from the government is paramount. Our app finds the cheapest grocery store option for the user based both on the specific items that they need and the gas that they'd spend going to the store. When the user pichs the store, we then offer them directions to the items in the store so as to minimize the time they have to spend searching for things. In this way, we seek to help people in a financial manner and in terms of social distancing. Learn more about us specifically by clicking on our pictures below!
          </Text>
          </Block>
    );
  }


  renderStorePage = () => {
    const { navigation } = this.props;
    return (
      <Block>
      <Text
        center
        style={styles.bigText}>
          Target
          </Text>
          <Text
        center
        style={styles.smallText}>
          Address: Target, 17170 Camino Del Sur, San Diego, CA 92127
          </Text>
          </Block>
    );
  }
  renderOptions = () => {
    const { navigation, optionLeft, optionRight } = this.props;

    return (
      <Block>
      <Block row style={styles.options}>
        <Button shadowless style={[styles.tab, styles.divider]} onPress={() => navigation.navigate('Profile')}>
          <Block row middle>
            <Icon name="diamond" family="ArgonExtra" style={{ paddingRight: 8 }} color={argonTheme.COLORS.ICON} />
            <Text size={16} style={styles.tabTitle}>{optionLeft || 'By Item'}</Text>
          </Block>
        </Button>
        <Button shadowless style={styles.tab} onPress={() => navigation.navigate('Profile')}>
          <Block row middle>
            <Icon size={16} name="bag-17" family="ArgonExtra" style={{ paddingRight: 8 }} color={argonTheme.COLORS.ICON}/>
            <Text size={16} style={styles.tabTitle}>{optionRight || 'By Shop'}</Text>
          </Block>
        </Button>
      </Block>
          </Block>
    );
  }
  renderTabs = () => {
    const { tabs, tabIndex, navigation } = this.props;
    const defaultTab = tabs && tabs[0] && tabs[0].id;
    
    if (!tabs) return null;

    return (
      <Tabs
        data={tabs || []}
        initialIndex={tabIndex || defaultTab}
        onChange={id => navigation.setParams({ tabId: id })} />
    )
  }
  renderHeader = () => {
    const { search, options, tabs, basket, mission, store} = this.props;
    if (search || tabs || options || basket || mission || store) {
      return (
        <Block>
        <Block row center>
          {search ? this.renderSearch() : null}
          {basket ? this.renderBasketPage() : null}
          {mission ? this.renderMissionPage(): null}
          {store ? this.renderStorePage(): null}
        </Block>
        {/*<Block row center>
          {options ? this.renderOptions() : null}
          {tabs ? this.renderTabs() : null}
        </Block>*/}
        </Block>
      );
    }
  }
  render() {
    const { back, title, white, transparent, bgColor, iconColor, titleColor, navigation, ...props } = this.props;

    const noShadow = ['Search', 'Categories', 'Deals', 'Pro', 'Profile'].includes(title);
    const headerStyles = [
      !noShadow ? styles.shadow : null,
      transparent ? { backgroundColor: 'rgba(0,0,0,0)' } : null,
    ];

    const navbarStyles = [
      styles.navbar,
      bgColor && { backgroundColor: bgColor }
    ];

    return (
      <Block style={headerStyles}>
        <NavBar
          back={false}
          title={title}
          style={navbarStyles}
          transparent={transparent}
          right={this.renderRight()}
          rightStyle={{ alignItems: 'center' }}
          left={
            <Icon 
              name={back ? 'chevron-left' : "menu"} family="entypo" 
              size={20} onPress={this.handleLeftPress} 
              color={iconColor || (white ? argonTheme.COLORS.WHITE : argonTheme.COLORS.ICON)}
              style={{ marginTop: 2 }}
            />
              
          }
          leftStyle={{ paddingVertical: 12, flex: 0.2 }}
          titleStyle={[
            styles.title,
            { color: argonTheme.COLORS[white ? 'WHITE' : 'HEADER'] },
            titleColor && { color: titleColor }
          ]}
          {...props}
        />
        {this.renderHeader()}
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    padding: 12,
    position: 'relative',
    top: 0,
    right: 30,
  },
  title: {
    width: '100%',
    fontSize: 16,
    fontWeight: 'bold',
  },
  navbar: {
    paddingVertical: 0,
    paddingBottom: theme.SIZES.BASE * 1.5,
    paddingTop: iPhoneX ? theme.SIZES.BASE * 4 : theme.SIZES.BASE,
    zIndex: 5,
  },
  overlay:
  {

  },
  picker:{
    
  },
  shadow: {
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.2,
    elevation: 3,
  },
  notify: {
    backgroundColor: argonTheme.COLORS.LABEL,
    borderRadius: 4,
    height: theme.SIZES.BASE / 2,
    width: theme.SIZES.BASE / 2,
    position: 'absolute',
    top: 9,
    right: 12,
  },
  myDropdown:
  {
    position: 'relative',
    marginRight: 100,
    top: -7,
    right: 50,
    color: 'red',
  },
  header: {
    backgroundColor: theme.COLORS.WHITE,
  },
  divider: {
    borderRightWidth: 0.3,
    borderRightColor: theme.COLORS.ICON,
  },
  search: {
    height: 50,
    width: width - 32,
    marginHorizontal: 16,
    borderWidth: 1,
    borderRadius: 7,
    borderColor: argonTheme.COLORS.BORDER
  },
  options: {
    marginBottom: 24,
    marginTop: 25,
    elevation: 4,
  },
  tab: {
    backgroundColor: theme.COLORS.TRANSPARENT,
    width: width * 0.35,
    borderRadius: 0,
    borderWidth: 0,
    height: 24,
    elevation: 0,
  },
  tabTitle: {
    lineHeight: 19,
    fontWeight: '400',
    backgroundColor: 'white',
    color: argonTheme.COLORS.HEADER
  },
  bigText: {
    marginTop: 20,
    marginBottom: 0,
    lineHeight: 50,
    fontSize: 40,
    fontWeight: 'bold',
    backgroundColor: 'white',
    fontFamily: 'Montserrat',
    color: argonTheme.COLORS.HEADER
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
});

export default withNavigation(Header);
