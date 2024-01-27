import React, { Component, useState, useEffect} from "react";
import { View, Text, ImageBackground, StyleSheet, FlatList, Pressable, Keyboard } from "react-native";

// Importação do moment para DATA e HORA
import moment from "moment";
import 'moment/locale/pt-br'

import  Icon  from "react-native-vector-icons/FontAwesome";
import IconIonic from "react-native-vector-icons/Ionicons"

import Requests from "../components/Requests";
import commonStyles from "../commonStyles";
import month from '../../assets/imgs/month.jpg'
import AddOrder from "./AddOrder";

export default class OrderList extends Component {

    // Definir um estado inicial //
    state = {
        showDoneOrders: true,
        showAddOrders: false,
        visibleOrders: [],
        orders: [{
            id: Math.random(),
            client: "Wellison",
            product: "Galão 20L",
            quantity: "2",
            orderTime: new Date(),
            formPayment: "Dinheiro",
            change: '7,00',
            creditOrDebit: '',
            customerAddress: "Av. Nossa senhora de Lourdes, 537",
            doneAt: new Date()
        }, {
            id: Math.random(),
            client: "Laura",
            product: "Gás",
            quantity: "1",
            orderTime: new Date(),
            formPayment: "Cartão",
            change: '',
            creditOrDebit: 'Crédito',
            customerAddress: "Av. Nossa senhora de Lourdes, 537",
            doneAt: null
        },]
    }

    //Essa função é chamada toda vez que o componente for montado!
    componentDidMount = () => {
        this.filterOrders()
    }

    toogleFilter = () => {
        this.setState({ showDoneOrders: !this.state.showDoneOrders }, this.filterOrders)
    }

    filterOrders = () => {
        let visibleOrders = null
        if(this.state.showDoneOrders) {
            visibleOrders = [...this.state.orders]
        }else {
            // No código abaixo foi criado uma constante que vai ser responsavel por filtrar as Orders pendentes
            //Logo depois com o metodo filter vai ser passado pelo filtro apenas as Orders correspondentes ao comando, que no caso são as Orders pending, e salvo no array visibleOrders.
            const pending = order => order.doneAt === null
            visibleOrders = this.state.orders.filter(pending)
        }

        this.setState({ visibleOrders })
    }

    toggleOrder = orderId => {
        const orders = [...this.state.orders]
        orders.forEach(order => {
            if(order.id === orderId) {
                order.doneAt = order.doneAt
                    ? null
                    : new Date
            }
        })

        this.setState({ orders }, this.filterOrders)
    }

    // Funçao responsavel por fechar o modal ou não
    handlePressOutsideModal = (event) => {
        // Verifica se o evento de press aconteceu fora do conteúdo do modal
        if (event.target === event.currentTarget) {
          this.setState({ showAddOrders: false })
          Keyboard.dismiss(); // Fecha o teclado ao clicar fora do modal
        }
      };

    addOrder = newOrder => {

        const orders = [...this.state.orders]
        orders.push({
            id: Math.random(),
            client: newOrder.client,
            product: newOrder.product,
            quantity: newOrder.quantity,
            orderTime: newOrder.orderTime,
            formPayment: newOrder.formPayment,
            change: newOrder.change,
            creditOrDebit: newOrder.creditOrDebit,
            customerAddress: newOrder.customerAddress,
            doneAt: null
        })
        
        this.setState({ orders, showAddOrders: false }, this.filterOrders)
    }

    render() {

        // Constante com a data atual //
        const today = moment().locale('pt-br ').format('ddd, D [de] MMMM', )

        return (
            <View style={styles.container}>
                <AddOrder
                    isVisible={this.state.showAddOrders}
                    onCancelOutModal={this.handlePressOutsideModal}
                    onCancel={() => this.setState({ showAddOrders: false })}
                    onSave={this.addOrder}
                />
                <ImageBackground 
                    source={month}
                    style={styles.background}    
                >
                    <View style={styles.iconBar}>
                        <Pressable
                            onPress={this.toogleFilter}
                        >
                            <Icon
                                name={this.state.showDoneOrders
                                ? 'eye'
                                : 'eye-slash'
                                }
                                size={30}
                                color={commonStyles.colors.secondary}
                            />
                        </Pressable>
                    </View>
                    <View style={styles.titleBar}>
                        <Text style={styles.title}>Hoje</Text>
                        <Text style={styles.subtitle}>{today}</Text>
                    </View>
                </ImageBackground>
                <View style={styles.orderList}>
                    {/* FlatList é responsável por deixar a tela deslizar */}
                    {/* Sendo assim ele recebe o state inicial,
                        e pega todos itens pelo id e faz uma copia 
                        com o operador spread => {...item}
                        e coloca dentro do component <Requests/>
                    */}
                    <FlatList
                        data={this.state.visibleOrders}
                        keyExtractor={item => item.id}
                        renderItem={({item}) => <Requests {...item} toggleOrder={this.toggleOrder} />}
                    />
                </View>
                <Pressable 
                    style={({ pressed }) => [
                        {
                            backgroundColor: pressed ? '#88A0D8' : commonStyles.colors.blueButtons
                        },
                        styles.addButton
                    ]}
                    onPress={() => this.setState({ showAddOrders: true })}
                >
                    <IconIonic
                        name="add-outline"
                        size={35}
                        color={commonStyles.colors.secondary}
                    />
                </Pressable>
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
    },
    iconBar: {
        flexDirection: "row",
        justifyContent: "flex-end",
        marginTop: 60,
        marginHorizontal: 50
    },
    addButton: {
        position: "absolute",
        right: 30,
        bottom: 30,
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center'
    }

})