import React,{ Component } from 'react'
import { Modal, View, StyleSheet, Pressable, Text, TextInput } from 'react-native'
import commonStyles from '../commonStyles'

export default  class addOrder extends Component {
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
                    onPress={this.props.onCancel}
                >
                    <Pressable
                    // onPress={this.props.onCancel}
                        style={styles.modalView}
                    >
                        {/* <View style={styles.container}> */}
                            <Text style={styles.header}>Novo Pedido</Text>
                            <Text>Teste de Input</Text>
                            <TextInput/>
                        {/* </View> */}
                        {/* <Text>Cancelar</Text> */}
                    </Pressable>
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
    }
})