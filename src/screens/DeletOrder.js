import React, { Component } from "react";
import { Modal, View, StyleSheet, Text, Pressable } from "react-native";
import commonStyles from "../commonStyles";

export default class deletOrder extends Component {
    render() {
        return (
            <Modal
                transparent={true}
                visible={this.props.isVisible}
                onRequestClose={this.props.onCancel}
                animationType='slide'
            >
                <Pressable
                    style={styles.background}
                    onPress={this.props.onCancelOutModal}
                >
                    <View
                        // onPress={this.props.onCancel}
                        style={styles.modalView}
                    >
                        <Text style={styles.header}>Novo Pedido</Text>
                        <View style={styles.ModalContainer}>
                            
                            <View style={styles.buttons}>
                                <Pressable
                                    onPress={this.props.onCancel}
                                >
                                    <Text style={styles.button}>Cancelar</Text>
                                </Pressable>
                                <Pressable
                                    onPress={this.save}
                                >
                                    <Text style={styles.button}>Salvar</Text>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </Pressable>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        justifyContent: 'center'
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        // padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    ModalContainer: {
        width: '100%',
        paddingLeft: 15,
        // alignItems: 'center'
    },
    header: {
        width: '100%',
        fontFamily: commonStyles.fontFamily,
        backgroundColor: commonStyles.colors.blueButtons,
        color: commonStyles.colors.secondary,
        textAlign: 'center',
        padding: 15,
        fontSize: 18,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
    },
    input: {
        height: 40,
        borderBottomWidth: 1, // Adiciona a linha na parte inferior
        borderColor: 'gray',
        margin: 15, // Adicione espaço abaixo do input se necessário
        paddingHorizontal: 10,
        width: '90%'
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    button: {
        margin: 20,
        marginRight: 30,
        color: commonStyles.colors.blueButtons
    },
    modalItens: {
        flexDirection: 'row',
        width: '100%'
    },
    inputProd: {
        width: '64%'
    },
    inputQuant: {
        width: '20%'
    },
    inputPicker: {
        width: '40%',
        borderColor: "black",
        borderWidth: 5
    },
    inputPickerChange: {
        width: '50%',
    },
    inputChange: {
        height: 40,
        borderBottomWidth: 1, // Adiciona a linha na parte inferior
        borderColor: 'gray',
        margin: 15, // Adicione espaço abaixo do input se necessário
        paddingHorizontal: 10,
        width: '70%'
    }
})