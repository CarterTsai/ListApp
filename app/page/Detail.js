/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import Colors from "../common/Color";

import {
  AppRegistry,
  StyleSheet,
  Text,
  ScrollView,
  Image,
  Dimensions,
  View,
  Alert,
  RefreshControl,
  Navigator,
  Platform,
  TouchableOpacity,
} from 'react-native';

var {height, width} = Dimensions.get('window');
var nativeImageSource = require('nativeImageSource');
var NativeMethodsMixin = require('NativeMethodsMixin');

const iconPath = "../icon";

export default class Detail extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      infos: [],
    };
  }

  componentDidMount() {
     console.log(this.props);
  }

  _onRefresh() {
    this.setState({refreshing: true});

    this.setState({refreshing: false});
  }

  renderContent() {
    console.log(this.props.info);

    switch (this.props.info.cardType) {

      case 'product':
        return (
          <View> 
              <Image
                  style={styles.image}
                  source={{uri : this.props.info.imgUrl}}
                />
              <Text style={styles.title}>{this.props.info.title}</Text>
              {this.renderProductBtn()}
              <Text style={styles.content}>{this.props.info.content}</Text>
            </View>
          )

      case 'image':
        return (
            <View>
              
              <Image
                  style={styles.image}
                  source={{uri : this.props.info.imgUrl}}
                />
              <Text style={styles.title}>{this.props.info.title}</Text>
            </View>
            )
      case 'text':
      default:
        return (<Text style={styles.content}>
                {this.props.info.content}
              </Text>)
    
      

    }
    if(this.props.info.cardType === 'text') {
      return (<Text style={styles.content}>
                {this.props.info.content}
              </Text>)
    } else {
      return (
            <View>
              
              <Image
                  style={styles.image}
                  source={{uri : this.props.info.imgUrl}}
                />
              <Text style={styles.title}>{this.props.info.title}</Text>
            </View>
            )
    }
  }
  
  renderProductBtn = () => {
    if (this.props.info.cardType === "product") {
      return (<View>
                <Text style={styles.PriceText}>NT {this.props.info.datas.price}</Text>
                <TouchableOpacity style={styles.orderButton} onPress={this.onButtonPress}>
                  <Text style={styles.orderButtonText}> 立即購買</Text>
                </TouchableOpacity>
              </View>)
    } else {
      return null;
    }
  }
 
  render() {
    let _scrollView: ScrollView;
    let _card: Card;
    
    let contentHeight: 0;
    let scrollViewHeight: 0;
    const offsetPage = 60;
    const routes = [
      { title: 'First Scene', index: 0},
      { title: 'Second Scene', index: 1},
    ];

    buttonPress = (imgId) => {
      let m = this.state.infos;
      m[imgId].booking = (m[imgId].booking)?false: true;
      this.setState({info : m})
    };

    onActionSelected = (position) => {
      if (position === 0) {
        scrollToBottom();
      }
    };

    loadData = (event) => {
      console.log("offsetY: " + event.nativeEvent.contentOffset.y);
      console.log("scrollViewHeight: " + this.scrollViewHeight);
      console.log("contentHeight:" + this.contentHeight);
      console.log("total:" + (event.nativeEvent.contentOffset.y + this.scrollViewHeight));

      if((event.nativeEvent.contentOffset.y + this.scrollViewHeight + offsetPage) >= this.contentHeight) {
        
        let id = this.state.infos.length;

        // var datas = {
        //  id: id,
        //  url: 'https://d2ku7ggsvxaz7z.cloudfront.net/images/bam/3/MAI_180418427.jpg',
        //  title: '兩個小孩的托育費用就高達26500元',
        //  booking: true
        // };

        // let d = this.state.infos.push(datas);
        
        this.setState({ infos: this.state.infos});
        console.log(this.state.infos);
      }

    }

    // ScrollView scroll to bottom
    scrollToBottom = (animated = true) => {
      let scrollHeight = this.contentHeight - this.scrollViewHeight;
      if (scrollHeight > 0) {
        _scrollView.scrollTo({y: scrollHeight, animate: animated});
      }
    }

    return (
      <View style={styles.container}> 
        <ScrollView 
          onScroll={(event: Object) => loadData(event)}
          ref={(scrollView) => { _scrollView = scrollView; }}
          onContentSizeChange={(w, h) => this.contentHeight = h}
          onLayout={ev => this.scrollViewHeight = ev.nativeEvent.layout.height}
          // refreshControl={
          //   <RefreshControl
          //     progressViewOffset = {10}
          //     refreshing={this.state.refreshing}
          //      onRefresh={this._onRefresh.bind(this)}
          // />}
          >
          {this.renderContent()}
        </ScrollView>
      </View>
    );
  }
}

var toolbarActions = [
  {title: 'Chat', icon: require('../icon/ic_message_black/ic_message_black.png') ,show: 'always'},
];

var imgWidth =  (width * 0.95);
var offsetWidth = (width - imgWidth) / 2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    top: (Platform.OS === 'ios') ? 10 : 65,
    marginTop: 5,
    marginBottom: (Platform.OS === 'ios') ? 10 : 65,
    paddingHorizontal:0,
    backgroundColor: 'white',
  },
  image: {
    width: width ,
    height: width,
  },
  title: {
    textAlign: "center",
    fontSize: 25,
    padding: 15,
  },
  content: {
    fontSize: 20,
    padding: 15,
    lineHeight: 40,
    fontWeight: 'bold',
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
  },
  PriceText: {
    fontSize: 40,
    color: Colors.All.Price.Text,
    textAlign: 'center',
    fontWeight: 'bold',
    width: width,
  },
});
