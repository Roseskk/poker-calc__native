import React, {Component} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import Rooms from "./src/rooms/Rooms";
import FooterMenu from "./src/footer-menu/footer-menu";

import {_URL} from "./config.api";

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {room : []}
    }

    componentDidMount() {
        const url = 'https://mtb.ibnd.ru/api/rooms'
        fetch(_URL + 'rooms')
            .then(response => response.json())
            .then(data => {
                this.setState({room : data})
            })
    }

    render() {
    return (
        <View style={styles.container}>
          <View style={styles.header}></View>
            <ScrollView style={styles.rooms}>
                {
                    this.state.room.map(api=>{
                        return <Rooms key={api.id} id={api.id} name={api.name} />
                    })
                }
            </ScrollView>
            <View style={styles.footer}>
                <FooterMenu  />
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
  footer: {
      width : '100%',
      marginTop : 5
  }
});
