import Colors from "../common/Color";

import React, { Component, PropTypes } from 'react';

import {
  Image,
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableHighlight,
  Alert,
  Button,
  Platform,
  TouchableOpacity,
} from 'react-native';

var {height, width} = Dimensions.get('window');

const iconPath = "../icon";

type Props = {
  title: PropTypes.string,
  imgUrl: PropTypes.string,
  booking: PropTypes.bool,
  cardType: PropTypes.string,
  datas: PropTypes.object,
  onPress: () => mixed;
};

class Card extends React.Component { 
  props: Props;

  constructor(props) {
    super(props);
    this.state = {
      bookingimagePath: (props.booking) ? 
                require('../icon/ic_bookmark/ic_bookmark_black.png') :
                require('../icon/ic_bookmark/ic_bookmark_border_back.png') 
    }
  }

  componentDidMount() {
    
  }

  componentWillReceiveProps(nextProps) {
    let im = (nextProps.booking) ? 
                require('../icon/ic_bookmark/ic_bookmark_black.png') :
                require('../icon/ic_bookmark/ic_bookmark_border_back.png') 
    this.setState({bookingimagePath: im});
  }

  renderContent() {
    if(this.props.cardType != "text") {
     return  <Image source={{uri: this.props.imgUrl}}
                      style={styles.cardImage} />
    } else {
        let content = this.props.content;
        if(content.length > 100) {
          content = content.slice(0, 200) + " . . . .";
        }
        // content的空格是為了縮排
        return <Text style={styles.cardText}>     {content}</Text>
    }
  }

  onButtonPress() {

  }

  renderPrice() {
    if(this.props.cardType === "product") {
      return <Text style={styles.cardPrice}>NT {this.props.datas.price}</Text>
    } else {
      return null;
    }
  }

  
  renderProductBtn() {
    if(this.props.cardType === "product") {
      return (
              <TouchableOpacity style={styles.orderButton} onPress={this.onButtonPress}>
                   <Text style={styles.orderButtonText}>立即購買</Text>
              </TouchableOpacity>)
    } else {
      return null;
    }
  }

  render() {
    return (<View style={styles.card}>
               <Text style={styles.cardTitle}>{this.props.title}</Text>
              <TouchableHighlight activeOpacity={100} underlayColor='paleturquoise' onPress={this.props.onPress}>
                {this.renderContent()}
              </ TouchableHighlight>
              <View style={styles.cardBar}>
                {this.renderPrice()}
                <TouchableHighlight style={styles.cardBookmarkOutLine}
                                    underlayColor = {'gainsboro'} 
                                    onPress={this.props.onBookingPress}>
                      <Image
                        style={styles.cardBookmark}
                        source={this.state.bookingimagePath}
                      />
                </ TouchableHighlight>
              </View>
              {this.renderProductBtn()}
          </View>);
  }
};

var imgWidth =  (width * 0.95);
var offsetWidth = (width - imgWidth) / 2;
var cardWidth = width * 0.96;
var cardMargin = width * 0.02;
var cardBookmarkWidth = 32;
var priceTextWidth = width - 32 - (cardMargin*2) - 30 ;

const styles = StyleSheet.create({
  card: {
    flex: 1,
    flexDirection: 'column',
    top: (Platform.OS === 'ios') ? 10 : 70,
    marginTop: 5,
    marginBottom: 20,
    paddingHorizontal: 0,
    backgroundColor: Colors.Card.Background,
    borderBottomWidth: 0,
    borderBottomColor: Colors.Card.Border.Bottom,
    paddingBottom: 15,
    shadowColor: Colors.Card.Shadow.Background,
    shadowOpacity: 0.9,
    shadowRadius: 2,
    shadowOffset: {
      height: 2,
      width: 1
    },
    width: cardWidth,
    marginLeft: cardMargin,
    marginRight: cardMargin,
    borderRadius: 6
  },
  cardImage: {
    width: cardWidth,
    height: width * 1,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    marginLeft: 0,
    marginRight: 0,
  },
  cardText: {
    paddingLeft: (width - imgWidth),
    paddingRight: (width - imgWidth),
    fontSize: 20,
    lineHeight: 40,
    marginBottom: 15,
    fontWeight: 'bold',
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 15,
  },
  cardBookmarkOutLine: {
    borderRadius: 5
  },
  cardPrice: {
    fontSize: 40,
    color: Colors.All.Price.Text,
    textAlign: 'center',
    fontWeight: 'bold',
    width: priceTextWidth,
  },
  cardBookmark: {
    width: cardBookmarkWidth,
    height: cardBookmarkWidth,
    tintColor: Colors.Card.Bookmark.Bottom,
    top: 10
  },
  cardBar: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 10
  },
  orderButton: {
    margin: 20,
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: Colors.All.OrderButton.Background,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  orderButtonText: {
    fontSize: 20,
    color: Colors.All.OrderButton.Text
  }
});

module.exports = Card;
