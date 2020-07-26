import React from 'react';
import { StyleSheet, Dimensions, ScrollView, Modal, Text, Alert} from 'react-native';
import { Block, theme } from 'galio-framework';

import { Card } from '../components';
import articles from '../constants/articles';
const { width } = Dimensions.get('screen');

export const myBasket = []

class Home extends React.Component {

  constructor(props) {
    super(props);
    this.addToBasket = this.addToBasket.bind(this);
    this.removeFromBasket = this.removeFromBasket.bind(this);
    this.viewBasket = this.viewBasket.bind(this);
  } 
  removeFromBasket = (itemName) => {
    
  }
  addToBasket = (itemName) => {
    myBasket.push(itemName)
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
      
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.articles}>
        <Block flex>
          {/*<Card item={articles[0]} horizontal  />*/}
          
          <Block flex row>
            <Card item={articles[ranNums[0]]} style={{ marginRight: theme.SIZES.BASE }} onClickKeep={this.addToBasket} onClickCancel = {this.removeFromBasket} isCart = {false}/>
            <Card item={articles[ranNums[1]]} onClickKeep={this.addToBasket} onClickCancel = {this.removeFromBasket} isCart = {false}/>
          </Block>
          <Block flex row>
          <Card item={articles[ranNums[2]]} style={{ marginRight: theme.SIZES.BASE }} onClickKeep={this.addToBasket} onClickCancel = {this.removeFromBasket} isCart = {false}/>
            <Card item={articles[ranNums[3]]} onClickKeep={this.addToBasket} onClickCancel = {this.removeFromBasket} isCart = {false}/>
            </Block>
            <Block flex row>
          <Card item={articles[ranNums[4]]} style={{ marginRight: theme.SIZES.BASE }} onClickKeep={this.addToBasket} onClickCancel = {this.removeFromBasket} isCart = {false}/>
            <Card item={articles[ranNums[5]]} onClickKeep={this.addToBasket} onClickCancel = {this.removeFromBasket} isCart = {false}/>
            </Block>
            <Block flex row>
          <Card item={articles[ranNums[6]]} style={{ marginRight: theme.SIZES.BASE }} onClickKeep={this.addToBasket} onClickCancel = {this.removeFromBasket} isCart = {false}/>
            <Card item={articles[ranNums[7]]} onClickKeep={this.addToBasket} onClickCancel = {this.removeFromBasket} isCart = {false}/>
            </Block>
            <Block flex row>
          <Card item={articles[ranNums[8]]} style={{ marginRight: theme.SIZES.BASE }} onClickKeep={this.addToBasket} onClickCancel = {this.removeFromBasket} isCart = {false}/>
            <Card item={articles[ranNums[9]]} onClickKeep={this.addToBasket} onClickCancel = {this.removeFromBasket} isCart = {false}/>
            </Block>
            <Block flex row>
            <Card item={basketCard} style={{ marginRight: theme.SIZES.BASE,  }} onClickKeep = {this.viewBasket} isCart = {true}/>
            </Block> 
        </Block>
      </ScrollView>
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
});

export default Home;