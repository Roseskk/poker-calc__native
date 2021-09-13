import React, {Component} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import Rooms from "./src/rooms/Rooms";
import RoomItem from "./src/roomitems/RoomItem";
import FooterMenu from "./src/footer-menu/footer-menu";

import {_URL} from "./config.api";

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {room : [], items : [], currentRoom: '', isShowRoom : true , isShowItem : false}
        this.showItems = this.showItems.bind(this);
    }

    componentDidMount() {
        fetch(_URL + 'rooms')
            .then(response => response.json())
            .then(data => {
                this.setState({room : data})
            })
    }

    showItems(id, name) {
        this.setState({currentRoom : name})
        this.setState({ isShowRoom : false })
        this.setState({isShowItem : true })
            fetch(_URL + `roomitems/${id}`)
                .then(response => response.json())
                .then(data=>{

                    this.setState({items : data})
                    // console.log(this.state.items)
                })
    }

    render() {
    return (
        <View style={styles.container}>
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
                    ?<View style={styles.roomItem}><RoomItem name={this.state.currentRoom} items={this.state.items} /></View>
                : null
            }
            <View style={styles.footer}>
                {/*<FooterMenu  />*/}
            </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'flex-start'
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
    width : '100%',
    height: '100%',
    paddingBottom : 100,
    padding : 15,
    paddingTop: 20
  }  ,
  footer: {
      width : '100%',
      marginTop : 5
  }
});
