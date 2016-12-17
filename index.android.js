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
  RefreshControl
} from 'react-native';

var {height, width} = Dimensions.get('window');
var nativeImageSource = require('nativeImageSource');

export default class listApp extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      images: [],
      refreshing: false,
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
    const routes = [
      { title: 'First Scene', index: 0},
      { title: 'Second Scene', index: 1},
    ];

    buttonPress = (imgId) =>  {
      let m = this.state.images;
      m[imgId].booking = (m[imgId].booking)?false: true;
      this.setState({images : m})
    };
    
    return (
      <View>
        <ToolbarAndroid actions={toolbarActions}
                        // logo={require('./icon/ic_message_black/ic_message_black.png')} 
                        title="ILook" 
                        style={styles.toolbar}/>
        <ScrollView 
          refreshControl={
            <RefreshControl
              progressViewOffset = {10}
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh.bind(this)}
          />}
          >
          {this.state.images.map(function(img) { 
            return <Card key={img.id}
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
  {title: 'Feedback', icon: require('./icon/ic_message_black/ic_message_black.png') ,show: 'always'},
];

const styles = StyleSheet.create({
  toolbar: {
    backgroundColor: '#ffffff',
    height: 50
  },
});

AppRegistry.registerComponent('listApp', () => listApp);
