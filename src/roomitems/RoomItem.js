import React, {Component} from 'react';
import {Animated, StyleSheet, TouchableOpacity, Text, Button, View, ScrollView} from 'react-native';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';


export default class RoomItem extends Component {
    constructor(props) {
        super(props);
        this.state = {headers : ['Номер','Тип','Примечания'], roomItems : []}


    }
    componentDidMount() {

    }

    // itemSettings(id) {
    //     Animated.timing(this.state.swipe,{
    //         toValue : 200,
    //         duration : 2000
    //     }).start()
    // }

    render() {
        return(
            <ScrollView style={styles.container}>
                <Text style={styles.title}>Таблица {this.props.name}</Text>
                <Table borderStyle={{borderWidth: 2, borderColor: '#c8e1ff'}} >
                    <Row data={this.state.headers} style={styles.head} textStyle={styles.text}/>
                    {
                        this.props.items.map(item=>{
                            return <TouchableOpacity key={item.id} onPress={()=>this.props.itemSettings(item.inventory_id)}  style={styles.rows}>
                             <Row  data={[ [item.inventory_id], [item.type], [item.notes]]} style={styles.head}  textStyle={styles.text}/>
                            </TouchableOpacity>
                        })
                    }
                </Table>
            </ScrollView>
        )
    }
}
const styles = StyleSheet.create({
    container: { width : '100%', flex: 1, backgroundColor: '#fff'},
    title : {textAlign : 'center' , fontWeight : 'bold', fontSize : 20, marginBottom: 20},
    head: { height: 40 },
    text: { margin: 6 },
    rows : { marginTop : 3, backgroundColor : 'lightblue' }
});