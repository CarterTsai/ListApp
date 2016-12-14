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
  ToolbarAndroid
} from 'react-native';

var {height, width} = Dimensions.get('window');

export default class listApp extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      images: []
    };
  }

  componentDidMount() {
     this.setState({
       images:[{
         id: 1,
         url: 'http://d2ku7ggsvxaz7z.cloudfront.net/images/bam/3/MAI_180418427.jpg',
         title: '兩個小孩的托育費用就高達26500元'
       },
       {
         id: 2,
         url: 'http://d2ku7ggsvxaz7z.cloudfront.net/images/bam/9/MAI_144434087.png',
         title: '兩個小孩的托育費用就高達26500元'
       },
       {
         id: 3,
         url: 'http://d2ku7ggsvxaz7z.cloudfront.net/images/bam/3/MAI_180418427.jpg',
         title: '兩個小孩的托育費用就高達26500元'
       },
       {
         id: 4,
         url: 'http://d2ku7ggsvxaz7z.cloudfront.net/images/bam/9/MAI_144434087.png',
         title: '兩個小孩的托育費用就高達26500元'
       },
       ]
    });
  }

  _buttonPress() {
    Alert.alert(
      'Alert Title',
      'My Alert Msg',
      [
        {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]
    )
  }

  render() {
    return (
      <ScrollView>
        <ToolbarAndroid title="Hello" />
        {this.state.images.map(function(img) {
          return <Card key={img.id} url={img.url} title={img.title} onPress={() => this._buttonPress.bind(this)}/>;
        })}
        
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({

});

AppRegistry.registerComponent('listApp', () => listApp);
