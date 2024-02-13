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
                        <Text style={styles.header}>Excluir pedido ?</Text>
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
                                    <Text style={styles.button}>Sim</Text>
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
        margin: 100,
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
    buttons: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    button: {
        marginTop: 50,
        margin: 20,
        marginRight: 30,
        color: commonStyles.colors.blueButtons
    },
    modalItens: {
        flexDirection: 'row',
        width: '100%'
    }
})