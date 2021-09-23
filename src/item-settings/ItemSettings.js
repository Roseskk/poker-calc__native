import React, {Component} from 'react';
import {Animated, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';

import RoomChoice from "./roomChoice/RoomChoice";
import TypeChoice from "./typeChoice/TypeCoice";
import NotesText from "./notesText/NotesText";

export default class ItemSettings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentType : this.props.settings[0].type,
            currentRoom : this.props.settings[0].room,
            currentRoomId : this.props.settings[0].room_id,
            currentTypeId : this.props.settings[0].item_type_id,
            currentNote : ' ',
            isSwiped : false,
            swipeRoom : new Animated.Value(900),
            swipeType : new Animated.Value(900)
        }

        this.onChangeRoom = this.onChangeRoom.bind(this);
        this.onChangeType = this.onChangeType.bind(this);
        this.onReadType = this.onReadType.bind(this);
        this.onReadRoom = this.onReadRoom.bind(this);
        this.onWriteNote = this.onWriteNote.bind(this);
        this.onSubmitItem = this.onSubmitItem.bind(this);
    }

    componentDidMount() {

    }
    onReadType(id) {
       this.setState({currentRoomId : id})
    }
    onReadRoom(id) {
        this.setState({currentTypeId : id})
    }
    onWriteNote(note) {
        this.setState({currentNote : note})
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
     onSubmitItem() {
        let payload = JSON.stringify({
            inventory_id : this.props.settings[0].inventory_id,
            room_id:this.state.currentTypeId,
            item_type_id:this.state.currentRoomId,
            notes: this.state.currentNote
        })
         fetch('https://mtb.ibnd.ru/api/updateitem',{
             method:"POST",
             headers: {
                 'Content-Type': 'application/json'
             },

             body : payload
        })
            .then(next=>{
                // this.setState({room_id: '' , item_type_id : ''})
                this.props.submited(this.props.settings[0].inventory_id)
            })
    }


    render() {
        return(
            <View style={styles.container}>
                <View>
                    <TouchableOpacity
                    style={styles.linkback}
                    onPress={()=>this.props.linkBack(this.props.settings[0].inventory_id)}
                    >
                        <Text style={styles.text}>Назад</Text>
                    </TouchableOpacity>
                </View>
                <TextInput
                    style={styles.input}
                    editable={false}
                    selectTextOnFocus={false}
                    value={this.props.settings[0].inventory_id}
                />
                <RoomChoice  settings={this.props.settings} readID={this.onReadRoom} room={this.props.room} />
                <TypeChoice  settings={this.props.settings} readId={this.onReadType} item_types={this.props.item_types} />
                {/*<NotesText noteWrite={this.onWriteNote} />*/}
                <View style={styles.button__submit}>
                    <TouchableOpacity
                        style={styles.change}
                        onPress={this.onSubmitItem}
                        >
                        <Text style={styles.text}>Отправить</Text>
                    </TouchableOpacity>
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
        marginTop : 1,
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
    button__submit : {
        marginTop :10
    },
    linkback : {
        width: '50%',
        backgroundColor : 'black',
        borderRadius : 10,
        borderTopLeftRadius : 0,
        borderBottomLeftRadius : 0,
        borderWidth : 1,
        padding: 5,
        marginBottom : 5,
        alignItems : 'center'

    }
})