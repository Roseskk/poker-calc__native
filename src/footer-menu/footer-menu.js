import React, {Component} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

export default class FooterMenu extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <View style={styles.footer__menu}>
                <TouchableOpacity
                style={styles.link}
                >
                    <Text style={styles.text}>Главная</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.link}
                >
                    <Text style={styles.text}>Камера</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.link}
                >
                    <Text style={styles.text}>Поиск</Text>
                </TouchableOpacity>

            </View>
        )
    }
}


const styles = StyleSheet.create({
    footer__menu : {
        position : 'relative',
        display : 'flex',
        flexDirection : 'row',
        justifyContent : 'space-between',
        alignItems : 'center',
        bottom : 0,
        height: 100,
        width: '100%',
        padding : 10,
        backgroundColor: '#36454F',
    },
    link : {
        width: '33%',
        height: '100%',
        alignItems: 'center',
        padding: 10,

    },
    text : {
        color : 'white',
        fontSize : 17,
        fontWeight : '300',
        fontStyle : 'italic'
    },
})