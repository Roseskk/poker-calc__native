import React, {Component} from 'react';
import {Animated, ScrollView, StyleSheet,TouchableOpacity, Text, View} from 'react-native';
import Rooms from "./src/rooms/Rooms";
import RoomItem from "./src/roomitems/RoomItem";
import FooterMenu from "./src/footer-menu/footer-menu";
import { Camera } from 'expo-camera';


import {_URL} from "./config.api";
import ItemSettings from "./src/item-settings/ItemSettings";
// import {createStore} from "redux";
// import {Provider} from "react-redux";
// import {rootReducer} from "./src/redux/rootReducer";

// const store = createStore(rootReducer)

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            room : [],
            items : [],
            item_types : [],
            currentRoom: '',
            currentItems: '',
            currentSettings : [],
            isShowRoom : true ,
            isShowItem : false ,
            isShowItemSettings : false,
            swipe : new Animated.Value(0),
            hide : new Animated.Value(1),
            settingsSwipe : new Animated.Value(-600),
            permission : '',
        }

        this.showItems = this.showItems.bind(this);
        this.itemSettings = this.itemSettings.bind(this)
        this.savedForm = this.savedForm.bind(this)
        this.linkBack = this.linkBack.bind(this)
        this.roomsBack = this.roomsBack.bind(this)
    }

    componentDidMount() {
        (async () => {
            const { status } = await Camera.requestPermissionsAsync();
            this.setState({permission : status === 'granted'})
        })();
        fetch(_URL + 'rooms')
            .then(response => response.json())
            .then(data => {
                this.setState({room : data})
            })
        fetch(_URL + 'item_types')
            .then(response => response.json())
            .then(data => {
                this.setState({item_types : data})
            })
    }

    showItems(id, name) {
        this.setState({ currentRoom : name, isShowRoom : false, isShowItem : true, currentItems : id })
            fetch(_URL + `roomitems/${id}`)
                .then(response => response.json())
                .then(data=>{

                    this.setState({items : data})
                    // console.log(this.state.items)
                })
    }
    itemSettings(id) {
        let currentRoomitems = this.state.currentItems
        fetch(_URL + `item/${id}`)
            .then(response => response.json())
            .then(data => {
                this.setState({ isShowItemSettings : !this.state.isShowItemSettings, currentSettings : data });
            })
        fetch(_URL + `roomitems/${currentRoomitems}`)
            .then(response => response.json())
            .then(data=>{
                this.setState({items : data})
            })
        Animated.timing(this.state.swipe  ,{
            toValue : this.state.isShowItemSettings ? 0 : 700,
            duration : 250,
            useNativeDriver: true
        }).start();
        Animated.timing(this.state.settingsSwipe, {
            toValue : this.state.isShowItemSettings ? -600 : 0,
            duration: 250,
            useNativeDriver : true
        }).start();
        // Animated.timing(this.state.hide ,{
        //     toValue : 0,
        //     duration : 200,
        //     useNativeDriver: true
        // }).start();
        // console.log(id)
    }
    savedForm(id) {
        this.itemSettings(id)
    }
    linkBack(id) {
        this.itemSettings(id)
    }
    roomsBack() {
        this.setState({ isShowRoom : true })
        this.setState({isShowItem : false })
    }

    render() {
    return (
        // <Provider store={store}>
            <View style={styles.container}>
                <View style={styles.body}>
                {/*<Camera style={styles.camera} >*/}

                {/*</Camera>*/}
                  <View style={styles.header}></View>
                    {
                        this.state.isShowRoom
                        ? <ScrollView style={styles.rooms}>
                            {
                                this.state.room.map(api=>{
                                    return <Rooms key={api.id} showItems={this.showItems} bool={this.state.isShowRoom} id={api.id} name={api.name} />
                                })
                            }
                        </ScrollView>
                        : null
                    }
                    {
                        this.state.isShowItem
                            ?<Animated.View style={[
                                styles.roomItem,{
                                transform : [{translateX : this.state.swipe}],
                                opacity : this.state.hide
                                }
                            ]}>
                                <View style={styles.roomItem}>
                                    <RoomItem linkBack={this.roomsBack} itemSettings={this.itemSettings} name={this.state.currentRoom} items={this.state.items} />
                                </View>
                            </Animated.View>
                        : null
                    }
                    {
                        this.state.isShowItemSettings
                            ? <Animated.View style={[
                                styles.itemSettings,{
                                transform: [{translateX: this.state.settingsSwipe}]
                                }
                            ]}>
                                <View style={styles.itemSettings}><ItemSettings linkBack={this.linkBack} submited={this.savedForm} room={this.state.room} item_types={this.state.item_types} settings={ this.state.currentSettings } /></View>
                              </Animated.View>
                            : null
                    }
                </View>
                <View style={styles.footer}>
                    <FooterMenu  />
                </View>
            </View>
        // </Provider>
    );
  }
}

export default  App;

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'flex-start',
  },
  body : {
      width : '100%',
      marginBottom : 160,
  },
  header : {
      height : 50,
      width : '100%',
      backgroundColor: '#36454F',
      zIndex: 10
  },
  rooms : {
     width : '100%',
     paddingTop : 2,
     paddingBottom : 150,
     paddingHorizontal : 20
  },
  roomItem : {
    display: 'flex',
    justifyContent : 'center',
    alignItems: 'center',
    width : '100%',
    height: '100%',
    paddingBottom : 100,
    padding : 10,
    paddingTop: 20,
  },
  itemSettings : {
    position : 'absolute',
    display: 'flex',
    justifyContent : 'center',
    alignItems: 'center',
    width : '100%',
    height : '100%',
    paddingBottom : 100,
    paddingTop: 5,
  },
  footer: {
      position: 'absolute',
      bottom : 0,
      width : '100%',

      height : 100
  },
    camera : {
      width : '100%',
        height: '100%'
    }
});
