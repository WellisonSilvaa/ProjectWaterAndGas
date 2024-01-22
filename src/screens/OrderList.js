import React, { Component, useState, useEffect} from "react";
import { View, Text, ImageBackground, StyleSheet } from "react-native";

// Importação do moment para DATA e HORA
import moment from "moment";
import 'moment/locale/pt-br'

import Requests from "../components/Requests";
import commonStyles from "../commonStyles";
import month from '../../assets/imgs/month.jpg'

export default class OrderList extends Component {
    render() {

        // Constante com a data atual //
        const today = moment().locale('pt-br ').format('ddd, D [de] MMMM', )

        return (
            <View style={styles.container}>
                <ImageBackground 
                    source={month}
                    style={styles.background}    
                >
                    <View style={styles.titleBar}>
                        <Text style={styles.title}>Hoje</Text>
                        <Text style={styles.subtitle}>{today}</Text>
                    </View>
                </ImageBackground>
                <View style={styles.orderList}>
                    <Requests
                        client="Wellison"
                        product="Galão 20L"
                        quantity="2"
                        orderTime={new Date()}
                        formPayment="Dinheiro"
                        customerAddress="Av. Nossa senhora de Lourdes, 537"
                        doneAt={new Date()}
                    />
                    <Requests
                        client="Laura"
                        product="Gás"
                        quantity="1"
                        orderTime={new Date()}
                        formPayment="Cartão Crédito"
                        customerAddress="Av. Nossa senhora de Lourdes, 537"
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    background: {
        flex: 3
    },
    orderList: {
        flex: 7
    },
    titleBar: {
        flex: 1,
        justifyContent: "flex-end"
    },
    title: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.secondary,
        fontSize: 50,
        marginLeft: 20,
        marginBottom: 20
    },
    subtitle: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.secondary,
        fontSize: 20,
        marginLeft: 20,
        marginBottom: 20
    }

})