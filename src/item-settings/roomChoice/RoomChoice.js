import React, {Component} from 'react';
import {Animated, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

class RoomChoice extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentRoom : this.props.settings[0].room,
            currentRoomId : '',
            isSwiped : false,
            swipeRoom : new Animated.Value(900),
        }

        this.onChangeRoom = this.onChangeRoom.bind(this);
        this.onPressRoom = this.onPressRoom.bind(this);
    }

    onChangeRoom() {
        this.setState({isSwiped : !this.state.isSwiped})
        Animated.timing(this.state.swipeRoom  ,{
            toValue : this.state.isSwiped ? 900 : 250,
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
                <View style={styles.button}>
                    <Text style={styles.room}>  Аудитория : {this.state.currentRoom}</Text>
                    <TouchableOpacity
                        style={styles.change}
                        onPress={this.onChangeRoom}>
                        <Text style={styles.text}>Изменить</Text>
                    </TouchableOpacity>
                </View>
                <Animated.View style={[
                    styles.display__room, {
                        transform : [{translateY : this.state.swipeRoom}]
                    }
                ]}>
                    <View style={styles.display__room}>
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
            </View>

        )
    }
}

export default RoomChoice

const styles = StyleSheet.create({
    container : {
        display : 'flex',
        flexDirection : 'column',
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
    display__room : {
        position : 'absolute',


        width : '100%',
        height: '100%',

        borderRadius : 10
    },
    room__wrapper : {
        display : 'flex',
        flexDirection : 'row',
        flexWrap : 'wrap',
        alignItems : 'center',
        justifyContent: 'center',
        backgroundColor : 'black',
        padding : 20,
        height: 500,
        opacity: 1,
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
    title : {
        color : 'white',
        fontSize : 27,
        fontWeight : '300',
        fontStyle : 'italic',
        textAlign : 'center'
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
})