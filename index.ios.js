/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import Home from "./app/page/Home";
import Detail from "./app/page/Detail";
import Colors from "./app/common/Color";

import {
  AppRegistry,
  StyleSheet,
  View,
  NavigatorIOS,
} from 'react-native';

export default class listApp extends Component {
  
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    
  }
  
  render() {
    const routes = [
      {component: Home, title: 'iLook', index: 0},
      {component: Home, title: 'Second Scene', index: 1},
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
        <NavigatorIOS
            initialRoute={routes[0]}
            style={{flex: 1}}
            titleTextColor={Colors.Bar.Title}
            barTintColor={Colors.Bar.Background}
            tintColor={Colors.Bar.Botton}
            initialRouteStack={routes}
            interactivePopGestureEnabled={true}
            />
    );
  }
}

AppRegistry.registerComponent('listApp', () => listApp);
