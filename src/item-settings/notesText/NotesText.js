import React, {Component} from 'react';
import {Animated, ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';

class NotesText extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentText : ''
        }

        this.notesChange = this.notesChange.bind(this);
    }

    notesChange(text) {
        console.log(text)
        this.props.noteWrite(text)
        this.setState({currentText : text})
    }

    render() {
        return(
            <View style={styles.container}>
                <TextInput
                    multiline={true}
                    numberOfLines={4}
                    onChangeText={this.notesChange}
                    style={styles.input}
                    placeholder= 'Примечание'
                    value={this.state.currentText}
                />
            </View>
        )
    }
}

export default NotesText;


const styles = StyleSheet.create({
    container : {
        display : 'flex',
        flexDirection : 'column',
        width : '90%',
        height : '100%',
        paddingLeft : 35,
        marginTop : 10,

    },
    input : {
        display: 'flex',
        alignItems : 'center',
        borderRadius : 10,
        width: '100%',
        borderWidth : 1,
        padding : 20,
        fontSize : 25,
        fontWeight : 'bold',
    }
})