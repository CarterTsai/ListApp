/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import Card from '../compoment/Card';
import Detail from "./Detail";

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
} from 'react-native';

var {height, width} = Dimensions.get('window');
var nativeImageSource = require('nativeImageSource');
var NativeMethodsMixin = require('NativeMethodsMixin');

const iconPath = "../icon";

export default class Home extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      infos: [],
      refreshing: false,
      scrollY : 0
    };
  }

  componentDidMount() {
     let datas =
      [{
         id: 0,
         imgUrl: 'http://d2ku7ggsvxaz7z.cloudfront.net/images/bam/3/MAI_180418427.jpg',
         title: '新聞',
         booking: true,
         cardType: "text",
         content: "俄羅斯總統普亭(Vladimir Putin)在周五(23日)的全國年度電視新聞訪問中，向白宮及民主黨人呼籲，面對美國總統當選人川普(Donald Trump)的勝利，不要當一個「病態的輸家」(sore losers)。似乎是回應美國對俄羅斯干預美國大選的指控。訪談中也提到了對核武發展的看法"
       },
       {
         id: 1,
         imgUrl: 'https://d2ku7ggsvxaz7z.cloudfront.net/images/bam/9/MAI_144434087.png',
         title: 'AI金融應用－保險',
         booking: false,
         cardType: "text",
         content: "kubernetes.io發佈了一個供本地端單機跑kubernetes最精簡的環境minikube，透過minikube可以很快速的使用與測試k8s的功能唷～"
       },
       {
         id: 2,
         imgUrl: 'https://d2ku7ggsvxaz7z.cloudfront.net/images/bam/3/MAI_180418427.jpg',
         title: '兩個小孩的托育費用就高達26500元',
         booking: true
       },
       {
         id: 3,
         imgUrl: 'https://d2ku7ggsvxaz7z.cloudfront.net/images/bam/9/MAI_144434087.png',
         title: '兩個小孩的托育費用就高達26500元',
         booking: false
       }];

     this.setState({ infos: datas});
  }

  _onRefresh() {
    this.setState({refreshing: true});

    this.setState({refreshing: false});
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

    buttonPress = (cardID) => {
      if(Platform.OS !== 'ios') {
          this.props.navigator.push({
            index: 1,
            info: this.state.infos[cardID],
          })
      } else {
          this.props.navigator.push({
            title: "",
            component: Detail,
            backButtonTitle: 'Back',
            passProps: {info: this.state.infos[cardID]},
          });
      }
    };

    bookingPress = (cardID) => {
      let m = this.state.infos;		
      m[cardID].booking = (m[cardID].booking)?false: true;
      this.setState({info : m})
    }

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

        var datas = {
         id: id,
         imgUrl: 'https://d2ku7ggsvxaz7z.cloudfront.net/images/bam/3/MAI_180418427.jpg',
         title: '兩個小孩的托育費用就高達26500元',
         booking: true
        };

        let d = this.state.infos.push(datas);
        
        this.setState({ infos: this.state.infos});
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
      <View style={styles.viewBody}>
        <ScrollView 
          onScroll={(event: Object) => loadData(event)}
          ref={(scrollView) => { _scrollView = scrollView; }}
          onContentSizeChange={(w, h) => this.contentHeight = h}
          onLayout={ev => this.scrollViewHeight = ev.nativeEvent.layout.height}
          refreshControl={
            <RefreshControl
              progressViewOffset = {10}
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh.bind(this)}
          />}
          >
          {this.state.infos.map(function(d) { 
            return <Card 
                         ref={(card) => {_card = card;} }
                         key={d.id}
                         booking={d.booking}
                         cardType={d.cardType}
                         content={d.content}
                         imgUrl={d.imgUrl} 
                         title={d.title} 
                         onBookingPress={this.bookingPress.bind(this, d.id)}
                         onPress={this.buttonPress.bind(this, d.id)}/>;
          })}
        </ScrollView>
      </View>
    );
  }
}

var toolbarActions = [
  {title: 'Chat', icon: require('../icon/ic_message_black/ic_message_black.png') ,show: 'always'},
];

const styles = StyleSheet.create({
  viewBody: {
    backgroundColor: '#FFFFFF',
  },
  toolbar: {
    backgroundColor: 'dodgerblue',
    opacity: .7,
    borderBottomWidth: 5,
    borderColor: "cadetblue" ,
    height: 50,
    marginBottom: 20
  },
});
