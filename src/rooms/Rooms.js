import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity, Text, Button, View} from 'react-native';

export default class Rooms extends Component {
    constructor(props) {
        super(props);
        this.test = this.test.bind(this)
    }

    test(name) {
        console.log(name)
    }

    render() {
        return(
            <TouchableOpacity
                onPress={()=>this.test(this.props.id)}
                style={styles.container}
            >
                <Text style={styles.text} >{this.props.name}</Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container : {
      backgroundColor : '#36454F',
      padding : 27,
      marginTop : 10,
      borderRadius : 10
    },
    button : {
        width : '100%',
        height : '100%',
        padding : 10,
    },
    text : {
       fontSize : 19,
       fontWeight : 'bold',
       color : 'white'
    }
})