/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import Home from "./app/page/Home";

import {
  AppRegistry,
  StyleSheet,
  View,
  Navigator,
  Text,
} from 'react-native';

export default class listApp extends Component {
  
  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }
  
  render() {
    const routes = [
      {title: 'First Scene', index: 0},
      {title: 'Second Scene', index: 1},
    ];

    navigatorRenderScene = (route, navigator) => {
      _navigator = navigator;

      switch (route.index) {
        case 0:
          return (<Home navigator={navigator} title='首頁'></Home>);
        case 1:
          return (<Home navigator={navigator} title='首頁'></Home>);
      }
    }

    return (
        <Navigator
            initialRoute={routes[0]}
            style={{flex: 1}}
            initialRouteStack={routes}
            renderScene={navigatorRenderScene}
            navigationBar={
            <Navigator.NavigationBar
              navigationStyles={Navigator.NavigationBar.StylesIOS}
              routeMapper={{
                LeftButton: (route, navigator, index, navState) =>
                  { return (<Text></Text>); },
                RightButton: (route, navigator, index, navState) =>
                  { return (<Text></Text>); },
                Title: (route, navigator, index, navState) =>
                  { return (<Text style={{fontSize: 20, fontWeight: 'bold' ,color: "#000000"}}>iLook</Text>); },
              }}
              style={styles.navBar}
            />
          }
        />
    );
  }
}

var styles = StyleSheet.create({
    navBar: {
      backgroundColor: 'white',
      borderBottomColor: '#000000',
      borderBottomWidth: 1,
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      alignItems: 'center',
      backgroundColor: '#fff',
      borderBottomColor: '#eee',
      borderColor: 'transparent',
      borderWidth: 1,
      justifyContent: 'center',
      height: 62,
      flexDirection: 'row'
    }
});

AppRegistry.registerComponent('listApp', () => listApp);
