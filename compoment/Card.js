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
  Button
} = ReactNative;

var {height, width} = Dimensions.get('window');

type Props = {
  title: string;
  url: string;
  booking: boolean;
  onPress: () => mixed;
};

class Card extends React.Component { 
  props: Props;

  constructor(props) {
    super(props);
    this.state = {
      imageUrl: (props.booking) ? 
                require('../icon/ic_bookmark/ic_bookmark_black.png') :
                require('../icon/ic_bookmark/ic_bookmark_border_back.png') 
    }
  }

  componentWillReceiveProps(nextProps) {
    let im = (nextProps.booking) ? 
                require('../icon/ic_bookmark/ic_bookmark_black.png') :
                require('../icon/ic_bookmark/ic_bookmark_border_back.png') 
    this.setState({imageUrl: im});
  }

  render() {
    return (<View style={styles.card}>
            <TouchableHighlight onPress={() => console.log("hello")}>
              <Image source={{uri: this.props.url}}
                      style={styles.cardImage} />
            </ TouchableHighlight>
            <View style={styles.cardBar}>
              <TouchableHighlight style={styles.cardBookmarkOutLine}
                                  underlayColor = {'gainsboro'} 
                                  onPress={this.props.onPress}>
                <Image
                  style={styles.cardBookmark}
                  source={this.state.imageUrl}
                />
              </ TouchableHighlight>
            </View>
            <Text style={styles.cardTitle}>{this.props.title}</Text>
            
          </View>);
  }
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    flexDirection: 'column',
    // justifyContent: 'center',
    // alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
    paddingHorizontal:0
  },
  cardImage: {
    width: width * 1,
    height: width * 0.9,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    marginTop: 15
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