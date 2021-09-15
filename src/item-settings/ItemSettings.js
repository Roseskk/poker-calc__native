import React, {Component} from 'react';
import {Animated, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';

import {_URL} from "../../config.api";

export default class ItemSettings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentType : this.props.settings[0].type,
            currentRoom : this.props.settings[0].room,
            currentRoomId : '',
            isSwiped : false,
            swipeRoom : new Animated.Value(900),
            swipeType : new Animated.Value(900)
        }

        this.onChangeRoom = this.onChangeRoom.bind(this);
        this.onPressRoom = this.onPressRoom.bind(this);
        this.onChangeType = this.onChangeType.bind(this);
    }

    componentDidMount() {

    }
    onChangeRoom() {
        this.setState({isSwiped : !this.state.isSwiped})
        Animated.timing(this.state.swipeRoom  ,{
            toValue : this.state.isSwiped ? 900 : 200,
            duration : 1000,
            useNativeDriver: true
        }).start();
    }
    onChangeType() {
        this.setState({isSwiped : !this.state.isSwiped})
        Animated.timing(this.state.swipeType  ,{
            toValue : this.state.isSwiped ? 900 : 400,
            duration : 1000,
            useNativeDriver: true
        }).start();
    }
    onPressRoom(name,id) {
        this.setState({ currentRoom : name, currentRoomId : id });
        this.onChangeRoom();
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
                <View style={styles.button}>
                    <Text style={styles.room}>  Тип : {this.state.currentType}</Text>
                    <TouchableOpacity
                        style={styles.change}
                        onPress={this.onChangeType}>
                        <Text style={styles.text}>Изменить</Text>
                    </TouchableOpacity>
                </View>
                <Animated.View style={[
                    styles.display__room, {
                        transform : [{translateY : this.state.swipeRoom}]
                    }
                ]}>
                    <View style={styles.display__room}>
                        <Text style= {styles.title}>Выбрать аудиторию</Text>
                        <View style={styles.room__wrapper}>
                        {
                            this.props.room.map(room=>{
                                return<TouchableOpacity
                                    style={styles.room__items}
                                    onPress={()=>this.onPressRoom(room.name, room.id)}
                                >
                                    <Text style={styles.room__text}>{room.name}</Text>
                                </TouchableOpacity>

                            })
                        }
                        </View>
                </View>
                </Animated.View>
                <Animated.View style={[
                    styles.display__type, {
                        transform : [{translateY : this.state.swipeType}]
                    }
                ]}>
                    <View style={styles.display__type}>
                        <Text style= {styles.title}>Выбрать аудиторию</Text>
                        <View style={styles.room__wrapper}>
                            {
                                this.props.item_types.map(type=>{
                                    return<TouchableOpacity
                                        style={styles.room__items}
                                        // onPress={()=>this.onPressRoom(room.name, room.id)} // Добавить событие onPress
                                    >
                                        {/*<p>ОПТИМИЗИРОВАТЬ ЭТО ГОВНО</p>*/ }
                                        <Text style={styles.room__text}>{type.name}</Text>
                                    </TouchableOpacity>

                                })
                            }
                        </View>
                    </View>
                </Animated.View>
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
    display__type : {
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
        alignItems : 'center',
        justifyContent: 'center',
        width : '100%',
        opacity: 1,
    },

})