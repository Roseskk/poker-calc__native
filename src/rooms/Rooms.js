import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity, Text, Button, View} from 'react-native';
import {connect} from "react-redux";

 class Rooms extends Component {
    constructor(props) {
        super(props);
        this.state = { isActiveRoom : true }
    }

    render() {
        return(
            <TouchableOpacity
                onPress={()=>this.props.showItems(this.props.id, this.props.name)}
                style={styles.container}
            >
                <Text style={styles.text} >{this.props.name}</Text>
            </TouchableOpacity>
        )
    }
}

// const mapStateToProps = (state) => {
//
//     return state
// }
//
// export default connect(mapStateToProps,null)(Rooms)
export default Rooms

const styles = StyleSheet.create({
    container : {
      backgroundColor : '#36454F',
      padding : 27,
      marginTop : 10,
      borderRadius : 10
    },
    button : {
        width : '100%',
        height : '100%',
        padding : 10,
    },
    text : {
       fontSize : 19,
       fontWeight : 'bold',
       color : 'white'
    }
})