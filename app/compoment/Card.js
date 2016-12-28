const React = require('react');
const ReactNative = require('react-native');
const {
  Image,
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableHighlight,
  Alert,
  Button,
  Platform
} = ReactNative;

var {height, width} = Dimensions.get('window');
const iconPath = "../icon";

type Props = {
  title: string;
  url: string;
  booking: boolean;
  cardType: string,
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

  componentWillReceiveProps(nextProps) {
    let im = (nextProps.booking) ? 
                require('../icon/ic_bookmark/ic_bookmark_black.png') :
                require('../icon/ic_bookmark/ic_bookmark_border_back.png') 
    this.setState({bookingimagePath: im});
  }

  renderContent() {
    if(this.props.cardType != "text") {
     return  <Image source={{uri: this.props.url}}
                      style={styles.cardImage} />
    } else {
        let content = this.props.content;
        if(content.length > 100) {
          content = content.slice(0, 200) + " . . . .";
        }
        return <Text style={styles.cardText}>     {content}</Text>
    }
  }

  render() {
    return (<View style={styles.card}>
              <TouchableHighlight activeOpacity={100} underlayColor='paleturquoise' onPress={this.props.onPress}>
                {this.renderContent()}
              </ TouchableHighlight>
              <View style={styles.cardBar}>
                <TouchableHighlight style={styles.cardBookmarkOutLine}
                                    underlayColor = {'gainsboro'} 
                                    onPress={this.props.onPress}>
                      <Image
                        style={styles.cardBookmark}
                        source={this.state.bookingimagePath}
                      />
                </ TouchableHighlight>
              </View>
              <Text style={styles.cardTitle}>{this.props.title}</Text>
          </View>);
  }
};

var imgWidth =  (width * 0.95);
var offsetWidth = (width - imgWidth) / 2;

const styles = StyleSheet.create({
  card: {
    flex: 1,
    flexDirection: 'column',
    top: (Platform.OS === 'ios') ? 10 : 70,
    marginTop: 5,
    marginBottom: 20,
    paddingHorizontal:0,
    backgroundColor: 'white',
  },
  cardImage: {
    width: width * 0.95 ,
    height: width * 0.9,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    marginLeft: offsetWidth,
    marginRight: offsetWidth,
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
    marginTop: 15,
  },
  cardBookmarkOutLine: {
    borderRadius: 5
  },
  cardBookmark: {
    width: 32,
    height: 32,
    tintColor: '#757575',
  },
  cardBar: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 10
  }
});

module.exports = Card;