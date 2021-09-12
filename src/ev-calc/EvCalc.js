import React, {Component} from 'react';
import { StyleSheet, TouchableOpacity, Text, View} from 'react-native';

export default class EvCalc extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity
                    style={styles.button}
                >
                    <Text style={styles.text}>Select  cards</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                >
                    <Text style={styles.text}>Select  cards</Text>
                </TouchableOpacity>
            </View>
        );
    };
}

const styles= StyleSheet.create({
    container : {
        width: '100%',
    },
    button : {
        width: '100%',
        padding : 20,
        marginBottom : 2,
        borderBottomColor: '#000',
        backgroundColor: '#353839',
    },
    text : {
        fontFamily : 'Cochin',
        fontWeight : 'bold',
        fontSize : 40,
        color : 'white',
        textAlign : 'center'
    }
})