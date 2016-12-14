const React = require('react');
const ReactNative = require('react-native');
const {
  Image,
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableHighlight,
  Alert
} = ReactNative;

var {height, width} = Dimensions.get('window');

const Card = (props) => {   
  return (<View style={styles.card}>
          <TouchableHighlight onPress={() => console.log("hello")}>
            <Image source={{uri: props.url}}
                    style={styles.cardImage} />
          </ TouchableHighlight>
          <Text style={styles.cardTitle}>{props.title}</Text>
        </View>);
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20
  },
  cardImage: {
    width: width * 1,
    height: width * 0.9,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    marginTop: 15
  }
});

module.exports = Card;