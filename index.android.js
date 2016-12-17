/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import Card from './compoment/Card'

import {
  AppRegistry,
  StyleSheet,
  Text,
  ScrollView,
  Image,
  Dimensions,
  View,
  ToolbarAndroid,
  Alert,
  RefreshControl,
} from 'react-native';

var {height, width} = Dimensions.get('window');
var nativeImageSource = require('nativeImageSource');
var NativeMethodsMixin = require('NativeMethodsMixin');

export default class listApp extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      images: [],
      refreshing: false,
      scrollY : 0
    };
  }

  componentDidMount() {
     let datas =
      [{
         id: 0,
         url: 'http://d2ku7ggsvxaz7z.cloudfront.net/images/bam/3/MAI_180418427.jpg',
         title: '兩個小孩的托育費用就高達26500元',
         booking: true
       },
       {
         id: 1,
         url: 'http://d2ku7ggsvxaz7z.cloudfront.net/images/bam/9/MAI_144434087.png',
         title: 'AI金融應用－保險',
         booking: false
       },
       {
         id: 2,
         url: 'http://d2ku7ggsvxaz7z.cloudfront.net/images/bam/3/MAI_180418427.jpg',
         title: '兩個小孩的托育費用就高達26500元',
         booking: true
       },
       {
         id: 3,
         url: 'http://d2ku7ggsvxaz7z.cloudfront.net/images/bam/9/MAI_144434087.png',
         title: '兩個小孩的托育費用就高達26500元',
         booking: false
       }];

     this.setState({ images: datas});
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

    buttonPress = (imgId) => {
      let m = this.state.images;
      m[imgId].booking = (m[imgId].booking)?false: true;
      this.setState({images : m})
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
        
        let id = this.state.images.length;

        var datas = {
         id: id,
         url: 'http://d2ku7ggsvxaz7z.cloudfront.net/images/bam/3/MAI_180418427.jpg',
         title: '兩個小孩的托育費用就高達26500元',
         booking: true
        };

        let d = this.state.images.push(datas);
        
        this.setState({ images: this.state.images});
        console.log(this.state.images);
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
      <View>
        <ToolbarAndroid actions={toolbarActions}
                        // logo={require('./icon/ic_message_black/ic_message_black.png')} 
                        title="ILook" 
                        style={styles.toolbar}
                        onActionSelected={onActionSelected}
                        />
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
          {this.state.images.map(function(img) { 
            return <Card 
                         ref={(card) => {_card = card;} }
                         key={img.id}
                         booking={img.booking} 
                         url={img.url} 
                         title={img.title} 
                         onPress={this.buttonPress.bind(this, img.id)}/>;
          })}
        </ScrollView>
      </View>
    );
  }
}

var toolbarActions = [
  {title: 'Chat', icon: require('./icon/ic_message_black/ic_message_black.png') ,show: 'always'},
];

const styles = StyleSheet.create({
  toolbar: {
    backgroundColor: '#ffffff',
    height: 50
  },
});

AppRegistry.registerComponent('listApp', () => listApp);
