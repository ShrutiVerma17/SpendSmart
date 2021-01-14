import React from 'react';
import { StyleSheet, TouchableOpacity, Image, Dimensions, View, ScrollView, Modal, Text, TextInput, Alert, Button} from 'react-native';
import { Block, theme } from 'galio-framework';
import argonTheme from '../constants/Theme';
import { FloatingAction } from "react-native-floating-action";
import { Card } from '../components';
import articles from '../constants/articles';
import Icon from '../components/Icon';
import Input from '../components/Input';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { red, blue } from 'color-name';
const { width } = Dimensions.get('screen');



export const myBasket = []
console.log("Starting up Heroku server")
    url = "https://dry-sands-39247.herokuapp.com/searching/banana";
    fetch(url)
    .then((response) => response.json())
class Home extends React.Component {
  state = {
    userInput: "",
    itemsList: [],
    alreadyCalled: false,
  };
  constructor(props) {
    super(props);
    this.addToBasket = this.addToBasket.bind(this);
    this.removeFromBasket = this.removeFromBasket.bind(this);
    this.viewBasket = this.viewBasket.bind(this);
    this.onInputSubmit = this.onInputSubmit.bind(this);
    this.getItems = this.getItems.bind(this);
    this.returnFormattedItems = this.returnFormattedItems.bind(this);
    this.findMyItems = this.findMyItems.bind(this);
  } 
  removeFromBasket = (itemName) => {
    
  }
  addToBasket = (itemName) => {
    myBasket.push(itemName)
  }

  onInputSubmit = (input) => {
    this.setState({userInput: input, alreadyCalled: false});
  }
  viewBasket = () => {
    let inBasket = "\n";
    for(let i = 0; i < myBasket.length; i++){
      inBasket = inBasket + myBasket[i] + "\n"
    }
    Alert.alert(
      "Here is your basket so far:", inBasket,
      [
        {
          text: "Keep Shopping",
          style: "cancel"
        },
        { text: "Finished"}
      ],
      { cancelable: false }
  );
  }

  getItems = (searched) =>
  {
    console.log("Starting API call")
    url = "https://dry-sands-39247.herokuapp.com/searching/" + searched;
    fetch(url)
    .then((response) => response.json())
    .then((json) => {
      var totalItems = json.length
      var list = [];
      for(let i = 0; i < totalItems; i++){
          list.push({title: json[i].product, image: json[i].image, cta: ""});
      }
      this.setState({itemsList: list, alreadyCalled: true});
    })
  }

  returnFormattedItems = () => {
    let len = this.state.itemsList.length;
    let myArray = [];
    for (let i = 0; i < len; i += 2)
    {
      if (i + 1 < len)
      {
        myArray.push(
          <Block flex row>
            <Card item={this.state.itemsList[i]} style={{ marginRight: theme.SIZES.BASE }} onClickKeep={this.addToBasket} onClickCancel = {this.removeFromBasket} isCart = {false}/>
            <Card item={this.state.itemsList[i+1]} onClickKeep={this.addToBasket} onClickCancel = {this.removeFromBasket} isCart = {false}/>
          </Block>

        )
      }
      else{
        myArray.push(
          <Block flex row>
            <Card item={this.state.itemsList[i]} style={{ marginRight: theme.SIZES.BASE }} onClickKeep={this.addToBasket} onClickCancel = {this.removeFromBasket} isCart = {false}/>
          </Block>

        )
      }
    }

    return myArray;
  }

  findMyItems() {
    if (this.state.userInput != "")
      this.getItems(this.state.userInput);
  }

  renderArticles = () => {
    const nums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    var ranNums = [];
    i = nums.length;
    j = 0;

while (i--) {
    j = Math.floor(Math.random() * (i+1));
    ranNums.push(nums[j]);
    nums.splice(j,1);
}
let basketCard = {
  title: 'View Your Current Basket',
  image: 'https://source.unsplash.com/1600x900/?cart,shopping,basket',
  cta: ''
}
    return (
      <View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.articles}>
        <Block flex>
          {/*<Card item={articles[0]} horizontal  />*/}
          <Block flex row>
          <TextInput
            right
            style={styles.search}
            placeholder="Search for an item"
            placeholderTextColor={'#8898AA'}
            onSubmitEditing={input => this.onInputSubmit(input.nativeEvent.text)}
            defaultValue={this.state.userInput}
          />
          </Block>
          {this.state.alreadyCalled ? <Text></Text>: this.findMyItems()}
          {this.state.itemsList.length > 0 ?
          <Block>
             {this.returnFormattedItems()}
             <Block flex row>
            <Card item={basketCard} style={{ marginRight: theme.SIZES.BASE,  }} onClickKeep = {this.viewBasket} isCart = {true}/>
            </Block>
            </Block>
            : <Text></Text>
          }

          </Block>
      </ScrollView>
      <FloatingAction
        actions={[]}
        color= '#028ce6'
        overlayColor='rgba(0, 0, 0, 0.0)'
        onPressMain={this.viewBasket}
        floatingIcon={require('./basket.png')}
      />
      </View>
    )
  }

  render() {
    return (
      <Block flex center style={styles.home}>
        {this.renderArticles()}
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  home: {
    width: width,    
  },
  articles: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE,
  },
  search: {
    height: 50,
    width: width - 61,
    marginHorizontal: 16,
    paddingLeft: 20,
    borderWidth: 1,
    borderRadius: 7,
    borderColor: argonTheme.COLORS.HEADER
  },
  smallText: {
    lineHeight: 20,
    fontWeight: '400',
    paddingLeft: 23,
    paddingRight: 23,
    fontSize: 15,
    fontFamily: 'Montserrat',
    marginTop: 20,
    marginBottom: 20,
    color: 'black'
  },
  basketButton: {
    height: 5,
    width: 5,
    borderRadius: 5,
    borderColor: 'blue',
    paddingLeft: 80,
    paddingRight: 5,
  },
  basketButton: {
    height: 5,
    width: 5,
    resizeMode: 'contain',
  },
});

export default Home;