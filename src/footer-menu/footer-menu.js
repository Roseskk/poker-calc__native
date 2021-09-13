import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default class FooterMenu extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <View style={styles.footer__menu}>
                <Text>Bottom menu!</Text>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    footer__menu : {
        position : 'relative',
        bottom : 0,
        height: 75,
        width: '100%',
        backgroundColor: '#36454F',

    }
})