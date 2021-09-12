import React, {Component} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import FooterMenu from "./src/footer-menu/footer-menu";
import EvCalc from "./src/ev-calc/EvCalc";

export default class App extends Component {
    constructor(props) {
        super(props);

    }
  render() {
    return (
        <View style={styles.container}>
          <View style={styles.header}></View>
            <EvCalc />
            <FooterMenu  />
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'flex-start'
  },
  header : {
      height : 50,
      width : '100%',
      backgroundColor: '#36454F',
      zIndex: 10
  },
  footer__menu : {
      position : 'absolute',
      bottom : 0,
      height: 75,
      width: '100%',
      backgroundColor: '#36454F',

  }
});
