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
  TextInput,
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
      [
       {
         id: 0,
         imgUrl: 'https://mart.ibon.com.tw/mdz_file/item/07/02/06/1612/16120003563G_intr_l_1_161207165645.jpg',
         title: '【亞尼克菓子工房】十勝生乳捲-雙捲禮盒(原味&原味)',
         booking: false,
         cardType: "product",
         datas: {
           title: '【亞尼克菓子工房】十勝生乳捲-雙捲禮盒(原味&原味)',
           price: 209900000,
           content: `與您說明
                    亞尼克為提供您最新鮮的產品，全店商品為接單後請師傅生產製作，
                    最快為5~7個工作天後可配達，送達最佳藏鮮日為兩天（賞味期為到貨日隔天）

                    常見問題：已收到『出貨通知』但尚未收到訂購商品？

                    您好，訂單顯示通知已配送僅表示已交給由工廠排單製作，並非實際出貨日。
                    正確到貨日，會透過【簡訊】通知您，但因也有可能會因您所在的地點收訊不理想、手機簡訊儲存容量已滿、或手機門號本身預設拒收廣告簡訊功能等，而造成無法收到相關訊息。
                    故訂購後，若需查詢到貨日，也可洽服務專線：(02)8797-8993，提供收件人姓名、電話進行查詢，謝謝您 
                    雙捲禮盒內

                    十勝生乳捲為長度約12cm(長度約為一般常態單條裝生乳捲之三分之二長) `
         },
         content: `與您說明
亞尼克為提供您最新鮮的產品，全店商品為接單後請師傅生產製作，
最快為5~7個工作天後可配達，送達最佳藏鮮日為兩天（賞味期為到貨日隔天）

常見問題：已收到『出貨通知』但尚未收到訂購商品？

您好，訂單顯示通知已配送僅表示已交給由工廠排單製作，並非實際出貨日。
正確到貨日，會透過【簡訊】通知您，但因也有可能會因您所在的地點收訊不理想、手機簡訊儲存容量已滿、或手機門號本身預設拒收廣告簡訊功能等，而造成無法收到相關訊息。
故訂購後，若需查詢到貨日，也可洽服務專線：(02)8797-8993，提供收件人姓名、電話進行查詢，謝謝您 
雙捲禮盒內

十勝生乳捲為長度約12cm(長度約為一般常態單條裝生乳捲之三分之二長) `
       },
       {
         id: 1,
         imgUrl: 'http://d2ku7ggsvxaz7z.cloudfront.net/images/bam/3/MAI_180418427.jpg',
         title: '新聞',
         booking: true,
         cardType: "text",
         content: "俄羅斯總統普亭(Vladimir Putin)在周五(23日)的全國年度電視新聞訪問中，向白宮及民主黨人呼籲，面對美國總統當選人川普(Donald Trump)的勝利，不要當一個「病態的輸家」(sore losers)。似乎是回應美國對俄羅斯干預美國大選的指控。訪談中也提到了對核武發展的看法"
       },
       {
         id: 2,
         imgUrl: 'https://d2ku7ggsvxaz7z.cloudfront.net/images/bam/3/MAI_180418427.jpg',
         title: '兩個小孩的托育費用就高達26500元',
         cardType: "image",
         booking: true
       },
       {
         id: 3,
         imgUrl: 'https://d2ku7ggsvxaz7z.cloudfront.net/images/bam/9/MAI_144434087.png',
         title: '兩個小孩的托育費用就高達26500元',
         cardType: "image",
         booking: false
       }];

     this.setState({ infos: datas});
     this.setState({ filterText: ""});
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
            title: this.state.infos[cardID].title,
            component: Detail,
            backButtonTitle: 'Back',
            passProps: {info: this.state.infos[cardID]},
            interactivePopGestureEnabled:1,
            navigationBarHidden: 0,
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
         booking: true,
         cardType: "image",
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
           <TextInput
            style={styles.filterInput}
            onChangeText={(text) => this.setState({filterText: text})}
            value={this.state.filterText}
            placeholder="請輸入任何關鍵字"
            placeholderTextColor="#ccc"
            selectionColor="#fff"
            onFocus= {() => this.setState({filterText : ''})}
          />
          {this.state.infos.map(function(d) {
            return <Card
                         ref={(card) => {_card = card;} }
                         key={d.id}
                         booking={d.booking}
                         cardType={d.cardType}
                         content={d.content}
                         datas={d.datas}
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
    backgroundColor: '#E8EAF6',
  },
  filterInput: {
    borderRadius: 5,
    marginTop: 10,
    marginLeft: 6,
    marginRight: 6,
    height: 35, 
    borderColor: 'gray', 
    borderWidth : 1,
    borderTopWidth : 0,
    borderRightWidth : 0,
    borderBottomWidth : 1,
    borderLeftWidth : 1,
    padding: 8,
    backgroundColor: '#5C6BC0',
    color: "#fff"
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
