import React, {Component} from "react";
import {Animated, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

class TypeChoice extends Component{
    constructor(props) {
        super(props);

        this.state = {
            currentType : this.props.settings[0].type,
            isSwiped : false,
            swipeType : new Animated.Value(900)
        }

        this.onChangeType = this.onChangeType.bind(this)
    }

    onChangeType() {
        this.setState({isSwiped : !this.state.isSwiped})
        Animated.timing(this.state.swipeType  ,{
            toValue : this.state.isSwiped ? 900 : 300,
            duration : 1000,
            useNativeDriver: true
        }).start();
    }

    render() {
        return(
            <View style={styles.container}>
                <View style={styles.button}>
                    <Text style={styles.room}>  Аудитория : {this.state.currentRoom}</Text>
                    <TouchableOpacity
                        style={styles.change}
                        onPress={this.onChangeType}>
                        <Text style={styles.text}>Изменить</Text>
                    </TouchableOpacity>
                </View>
                <Animated.View style={[
                    styles.display__room, {
                        transform : [{translateY : this.state.swipeType}]
                    }
                ]}>
                    <View style={styles.display__room}>
                        <View style={styles.room__wrapper}>
                            {
                                this.props.item_types.map(type=>{
                                    return<TouchableOpacity
                                        style={styles.room__items}
                                        // onPress={()=>this.onPressRoom(type.name, type.id)}
                                    >
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

export default TypeChoice;


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