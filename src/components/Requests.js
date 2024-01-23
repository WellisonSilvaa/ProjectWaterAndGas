import React from "react";
import { View, Text, StyleSheet } from "react-native";

import commonStyles from "../commonStyles";
import Icon from 'react-native-vector-icons/FontAwesome'

import moment from "moment";
import 'moment/locale/pt-br'


export default props => {

    const doneOrNotStyle = props.doneAt != null
        ? {
           backgroundColor: '#c7e6fd' 
        }
        : { }

        const formatteDate = moment(props.orderTime).locale('pt-br').format('llll')

    return (
        <View style={[styles.container, doneOrNotStyle]}>
            <View style={styles.checkContainer}>
                {getCheckView(props.doneAt)}
            </View>
            <View>
                <Text>{props.client}</Text>
                <Text>{props.quantity} {props.product}</Text>
                <Text>{formatteDate}</Text>
                <Text>{props.formPayment}</Text>
                <Text>{props.customerAddress}</Text>
            </View>
        </View>
    )
}

function getCheckView(doneAt) {
    if(doneAt != null) {
        return (
            <View style={styles.done}>
                <Icon
                    name="check"
                    size={20}
                    color='#FFF'
                >
                </Icon>
            </View>
        )
    }else {
        return (
            <View style={styles.pending}>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        borderColor: '#AAA',
        borderBottomWidth: 1,
        paddingVertical: 20,
        alignItems: 'center',
    },
    checkContainer: {
        width: '20%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    pending: {
        height: 25,
        width: 25,
        borderRadius: 13,
        borderWidth: 1,
        borderColor: '#555'
    },
    done: {
        height: 25,
        width: 25,
        borderRadius: 13,
        backgroundColor: '#4D7031',
        justifyContent: "center",
        alignItems: "center" 
    },
    desc: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.mainText,
        fontSize: 15
    }
})