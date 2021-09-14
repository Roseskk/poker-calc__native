import React, {Component} from 'react';
import {ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';

import {_URL} from "../../config.api";

export default class ItemSettings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentRoom : this.props.settings[0].room
        }

        this.onChangeRoom = this.onChangeRoom.bind(this);
    }

    componentDidMount() {

    }
    onChangeRoom() {

    }

    render() {
        return(
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    editable={false}
                    selectTextOnFocus={false}
                    value={this.props.settings[0].inventory_id}
                />
                <View style={styles.button}>
                    <Text style={styles.room}>  Аудитория : {this.state.currentRoom}</Text>
                    <TouchableOpacity
                        style={styles.change}
                        onPress={this.onChangeRoom}>
                        <Text style={styles.text}>Изменить</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.display__room}>
                    <Text style= {styles.title}>Аудитории</Text>
                    <View style={styles.room__wrapper}>
                    {
                        this.props.room.map(room=>{
                            return<TouchableOpacity style={styles.room__items}>
                                <Text style={styles.room__text}>{room.name}</Text>
                            </TouchableOpacity>

                        })
                    }
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container : {
        display : 'flex',
        flexDirection : 'column',
        width : '100%',
        height : '100%',
        marginTop : 50,
        // backgroundColor : 'red'
    },
    input : {
        padding : 15,

        borderWidth: 1,
        borderRadius : 10,

        fontSize : 25,
        fontWeight : 'bold',
        textAlign: 'center'
    },
    button : {
        display: 'flex',
        justifyContent : 'space-between',
        flexDirection: 'row',
        alignItems : 'center',
        marginTop: 20,


        borderWidth: 1,
        borderRadius : 10,

        fontSize : 25,
        fontWeight : 'bold',
        textAlign: 'center'
    },
    change : {
        width: '50%',
        backgroundColor : 'black',
        padding: 20,
        borderRadius : 10,
        borderTopLeftRadius : 0,
        borderBottomLeftRadius : 0,
        alignItems: 'flex-end',
    },
    room : {
        fontSize : 17,
        fontWeight : '300',
        fontStyle : 'italic'
    },
    text : {
        color : 'white',
        fontSize : 17,
        fontWeight : '300',
        fontStyle : 'italic'
    },
    title : {
        color : 'white',
        fontSize : 27,
        fontWeight : '300',
        fontStyle : 'italic',
        textAlign : 'center'
    },
    room__text : {
        color : 'white',
        fontSize : 17,
        fontWeight : '300',
        fontStyle : 'italic',
    },
    room__items : {
      backgroundColor : 'gray',
      borderWidth : 1,
      padding : 10,
      margin : 10,
    },
    display__room : {
        position : 'absolute',


        width : '100%',
        height: '100%',

        backgroundColor : 'black',
        borderRadius : 10
    },
    room__wrapper : {
        marginTop : 40,
        display : 'flex',
        flexDirection : 'row',
        flexWrap : 'wrap',
        width : '100%',
        opacity: 1,
    },

})